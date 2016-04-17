/* jshint node: true */
'use strict';

var zclmeta = require('./zclmeta'),
    Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().Rule();

/*************************************************************************************************/
/*** Functional Class                                                                          ***/
/*************************************************************************************************/
function Functional(clusterId, cmd, args) { // args is optional, and can be an array or a value-object if given
    var cluster = zclmeta.ClusterId.get(clusterId),
        command,
        params;

    this.direction = undefined;    // string after assgined
    this.cluster = undefined;      // string after assigned
    this.cmd = undefined;          // string after assigned
    this.cmdId = undefined;        // number after assigned
    this.args = undefined;         // array after assigned: [ { name, type, value }, ... ]

    if (!cluster)
        throw new Error('Unrecognized cluster');

    this.cluster = cluster.key;
    command = zclmeta[this.cluster].get(cmd);

    if (!command)
        throw new Error('Unrecognized command');

    this.cmd = command.key;
    this.cmdId = command.value;

    this.direction = zclmeta.getDirection(this.cluster, this.cmd);

    if (!this.direction)
        throw new Error('Unrecognized type');

    // if args is given, this is for REQ transmission
    // otherwise, maybe just for parsing RSP packet
    if (args)
        params = zclmeta.getParams(this.cluster, this.cmd);    // [ { name, type }, ... ]

    if (params) {
        if (Array.isArray(args)) {
            // arg: { name, type } -> { name, type, value }
            params.forEach(function (arg, idx) {
                arg.value = args[idx];
            });
        } else if (typeof args === 'object') {
            params.forEach(function (arg, idx) {
                if (!args.hasOwnProperty(arg.name))
                    throw new Error('The argument object has incorrect properties');
                else
                    arg.value = args[arg.name];
            });
        }

        this.args = params;              // [ { name, type, value }, ... ]
    }
}

Functional.prototype.parse = function (bufLen, zclBuf, callback) {
    var chunkRules = [],
        err,
        params,
        parser;

    params = zclmeta.getParams(this.cluster, this.cmd);

    if (params) {                        // [ { name, type }, ... ]
        params.forEach(function (arg) {
            var rule = ru[arg.type];
            if (rule) {
                rule = rule(arg.name, bufLen);
                chunkRules.push(rule);
            } else {
                err = new Error('Parsing rule for ' + arg.type + ' is not found.');
            }
        });
    } else {
        err = new Error('Response parameter definitions not found.');
    }

    if (!err) {
        parser = DChunks().join(chunkRules).compile();

        parser.once('parsed', function (result) {
            parser = null;
            callback(null, result);
        });
    }

    if (!parser)    // error occurs, no parser created
        callback(err);
    else
        parser.end(zclBuf);
};

Functional.prototype.frame = function () {
    if (!Array.isArray(this.args))  // no args, cannot build frame
        return null;

    var dataBuf = Concentrate();

    this.args.forEach(function (arg, idx) { // arg: { name, type, value }
        var type = arg.type,
            val = arg.value,
            idxarr,
            k;

        switch (type) {
            case 'int8':
            case 'uint8':
            case 'int16':
            case 'uint16':
            case 'int32':
            case 'uint32':
            case 'floatle':
                dataBuf = dataBuf[type](val);
                break;
            case 'buffer':
                dataBuf = dataBuf.buffer(new Buffer(val));
                break;
            case 'longaddr':    // string '0x00124b00019c2ee9'
                var msb = parseInt(val.slice(2,10), 16),
                    lsb = parseInt(val.slice(10), 16);

                dataBuf = dataBuf.uint32le(lsb).uint32le(msb);
                break;
            case 'stringPreLenUint8':
                if (typeof val !== 'string') {
                    throw new Error('The value for ' + val + ' must be an string.');
                }
                dataBuf = dataBuf.uint8(val.length).string(val, 'utf8');
                break;
            case 'listUint8':
            case 'listUint16':
            case 'listUint24': // TODO
            case 'listUint32':
                for (idxarr = 0; idxarr < val.length; idxarr += 1) {
                    dataBuf = dataBuf[type.slice(4).toLowerCase()](val[idxarr]);
                }
                break;
            case 'locationbuffer':
                for (idxarr = 0; idxarr < (val.length) / 6; idxarr += 1) {
                    dataBuf = dataBuf.uint32le(val[k][1]).uint32le(val[k][0]).uint16le(val[k+1]).uint16le(val[k+2])
                              .uint16le(val[k+3]).uint8(val[k+4]).uint8(val[k+5]);
                k += 6;
                }
                break;
            case 'zonebuffer': 
                for (idxarr = 0; idxarr < (val.length) / 2; idxarr+= 1) {
                    dataBuf = dataBuf.uint8(val[k]).uint16le(val[k+1]);
                k += 2;
                }
                break;
            case 'extfieldsets':
                for (idxarr = 0; idxarr < val.length; idxarr += 1) {
                    dataBuf = dataBuf.uint16le(val[idxarr].clstId).uint8(val[idxarr].len).buffer(new Buffer(val[idxarr].extField));
                }
                break;
            default:
                throw new Error('Unknown Data Type');
        }
    });

    return dataBuf.result();
};

/*************************************************************************************************/
/*** Add Parsing Rules to DChunks                                                              ***/
/*************************************************************************************************/
var rules = [ 'listUint8', 'listUint16', 'listUint24', 'listUint32',
              'preLenUint8', 'preLenUint16', 'preLenUint32'];

rules.forEach(function (ruName) {
    ru.clause(ruName, function (name) {
        var needTap = true,
            bufLen;

        if (ruName === 'preLenUint8') {
            this.uint8(name);
        } else if (ruName === 'preLenUint16') {
            this.uint16(name);
        } else if (ruName === 'preLenUint32') {
            this.uint32(name);
        } else {
            needTap = false;
            this.tap(function () {
                this.vars[name] = this.vars.preLenData;
                delete this.vars.preLenData;
            });
        }

        if (needTap)
            this.tap(function () {
                this.buffer('preLenData', this.vars[name]);
            });
    });
});

ru.clause('listUint8', function (name) {
    this.buffer(name, 8).tap(function () {
        var addrBuf = this.vars[name];
        this.vars[name] = addrBuf2Str(addrBuf);
    });
});

ru.clause('longaddr', function (name) {
    this.buffer(name, 8).tap(function () {
        var addrBuf = this.vars[name];
        this.vars[name] = addrBuf2Str(addrBuf);
    });
});

function addrBuf2Str(buf) {
    var bufLen = buf.length,
        val,
        strChunk = '0x';

    for (var i = 0; i < bufLen; i += 1) {
        val = buf.readUInt8(bufLen - i - 1);
        if (val <= 15) {
            strChunk += '0' + val.toString(16);
        } else {
            strChunk += val.toString(16);
        }
    }

    return strChunk;
}

module.exports = Functional;
