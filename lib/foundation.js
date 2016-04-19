var Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().Rule();

var zclmeta = require('./zclmeta'),
    foundMeta = require('./zclmeta').foundation;

var FoundPayload(cmd, payload) {
    this.cmd = cmd;
    this.payload = payload;
}

/***********************************************************************/
/*** Public Methods                                                  ***/
/***********************************************************************/
FoundPayload.prototype.parse = function () {
    var self = this,

    if (!Buffer.isBuffer(this.payload))
        throw new Error('Payload of ' + this.cmd + ' command must be buffer');

    switch (this.cmd) {

    }
};

FoundPayload.prototype.frame = function () {
    var self = this,
        dataBuf = Concentrate();

    switch (this.cmd) {
        case 'defaultRsp':
        case 'discover':
            if (!_.isPlainObject(this.payload))
                throw new Error('Payload arguments of ' + this.cmd + ' command must be an object');

            dataBuf = this._getBuf(this.cmd, this.payload, dataBuf);
            break;

        case 'discoverRsp':
            if (!_.isPlainObject(this.payload))
                throw new Error('Payload arguments of ' + this.cmd + ' command must be an object');

            dataBuf = dataBuf.uint8(this.payload.discComplete);
            _.forEach(this.payload.attrInfos, function (attrInfo) {
                self._getBuf(self.cmd, attrInfo, dataBuf);
            });
            break;

        default:
            if (!_.isArray(this.payload))
                throw new Error('Payload arguments of ' + this.cmd + ' command must be an array');

            _.forEach(this.payload, function (argObj) {
                self._getBuf(self.cmd, argObj, dataBuf);
            });
            break;
    }

    return dataBuf.result();
};

/***********************************************************************/
/*** Protected Functions                                             ***/
/***********************************************************************/
FoundPayload.prototype._getBuf = function (cmd, arg, dataBuffer) {
    var params = foundMeta.getParams(cmd);

    switch (cmd) {
        case 'read':
        case 'write':
        case 'writeUndiv':
        case 'writeNoRsp':
        case 'writeRsp':
        case 'configReportRsp':
        case 'readReportConfig':
        case 'report':
        case 'defaultRsp':
        case 'discover':
        case 'discoverRsp':
        case 'readStruct':
        case 'writeStrcut':
        case 'writeStrcutRsp':
            _.forEach(params, function (param) {
                var paramName = param.name,
                    paramType = param.type;

                if (!_.has(arg, paramName)) 
                    throw new Error('Payload of commnad: ' + cmd + ' must have ' + paramName + 'property.');

                if (paramType === 'variable') {
                    dataBuf = dataBuf.buffer(getDataTypeBuf(arg.dataType, arg.attrData));
                } else if (paramType === 'selector') {
                    dataBuf = dataBuf.buffer(getChunkBuf('selector', arg.selector));
                } else if (paramType === 'multi') {
                    dataBuf = dataBuf.buffer(getChunkBuf('multiDataVal'), arg);
                } else {
                    dataBuf = dataBuf[paramType](arg[paramName]);
                }
            });
            break;

        case 'readRsp':
            dataBuf = dataBuf.uint16le(arg.attrId).uint8(arg.status);

            if (arg.status === 0) {
                dataBuf = dataBuf.uint8(arg.dataType).buffer(getChunkBuf('multiDataVal'), arg);
            }
            break;

        case 'configReport':
            dataBuf = dataBuf.uint8(arg.direction).uint16le(arg.attrId);
            if (arg.direction === 0) {
                dataBuf = dataBuf.uint8(arg.dataType).uint16le(arg.minRepIntval).uint16le(arg.maxRepIntval);
                analogOrDigital = isDataAnlogDigital(arg.dataType);
                if (analogOrDigital === 'ANALOG') {
                    dataBuf = dataBuf.buffer(getDataTypeBuf(arg.dataType, arg.repChange));
                }
            } else if (arg.direction === 1) {
                dataBuf = dataBuf.uint16le(arg.timeout);
            }
            break;

        case 'readReportConfigRsp':
            dataBuf = dataBuf.uint8(arg.status);
            if (arg.status === 0) {
                return getBuf('configReport', arg, dataBuf);
            } else {
                return dataBuf.uint8(arg.direction).uint16le(arg.attrId);
            }
            break;

        default:
            throw new Error('ZCL Foundation not support ' + cmd + ' command.');
            break;
    }
    return dataBuf;
};

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
        delete this.vars.lsb;
        delete this.vars.xsb;
        delete this.vars.msb;
    });  
});

ru.clause('int56', function (name) { /*TODO*/ });

ru.clause('128BitSecKey', function (name) {
    var count = 0;
    this.loop(name, function (end) {
        this.uint8();

        count += 1;
        if (count === 16) { end(); }
    }).tap(function () {
        var tempArr = [];
        _.forEach(this.vars[name], function (obj) {
            tempArr.push(obj.undefined);
        });
        this.vars[name] = tempArr;
    });
});

ru.clause('attrVal', function () {
    var count = 0;

    this.uint8('elmType').uint16('numElms').tap(function () {
        if (!this.vars.numElms) {
            this.vars.elmVals = [];
        } else {
            this.loop('elmVals', function (end) {
                var dataType = getDataType(this.vars.elmType);
                ru[dataType]('data')(this);

                count += 1;
                if (count === this.vars.numElms) end();
            }).tap(function () {
                var tempArr = [];
                _.forEach(this.vars.elmVals, function (elmVal) {
                    if (elmVal.data) tempArr.push(elmVal.data);
                });
                this.vars.elmVals = tempArr;
            });
        }
    });
});

ru.clause('attrValStruct', function () {
    var count = 0;

    this.uint16('numElms').tap(function () {
        if (!this.vars.numElms) {
            this.vars.structElms = [];
        } else {
            this.loop('structElms', function (end) {
                this.uint8('elmType').tap(function () {
                    var dataType = getDataType(this.vars.elmType);
                    ru[dataType]('elmVal')(this);
                });

                count += 1;
                if (count === this.vars.numElms) end(); 
            }).tap(function () {
                _.forEach(this.vars.structElms, function (structElm) {
                    delete structElm.__proto__;
                });
            });
        }
    });
});

ru.clause('selector', function () {
    var count = 0;

    this.uint8('indicator').tap(function () {
        if (!this.vars.indicator) {
            this.indexes = [];
        } else {
            this.loop('indexes', function (end) {
                this.uint16();

                count += 1;
                if (count === this.vars.indicator) end(); 
            }).tap(function () {
                var tempArr = [];
                _.forEach(this.vars.indexes, function (index) {
                    tempArr.push(index.undefined);
                });
                this.vars.indexes = tempArr;
            });
        }
    });
});

/***********************************************************************/
/*** Private Functions                                               ***/
/***********************************************************************/
function getChunkBuf (rule, arg) {
    var dataBuf = Concentrate();

    switch (rule) {
        case 'multiDataVal':
            type = zclmeta.DataType.get(arg.dataType).key;
            if (type === 'ARRAY' || type === 'SET' || type === 'BAG') {
                dataBuf = dataBuf.buffer(getChunkBuf('attrVal', arg.attrVal));
            } else if (type === 'STRUCT') {
                dataBuf = dataBuf.buffer(getChunkBuf('attrValStruct', arg.attrVal));
            } else {
                dataBuf = dataBuf.buffer(getDataTypeBuf(arg.dataType, arg.attrVal));
            }
            return dataBuf.result();

        case 'attrVal': 
            dataBuf = dataBuf.uint8(arg.elmType).uint16(arg.numElms);
            _.forEach(arg.elmVals, function (elm) {
                dataBuf = dataBuf.buffer(getDataTypeBuf(arg.elmType, elm));
            });
            return dataBuf.result();

        case 'attrValStruct': 
            dataBuf = dataBuf.uint16(arg.numElms);
            _.forEach(arg.structElms, function (elm) {
                dataBuf = dataBuf.buffer(getChunkBuf('attrValStructNip', elm));
            });
            return dataBuf.result();

        case 'attrValStructNip': 
            dataBuf = dataBuf.uint8(arg.elmType).buffer(getDataTypeBuf(arg.elmType, arg.elmVal));
            return dataBuf.result();

        case 'selector':
            dataBuf = dataBuf.uint8(arg.indicator);

            if (arg.indicator !== 0) {
                  _.forEach(this.indexes, function (elm) {
                    dataBuf = dataBuf.uint16le(elm);
                });
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
            break;
        case 'INT8':
            newDataType = 'int8';
            break;             
        case 'DATA16':
        case 'BITMAP16':
        case 'UINT16':
        case 'ENUM16':
        case 'CLUSTER_ID':
        case 'ATTR_ID':
            newDataType = 'uint16';
            break;
        case 'INT16':
            newDataType = 'int16';
            break;
        case 'SEMI_PREC':
            // TODO
            break;
        case 'DATA24':
        case 'BITMAP24':
        case 'UINT24':
            newDataType = 'uint24';
            break;
        case 'INT24':
            newDataType = 'int24';
            break;
        case 'DATA32':
        case 'BITMAP32':
        case 'UINT32':
        case 'TOD':
        case 'DATE':
        case 'UTC':
        case 'BAC_OID':
            newDataType = 'uint32';
            break;
        case 'INT32':
            newDataType = 'int32';
            break;
        case 'SINGLE_PREC':
            newDataType = 'floatle';
            break;
        case 'DOUBLE_PREC':
            newDataType = 'doublele';
            break;
        case 'UINT40':
        case 'BITMAP40':
        case 'DATA40':
            newDataType = 'uint40';
            break;
        case 'UINT48':
        case 'BITMAP48':
        case 'DATA48':
            newDataType = 'uint48';
            break;
        case 'UINT56':
        case 'BITMAP56':
        case 'DATA56':
            newDataType = 'uint56';
            break;
        case 'UINT64':
        case 'BITMAP64':
        case 'DATA64':
        case 'IEEE_ADDR':
            newDataType = 'uint64';     
            break;
        case 'INT40':
            newDataType = 'int40';
            break;
        case 'INT48':
            newDataType = 'int48';
            break;
        case 'INT56':
            newDataType = 'int56';
            break;
        case 'INT64':
            newDataType = 'int64';
            break;
        case 'OCTET_STR':
        case 'CHAR_STR':
            newDataType = 'stringPreLenUint8';
            break;
        case 'LONG_OCTET_STR':
        case 'LONG_CHAR_STR':
            newDataType = 'stringPreLenUint16';
            break;
        case 'NO_DATA':
        case 'UNKNOWN':
            break;
        case '128_BIT_SEC_KEY':
            newDataType = '128BitSecKey';
            break;
    }
    return newDataType;
}

function getDataTypeBuf(dataType, value) {
    var dataBuf = Concentrate(),
        type = ensureDataTypeString(dataType),
        string,
        strLen;

    switch (type) {
        case 'DATA8':
        case 'BOOLEAN':
        case 'BITMAP8':
        case 'UINT8':
        case 'ENUM8':
            dataBuf = dataBuf.uint8(value);
            break;
        case 'INT8':
            dataBuf = dataBuf.int8(value);
            break;
        case 'DATA16':
        case 'BITMAP16':
        case 'UINT16':
        case 'ENUM16':
        case 'CLUSTER_ID':
        case 'ATTR_ID':
            dataBuf = dataBuf.uint16le(value);
            break;
        case 'INT16':
            dataBuf = dataBuf.int16le(value);
            break;
        case 'SEMI_PREC':
            // TODO
            break;            
        case 'DATA24':
        case 'BITMAP24':
        case 'UINT24':
            dataBuf = dataBuf.uint32le(value).result().slice(0, 3);
            break;
        case 'INT24':
            dataBuf = dataBuf.int32le(value).result().slice(0, 3);
            break;
        case 'DATA32':
        case 'BITMAP32':
        case 'UINT32':
        case 'TOD':
        case 'DATE':
        case 'UTC':
        case 'BAC_OID':
            dataBuf = dataBuf.uint32le(value);
            break;
        case 'INT32':
            dataBuf = dataBuf.int32le(value);
            break;
        case 'SINGLE_PREC':
            dataBuf = dataBuf.floatle(value);
            break;
        case 'DOUBLE_PREC':
            dataBuf = dataBuf.doublele(value);
            break;          
        case 'UINT40':
        case 'BITMAP40':
        case 'DATA40':
            if (Array.isArray(value) && value.length === 2) {
                if (value[0] > 255) {
                    throw new Error('The value[0] for UINT40/BITMAP40/DATA40 must be smaller than 255.');
                }
                dataBuf = dataBuf.uint32le(value[1]).uint8(value[0]);
            } else {
                throw new Error('The value for UINT40/BITMAP40/DATA40 must be orgnized in an 2-element number array.');
            }
            break;
        case 'UINT48':
        case 'BITMAP48':
        case 'DATA48':
            if (Array.isArray(value) && value.length === 2) {
                if (value[0] > 65535) {
                    throw new Error('The value[0] for UINT48/BITMAP48/DATA48 must be smaller than 65535.');
                }
                dataBuf = dataBuf.uint32le(value[1]).uint16le(value[0]);
            } else {
                throw new Error('The value for UINT48/BITMAP48/DATA48 must be orgnized in an 2-element number array.');
            }
            break;
        case 'UINT56':
        case 'BITMAP56':
        case 'DATA56':
            if (Array.isArray(value) && value.length === 2) {
                if (value[0] > 16777215) {
                    throw new Error('The value[0] for UINT56/BITMAP56/DATA56 must be smaller than 16777215.');
                }
                dataBuf = dataBuf.uint32le(value[1]).uint32le(value[0]).result().slice(0, 7);
            } else {
                throw new Error('The value for UINT56/BITMAP56/DATA56 must be orgnized in an 2-element number array.');
            }
            break;
        case 'UINT64':
        case 'BITMAP64':
        case 'DATA64':
        case 'IEEE_ADDR':
            if (Array.isArray(value) && value.length === 2) {
                if (value[0] > 4294967295) {
                    throw new Error('The value[0] for UINT64/BITMAP64/DATA64 must be smaller than 4294967295.');
                }
                dataBuf = dataBuf.uint32le(value[1]).uint32le(value[0]);
            } else {
                throw new Error('The value for UINT64/BITMAP64/DATA64 must be orgnized in an 2-element number array.');
            }
            break;
        case 'INT40':
            // TODO
            break;
        case 'INT48':
            // TODO
            break;
        case 'INT56':
            // TODO
            break;
        case 'INT64':
            // TODO
            break;
        case 'OCTET_STR':
        case 'CHAR_STR':
            if (typeof value !== 'string') {
                throw new Error('The value for ' + type + ' must be an string.');
            }
            string = value;
            strLen = string.length;
            dataBuf = dataBuf.uint8(strLen).string(value, 'utf8');
            break;
        case 'LONG_CHAR_STR':
            if (typeof value !== 'string') {
                throw new Error('The value for ' + type + ' must be an string.');
            }
            string = value;
            strLen = string.length;
            dataBuf = dataBuf.uint16(strLen).string(value, 'ucs2');
            break;            
        case 'NO_DATA':
        case 'UNKNOWN':
            break;
    }

    if (dataBuf instanceof Concentrate) {
        return dataBuf.result();
    } else if (dataBuf instanceof Buffer) {
        return dataBuf;
    }
}

function isDataAnalogDigital(dataType) {
    var type = ZCLDEFS.DataType.get(ensureDataTypeString(dataType)).value,
        analogDigital,

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