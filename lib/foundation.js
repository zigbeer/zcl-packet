var Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().rule;

var zclmeta = require('./zclmeta');

var Foundation(cmdName, args) {
    if (!_.isString(cmd)) throw new Error('cmdName must ba a string');
    if (cmdName === 'defaultRsp' || cmdName === 'discover') {
        if (!_.isPlainObject(args)) throw new Error('args must be an object');
    } else {
        if (!_.isArray(args)) throw new Error('args must be an array');
    }

    this.cmd = cmd;
    this.args = args;
}

Foundation.prototype.parse = function() {

};

Foundation.prototype.frame = function () {
    var dataBuf;

    switch (this.cmd) {
        case 'defaultRsp':
        case 'discover':
            dataBuf = getChunkBuf(this.cmd, this.args).result();
            break;

        case 'discoverRsp':
            dataBuf = Concentrate().uint8(args.discComplete);
            dataBuf = getChunkBuf(this.cmd, this.args, dataBuf).result();
            break;

        default 
            

    }
};

function getChunkBuf (cmd, arg, dataBuffer) {
    var dataBuf = Concentrate();

    if (dataBuffer) dataBuf = dataBuffer;

    switch (cmd) {
        case 'read':
            return dataBuf.uint16le(arg.attrId);

        case 'readRsp':
            dataBuf = dataBuf.uint16le(arg.attrId).uint8(arg.status);

            if (arg.status === 0) {
                dataBuf = dataBuf.uint8(arg.dataType);
                type = zclmeta.DataType.get(arg.dataType).key;
                if (type === 'ARRAY' || type === 'SET' || type === 'BAG') {
                    dataBuf = dataBuf.buffer(getChunkBuf('attrVal', arg.attrVal));
                } else if (type === 'STRUCT') {
                    dataBuf = dataBuf.buffer(getChunkBuf('attrValStruct', arg.attrVal));
                } else {
                    dataBuf = dataBuf.buffer(getDataTypeBuf(arg.dataType, arg.attrVal));
                }
            }
            return dataBuf;

        case 'write':
        case 'writeUndiv':
        case 'writeNoRsp':
            return dataBuf.uint16le(arg.attrId).uint8(arg.dataType).buffer(getDataTypeBuf(arg.dataType, arg.attrData));

        case 'writeRsp':
            return dataBuf.uint8(arg.status).uint16le(arg.attrId);

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
            return dataBuf;

        case 'configReportRsp':
            return dataBuf.uint8(arg.status).uint8(arg.direction).uint16le(arg.attrId);

        case 'readReportConfig':
            return dataBuf.uint8(arg.direction).uint16le(arg.attrId);

        case 'readReportConfigRsp':
            if (arg.status === 0) {
                dataBuf = dataBuf.uint8(arg.status);
                return getChunkBuf('configReport', arg.attrVal, dataBuf);
            } else {
                return dataBuf.uint8(arg.status).uint8(arg.direction).uint16le(arg.attrId);
            }

        case 'report':
            return dataBuf.uint16le(arg.attrId).uint8(arg.dataType).buffer(getDataTypeBuf(arg.dataType, arg.attrData));

        case 'defaultRsp':
            return dataBuf.uint8(arg.cmdId).uint8(arg.statusCode);

        case 'discover':
            return dataBuf.uint16le(arg.startAttrId).uint8(arg.maxAttrIds);

        case 'discoverRsp':
            return dataBuf.uint16le(arg.attrId).uint8(arg.dataType);

        case 'readStruct':
            return dataBuf.uint16le(arg.attrId).buffer(getChunkBuf('selector', arg.selector));

        case 'writeStrcut':
            dataBuf = dataBuf.uint16le(arg.attrId).buffer(getChunkBuf('selector', arg.selector)).uint8(this.dataType);
            if (type === 'ARRAY' || type === 'SET' || type === 'BAG') {
                dataBuf = dataBuf.buffer(getChunkBuf('attrVal', arg.attrVal));
            } else if (type === 'STRUCT') {
                dataBuf = dataBuf.buffer(getChunkBuf('attrValStruct', arg.attrVal));
            } else {
                dataBuf = dataBuf.buffer(getDataTypeBuf(arg.dataType, arg.attrVal));
            }
            return dataBuf;

        case 'writeStrcutRsp':
            return dataBuf.uint8(arg.status).uint16le(arg.attrId).buffer(getChunkBuf('selector', arg.selector));

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
            if (typeof value !== 'string') {
                throw new Error('The value for OCTET_STR must be an string with literal decimal digits.');
            }
            string = value;
            strLen = string.length;
            dataBuf = dataBuf.uint8(strLen).string(string, 'utf8');
            break;
        case 'CHAR_STR':
            if (typeof value !== 'string') {
                throw new Error('The value for CHAR_STR must be an string.');
            }
            string = value;
            strLen = string.length;
            dataBuf = dataBuf.uint8(strLen).string(value, 'utf8');
            break;
        case 'LONG_OCTET_STR':
            if (typeof value !== 'string') {
                throw new Error('The value for LONG_OCTET_STR must be an string with literal hex digits.');
            }
            string = value;
            strLen = string.length;
            dataBuf = dataBuf.uint16(strLen).string(value, 'ucs2');
            break;
        case 'LONG_CHAR_STR':
            if (typeof value !== 'string') {
                throw new Error('The value for LONG_CHAR_STR must be an string.');
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

function isDataAnlogDigital(dataType) {
    var type = ensureDataTypeString(dataType),
        dataClass,
        analogDigital;

    dataClass = getDataClass(type);
    switch(dataClass) {
        case 'GENERAL_DATA':
        case 'LOGICAL':
        case 'BITMAP':
        case 'ENUM':
        case 'STRING':
        case 'ORDER_SEQ':
        case 'COLLECTION':
        case 'IDENTIFIER':
        case 'MISC':
            analogDigital = 'DIGITAL';
            break;
        case 'UNSIGNED_INT':
        case 'SIGNED_INT':
        case 'FLOAT':
        case 'TIME':
            analogDigital = 'ANALOG';
            break;
    }
    return analogDigital;
}