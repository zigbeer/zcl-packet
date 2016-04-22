/* jshint node: true */
'use strict';

var Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().Rule();

var zclmeta = require('./zclmeta');

var parsedBufLen = 0;

/*************************************************************************************************/
/*** FoundPayload Class                                                                        ***/
/*************************************************************************************************/
function FoundPayload(cmd) {
    var command = zclmeta.FoundationId.get(cmd);

    this.cmd = undefined;          // string after assigned
    this.cmdId = undefined;        // number after assigned

    if (!command)
        throw new Error('Unrecognized command');

    this.cmd = command.key;
    this.cmdId = command.value;

    this.params = zclmeta.foundation.getParams(this.cmd);

    if (!this.params) throw new Error('Zcl Foundation not support ' + cmd + ' command.');
}

/*************************************************************************************************/
/*** Public APIs                                                                               ***/
/*************************************************************************************************/
FoundPayload.prototype.parse = function (zBuf, callback) {
    var self = this,
        getObjCB,
        parsedData;

    getObjCB = function (err, result) {
        if (self.cmd === 'discoverRsp') {
            parsedData.attrInfos.push(result.data);
        } else {
            parsedData.push(result.data);
        }

        if (result.leftBuf.length !== 0) {
            self._getObj(result.leftBuf, getObjCB);
        } else {
            callback(null, parsedData);
        }
    };

    switch (this.cmd) {
        case 'defaultRsp':
        case 'discover':
            this._getObj(zBuf, function (err, result) {
                parsedData = result.data;
                callback(null, parsedData);
            });
            break;

        case 'discoverRsp':
            parsedData = {
                discComplete: zBuf.readUInt8(0),
                attrInfos: []
            };

            zBuf = zBuf.slice(1);
            parsedBufLen += 1;
            this._getObj(zBuf, getObjCB);
            break;

        default:
            parsedData = [];
            this._getObj(zBuf, getObjCB);
            break;
    }
};

FoundPayload.prototype.frame = function (payload) {
    var self = this,
        dataBuf = Concentrate();

    switch (this.cmd) {
        case 'defaultRsp':
        case 'discover':
            if ((typeof payload !== 'object') || Array.isArray(payload))
                throw new Error('Payload arguments of ' + this.cmd + ' command must be an object');

            dataBuf = this._getBuf(payload, dataBuf);
            break;

        case 'discoverRsp':
            if ((typeof payload !== 'object') || Array.isArray(payload))
                throw new Error('Payload arguments of ' + this.cmd + ' command must be an object');

            dataBuf = dataBuf.uint8(payload.discComplete);
            payload.attrInfos.forEach(function (attrInfo) {
                self._getBuf(attrInfo, dataBuf);
            });
            break;

        default:
            if (!Array.isArray(payload))
                throw new Error('Payload arguments of ' + this.cmd + ' command must be an array');

            payload.forEach(function (argObj) {
                self._getBuf(argObj, dataBuf);
            });
            break;
    }

    return dataBuf.result();
};

/*************************************************************************************************/
/*** Protected Methods                                                                         ***/
/*************************************************************************************************/
FoundPayload.prototype._getBuf = function (arg, dataBuf) {
    var self = this,
        analogOrDigital;

    switch (this.cmd) {
        case 'readRsp':
            dataBuf = dataBuf.uint16le(arg.attrId).uint8(arg.status);

            if (arg.status === 0) {
                dataBuf = dataBuf.uint8(arg.dataType).buffer(getChunkBuf('multi', arg));
            }
            break;

        case 'configReport':
            dataBuf = dataBuf.uint8(arg.direction).uint16le(arg.attrId);
            if (arg.direction === 0) {
                dataBuf = dataBuf.uint8(arg.dataType).uint16le(arg.minRepIntval).uint16le(arg.maxRepIntval);
                analogOrDigital = isDataAnalogDigital(arg.dataType);
                if (analogOrDigital === 'ANALOG') {
                    dataBuf = dataBuf.buffer(getDataTypeBuf(getDataType(arg.dataType), arg.repChange));
                }
            } else if (arg.direction === 1) {
                dataBuf = dataBuf.uint16le(arg.timeout);
            }
            break;

        case 'readReportConfigRsp':
            dataBuf = dataBuf.uint8(arg.status);
            if (arg.status === 0) {
                return (new FoundPayload('configReport'))._getBuf(arg, dataBuf);
            } else {
                return dataBuf.uint8(arg.direction).uint16le(arg.attrId);
            }
            break;

        default:
            this.params.forEach(function (param) {
                var paramName = param.name,
                    paramType = param.type;

                if (arg[paramName] === undefined)
                    throw new Error('Payload of commnad: ' + self.cmd + ' must have ' + paramName + ' property.');

                if (paramType === 'variable') {
                    dataBuf = dataBuf.buffer(getDataTypeBuf(getDataType(arg.dataType), arg.attrData));
                } else if (paramType === 'selector') {
                    dataBuf = dataBuf.buffer(getChunkBuf('selector', arg.selector));
                } else if (paramType === 'multi') {
                    dataBuf = dataBuf.buffer(getChunkBuf('multi', arg));
                } else {
                    dataBuf = dataBuf[paramType](arg[paramName]);
                }
            });
            break;
    }
    return dataBuf;
};

FoundPayload.prototype._getObj = function (buf, callback) {
    var chunkRules = [],
        parser,
        knownBufLen = zclmeta.foundation.get(this.cmd).knownBufLen,
        result = {
            data: null,
            leftBuf: null
        };

    parsedBufLen = 0;

    parsedBufLen += knownBufLen;
    this.params.forEach(function (param) {
        chunkRules.push(ru[param.type]([param.name]));
    });

    parser = DChunks().join(chunkRules).compile();

    parser.once('parsed', function (parsed) {
        parser = null;
        result.data = parsed;
        result.leftBuf = buf.slice(parsedBufLen);

        callback(null, result);
    });

    parser.end(buf);
};

/*************************************************************************************************/
/*** Private Functions                                                                         ***/
/*************************************************************************************************/
function getChunkBuf (rule, arg) {
    var dataBuf = Concentrate(),
        type,
        i = 0;

    switch (rule) {
        case 'multi':
            type = zclmeta.DataType.get(arg.dataType).key;
            if (type === 'ARRAY' || type === 'SET' || type === 'BAG') {
                dataBuf = dataBuf.buffer(getChunkBuf('attrVal', arg.attrData));
            } else if (type === 'STRUCT') {
                dataBuf = dataBuf.buffer(getChunkBuf('attrValStruct', arg.attrData));
            } else {
                dataBuf = dataBuf.buffer(getDataTypeBuf(getDataType(arg.dataType), arg.attrData));
            }
            return dataBuf.result();

        case 'attrVal': 
            dataBuf = dataBuf.uint8(arg.elmType).uint16(arg.numElms);
            for (i = 0; i < arg.numElms; i += 1) {
                dataBuf = dataBuf.buffer(getDataTypeBuf(getDataType(arg.elmType), arg.elmVals[i]));
            }
            return dataBuf.result();

        case 'attrValStruct': 
            dataBuf = dataBuf.uint16(arg.numElms);
            for (i = 0; i < arg.numElms; i += 1) {
                dataBuf = dataBuf.buffer(getChunkBuf('attrValStructNip', arg.structElms[i]));
            }
            return dataBuf.result();

        case 'attrValStructNip': 
            dataBuf = dataBuf.uint8(arg.elmType).buffer(getDataTypeBuf(getDataType(arg.elmType), arg.elmVal));
            return dataBuf.result();

        case 'selector':
            dataBuf = dataBuf.uint8(arg.indicator);

            for (i = 0; i < arg.indicator; i += 1) {
                dataBuf = dataBuf.uint16le(arg.indexes[i]);
            }
            return dataBuf.result();
    }
}

function ensureDataTypeString(dataType) {
    var dataTypeStr;

    if (typeof dataType === 'number') {
        dataTypeStr = zclmeta.DataType.get(dataType).key;
    } else if (typeof dataType === 'object' && dataType.hasOwnProperty('key')) {
        dataTypeStr = dataType.key;
    } else if (typeof dataType === 'string') {
        dataTypeStr = dataType;
    }
    return dataTypeStr;
}

function getDataType(dataType) {
    var type = ensureDataTypeString(dataType),
        newDataType;

    switch (type) {
        case 'DATA8':
        case 'BOOLEAN':
        case 'BITMAP8':
        case 'UINT8':
        case 'ENUM8':
            newDataType = 'uint8';
            parsedBufLen += 1;
            break;
        case 'INT8':
            newDataType = 'int8';
            parsedBufLen += 1;
            break;             
        case 'DATA16':
        case 'BITMAP16':
        case 'UINT16':
        case 'ENUM16':
        case 'CLUSTER_ID':
        case 'ATTR_ID':
            newDataType = 'uint16';
            parsedBufLen += 2;
            break;
        case 'INT16':
            newDataType = 'int16';
            parsedBufLen += 2;
            break;
        case 'SEMI_PREC':
            // TODO
            break;
        case 'DATA24':
        case 'BITMAP24':
        case 'UINT24':
            newDataType = 'uint24';
            parsedBufLen += 3;
            break;
        case 'INT24':
            newDataType = 'int24';
            parsedBufLen += 3;
            break;
        case 'DATA32':
        case 'BITMAP32':
        case 'UINT32':
        case 'TOD':
        case 'DATE':
        case 'UTC':
        case 'BAC_OID':
            newDataType = 'uint32';
            parsedBufLen += 4;
            break;
        case 'INT32':
            newDataType = 'int32';
            parsedBufLen += 4;
            break;
        case 'SINGLE_PREC':
            newDataType = 'floatle';
            parsedBufLen += 4;
            break;
        case 'DOUBLE_PREC':
            newDataType = 'doublele';
            parsedBufLen += 8;
            break;
        case 'UINT40':
        case 'BITMAP40':
        case 'DATA40':
            newDataType = 'uint40';
            parsedBufLen += 5;
            break;
        case 'UINT48':
        case 'BITMAP48':
        case 'DATA48':
            newDataType = 'uint48';
            parsedBufLen += 6;
            break;
        case 'UINT56':
        case 'BITMAP56':
        case 'DATA56':
            newDataType = 'uint56';
            parsedBufLen += 7;
            break;
        case 'UINT64':
        case 'BITMAP64':
        case 'DATA64':
        case 'IEEE_ADDR':
            newDataType = 'uint64';   
            parsedBufLen += 8;  
            break;
        case 'INT40':
            newDataType = 'int40';
            parsedBufLen += 5;
            break;
        case 'INT48':
            newDataType = 'int48';
            parsedBufLen += 6;
            break;
        case 'INT56':
            newDataType = 'int56';
            parsedBufLen += 7;
            break;
        case 'INT64':
            newDataType = 'int64';
            parsedBufLen += 8;
            break;
        case 'OCTET_STR':
        case 'CHAR_STR':
            newDataType = 'strPreLenUint8';
            break;
        case 'LONG_OCTET_STR':
        case 'LONG_CHAR_STR':
            newDataType = 'strPreLenUint16';
            break;
        case 'NO_DATA':
        case 'UNKNOWN':
            break;
        case '128_BIT_SEC_KEY':
            newDataType = '128BitSecKey';
            parsedBufLen += 16;
            break;
    }
    return newDataType;
}

function getDataTypeBuf (type, value) {
    var dataBuf = Concentrate(),
        string,
        strLen;

    switch (type) {
        case 'uint8':
        case 'int8':
        case 'uint16':
        case 'int16':
        case 'uint32':
        case 'int32':
        case 'floatle':
        case 'doublele':
            dataBuf = dataBuf[type](value);
            break;
        case 'uint24':
            dataBuf = dataBuf.uint32le(value).result().slice(0, 3);
            break;
        case 'int24':
            dataBuf = dataBuf.int32le(value).result().slice(0, 3);
            break;
        case 'uint40':
            if (Array.isArray(value) && value.length === 2) {
                if (value[0] > 255) {
                    throw new Error('The value[0] for UINT40/BITMAP40/DATA40 must be smaller than 255.');
                }
                dataBuf = dataBuf.uint32le(value[1]).uint8(value[0]);
            } else {
                throw new Error('The value for UINT40/BITMAP40/DATA40 must be orgnized in an 2-element number array.');
            }
            break;
        case 'int40':
            //TODO
            break;
        case 'uint48':
            if (Array.isArray(value) && value.length === 2) {
                if (value[0] > 65535) {
                    throw new Error('The value[0] for UINT48/BITMAP48/DATA48 must be smaller than 65535.');
                }
                dataBuf = dataBuf.uint32le(value[1]).uint16le(value[0]);
            } else {
                throw new Error('The value for UINT48/BITMAP48/DATA48 must be orgnized in an 2-element number array.');
            }
            break;
        case 'int48':
            //TODO
            break;
        case 'uint56':
            if (Array.isArray(value) && value.length === 2) {
                if (value[0] > 16777215) {
                    throw new Error('The value[0] for UINT56/BITMAP56/DATA56 must be smaller than 16777215.');
                }
                dataBuf = dataBuf.uint32le(value[1]).uint32le(value[0]).result().slice(0, 7);
            } else {
                throw new Error('The value for UINT56/BITMAP56/DATA56 must be orgnized in an 2-element number array.');
            }
            break;
        case 'int56':
            //TODO
            break;
        case 'uint64':
            if (Array.isArray(value) && value.length === 2) {
                if (value[0] > 4294967295) {
                    throw new Error('The value[0] for UINT64/BITMAP64/DATA64 must be smaller than 4294967295.');
                }
                dataBuf = dataBuf.uint32le(value[1]).uint32le(value[0]);
            } else {
                throw new Error('The value for UINT64/BITMAP64/DATA64 must be orgnized in an 2-element number array.');
            }
            break;
        case 'strPreLenUint8':
            if (typeof value !== 'string') {
                throw new Error('The value for ' + type + ' must be an string.');
            }
            string = value;
            strLen = string.length;
            dataBuf = dataBuf.uint8(strLen).string(value, 'utf8');
            break;
        case 'strPreLenUint16':
            if (typeof value !== 'string') {
                throw new Error('The value for ' + type + ' must be an string.');
            }
            string = value;
            strLen = string.length;
            dataBuf = dataBuf.uint16(strLen).string(value, 'ucs2');
            break;
    }
    if (dataBuf instanceof Concentrate) {
        return dataBuf.result();
    } else if (dataBuf instanceof Buffer) {
        return dataBuf;
    }
}

function isDataAnalogDigital(dataType) {
    var type = zclmeta.DataType.get(ensureDataTypeString(dataType)).value,
        analogDigital;

    if ((type > 0x07 && type < 0x20) ||  //GENERAL_DATA, LOGICAL, BITMAP
        (type > 0x2f && type < 0x38) ||  //ENUM
        (type > 0x3f && type < 0x58) ||  //STRING, ORDER_SEQ, COLLECTION
        (type > 0xe7 && type < 0xff))    //IDENTIFIER, MISC
    {
        analogDigital = 'DIGITAL';
    } else if (
        (type > 0x1f && type < 0x30) ||  //UNSIGNED_INT, SIGNED_INT
        (type > 0x37 && type < 0x40) ||  //FLOAT
        (type > 0xdf && type < 0xe8))    //TIME
    {
        analogDigital = 'ANALOG';
    }

    return analogDigital;
}

/*************************************************************************************************/
/*** Add Parsing Rules to DChunks                                                              ***/
/*************************************************************************************************/
ru.clause('uint24', function (name) {
    this.uint16('lsb').uint8('msb').tap(function () {
        var value;
        value = (this.vars.msb * 65536) + this.vars.lsb;
        this.vars[name] = value;
        delete this.vars.lsb;
        delete this.vars.msb;
    });  
});   

ru.clause('int24', function (name) {
    this.uint16('lsb').uint8('msb').tap(function () {
        var value,
            sign = (this.vars.msb & 0x80) >> 7;
        value = ((this.vars.msb & 0x7F) * 65536) + this.vars.lsb;
        if (sign) this.vars[name] = -(0x7FFFFF - value + 1);
        else this.vars[name] = value;
        delete this.vars.lsb;
        delete this.vars.msb;
    });  
});

ru.clause('uint40', function (name) {
    this.uint32('lsb').uint8('msb').tap(function () {
        var value = [];
        value.push(this.vars.msb);
        value.push(this.vars.lsb);
        this.vars[name] = value;
        delete this.vars.lsb;
        delete this.vars.msb;
    });  
});

ru.clause('int40', function (name) { /*TODO*/ });

ru.clause('uint48', function (name) {
    this.uint32('lsb').uint16('msb').tap(function () {
        var value = [];
        value.push(this.vars.msb);
        value.push(this.vars.lsb);
        this.vars[name] = value;
        delete this.vars.lsb;
        delete this.vars.msb;
    });  
});

ru.clause('int48', function (name) { /*TODO*/ });

ru.clause('uint56', function (name) {
    this.uint32('lsb').uint16('xsb').uint8('msb').tap(function () {
        var value = [];
        value.push(this.vars.msb);
        value.push(this.vars.xsb);
        value.push(this.vars.lsb);
        this.vars[name] = value;
        delete this.vars.lsb;
        delete this.vars.xsb;
        delete this.vars.msb;
    });  
});

ru.clause('int56', function (name) { /*TODO*/ });

ru.clause('uint64', function (name) {
    this.uint64(name).tap(function () {
        var temp = [];
        temp.push(parseInt(this.vars[name].toString(16).slice(0, -8), 16));
        temp.push((this.vars[name] & 0xFFFFFFFF));
        this.vars[name] = temp;
    });
});

ru.clause('strPreLenUint8', function (name) {
    parsedBufLen += 1;
    this.uint8('len').tap(function () {
        parsedBufLen += this.vars.len;
        this.string(name, this.vars.len);
        delete this.vars.len;
    });
});

ru.clause('strPreLenUint16', function (name) {
    parsedBufLen += 2;
    this.uint16('len').tap(function () {
        parsedBufLen += this.vars.len;
        this.string(name, this.vars.len);
        delete this.vars.len;
    });
});

ru.clause('128BitSecKey', function (name) {
    var count = 0;
    this.loop(name, function (end) {
        this.uint8();

        count += 1;
        if (count === 16) { end(); }
    }).tap(function () {
        var tempArr = [];
        this.vars[name].forEach(function (obj) {
            tempArr.push(obj.undefined);
        });
        this.vars[name] = tempArr;
    });
});

ru.clause('variable', function (name, dataTypeParam) {
    if (!dataTypeParam) dataTypeParam = 'dataType';

    this.tap(function () {
        var dataType = getDataType(this.vars[dataTypeParam]);
        ru[dataType](name)(this);
    });
});

ru.clause('attrVal', function () {
    var count = 0;

    parsedBufLen += 3;
    this.uint8('elmType').uint16('numElms').tap(function () {
        if (!this.vars.numElms) {
            this.vars.elmVals = [];
        } else {
            this.loop('elmVals', function (end) {
                ru.variable('data', 'elmType')(this);

                count += 1;
                if (count === this.vars.numElms) end();
            }).tap(function () {
                var tempArr = [];
                this.vars.elmVals.forEach(function (elmVal) {
                    if (elmVal.data) tempArr.push(elmVal.data);
                });
                this.vars.elmVals = tempArr;
            });
        }
    });
});

ru.clause('attrValStruct', function () {
    var count = 0;

    parsedBufLen += 2;
    this.uint16('numElms').tap(function () {
        if (!this.vars.numElms) {
            this.vars.structElms = [];
        } else {
            this.loop('structElms', function (end) {
                parsedBufLen += 1;
                this.uint8('elmType').tap(function () {
                    ru.variable('elmVal', 'elmType')(this);
                });

                count += 1;
                if (count === this.vars.numElms) end(); 
            }).tap(function () {
                this.vars.structElms.forEach(function (structElm) {
                    delete structElm.__proto__;
                });
            });
        }
    });
});

ru.clause('selector', function () {
    var count = 0;

    parsedBufLen += 1;
    this.tap('selector', function () {
        this.uint8('indicator').tap(function () {
            if (!this.vars.indicator) {
                this.indexes = [];
            } else {
                this.loop('indexes', function (end) {
                    parsedBufLen += 2;
                    this.uint16();

                    count += 1;
                    if (count === this.vars.indicator) end(); 
                }).tap(function () {
                    var tempArr = [];
                    this.vars.indexes.forEach(function (index) {
                        tempArr.push(index.undefined);
                    });
                    this.vars.indexes = tempArr;
                });
            }
        });
    }).tap(function () {
        delete this.vars.selector.__proto__;
    });
});

ru.clause('multi', function (name) {
    var flag = 0;

    this.tap(name, function () {
        var type = zclmeta.DataType.get(this.vars.dataType).key,
            dataType;

        if (type === 'ARRAY' || type === 'SET' || type === 'BAG') {
            ru.attrVal()(this);
        } else if (type === 'STRUCT') {
            ru.attrValStruct()(this);
        } else {
            flag = 1;
            ru.variable(name)(this);
        }
    }).tap(function () {
        delete this.vars[name].__proto__;
        if (flag) this.vars[name] = this.vars[name][name];
    });
});

ru.clause('readRsp', function () {
    this.tap(function () {
        if (this.vars.status === 0) {
            parsedBufLen += 1;
            this.uint8('dataType').tap(function () {
                ru.multi('attrData')(this);
            });
        }
    });
});

ru.clause('configReport', function () {
    this.tap(function () {
        if (this.vars.direction === 0) {
            parsedBufLen += 5;
            this.uint8('dataType').uint16('minRepIntval').uint16('maxRepIntval').tap(function () {
                var analogOrDigital = isDataAnalogDigital(this.vars.dataType);
                if (analogOrDigital === 'ANALOG') ru.variable('repChange')(this);
            });
        } else {
            parsedBufLen += 2;
            this.uint16('timeout');
        }
    });
});

ru.clause('readReportConfigRsp', function () {
    this.tap(function () {
        if (this.vars.status === 0) {
            ru.configReport()(this);
        }
    });
});

module.exports = FoundPayload;
