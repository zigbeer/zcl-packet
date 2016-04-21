/* jshint node: true */
'use strict';

var zclmeta = require('./zclmeta'),
    Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().Rule();

/*************************************************************************************************/
/*** Functional Class                                                                          ***/
/*************************************************************************************************/
function Functional(clusterId, direction, cmd, args) { // args is optional, and can be an array or a value-object if given
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

    if (!direction) // Client To Server
        command = zclmeta[this.cluster].Cmd.get(cmd);
    else            // Server To Client
        command = zclmeta[this.cluster].CmdRsp.get(cmd);

    if (!command)
        throw new Error('Unrecognized command');

    this.cmd = command.key;
    this.cmdId = command.value;

    this.direction = zclmeta.functional.getDirection(this.cluster, this.cmd);

    if (!this.direction)
        throw new Error('Unrecognized direction');

    // if args is given, this is for REQ transmission
    // otherwise, maybe just for parsing RSP packet
    if (args)
        params = zclmeta.functional.getParams(this.cluster, this.cmd);    // [ { name, type }, ... ]

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

var knownBufLen;
Functional.prototype.parse = function (bufLen, zclBuf, callback) {
    var chunkRules = [],
        err,
        params,
        parser;

    if ((this.cluster === 'GenScenes') && (this.cmd === 'Add' || this.cmd === 'EnhancedAdd' || this.cmd === 'ViewRsp' || this.cmd === 'EnhancedViewRsp') )
        knownBufLen = zclmeta.functional.get(this.cluster, this.cmd).knownBufLen;

    params = zclmeta.functional.getParams(this.cluster, this.cmd);

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
            k = 0;

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
            case 'preLenUint8':
            case 'preLenUint16':
            case 'preLenUint32':
                type = type.slice(6).toLowerCase();
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
            case 'stringPreLen':
                if (typeof val !== 'string') {
                    throw new Error('The value for ' + val + ' must be an string.');
                }
                dataBuf = dataBuf.uint8(val.length).string(val, 'utf8');
                break;
            case 'dynUint8':
            case 'dynUint16':
            case 'dynUint32':
                type = type.slice(3).toLowerCase();
                for (idxarr = 0; idxarr < val.length; idxarr += 1) {
                    dataBuf = dataBuf[type](val[idxarr]);
                }
                break;
            case 'dynUint24':
                for (idxarr = 0; idxarr < val.length; idxarr += 1) {
                    var value = val[idxarr],
                        msb24 = (value & 0xff0000) >> 16,
                        mid24 = (value & 0xff00) >> 8,
                        lsb24 = (value & 0xff) ;
                    dataBuf = dataBuf.uint8(lsb24).uint8(mid24).uint8(msb24);
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
var rules = ['preLenUint8', 'preLenUint16', 'preLenUint32'];

rules.forEach(function (ruName) {
    ru.clause(ruName, function (name) {

        if (ruName === 'preLenUint8') {
            this.uint8(name);
        } else if (ruName === 'preLenUint16') {
            this.uint16(name);
        } else if (ruName === 'preLenUint32') {
            this.uint32(name);
        }

        this.tap(function () {
            this.vars.preLenNum = this.vars[name];
        });
    });
});

ru.clause('dynUint8', function (name) {
    this.tap(function () {
        this.buffer(name, this.vars.preLenNum).tap(function () {
            var buf = this.vars[name];
            this.vars[name] = bufToArray(buf, 'uint8');
            delete this.vars.preLenNum;
        });
    });
});

ru.clause('dynUint16', function (name) {
    this.tap(function () {
        this.buffer(name, 2 * this.vars.preLenNum).tap(function () {
            var buf = this.vars[name];
            this.vars[name] = bufToArray(buf, 'uint16');
            delete this.vars.preLenNum;
        });
    });
});

ru.clause('dynUint24', function (name) {
    this.tap(function () {
        this.buffer(name, 3 * this.vars.preLenNum).tap(function () {
            var buf = this.vars[name];
            this.vars[name] = bufToArray(buf, 'uint24');
            delete this.vars.preLenNum;
        });
    });
});

ru.clause('dynUint32', function (name) {
    this.tap(function () {
        this.buffer(name, 4 * this.vars.preLenNum).tap(function () {
            var buf = this.vars[name];
            this.vars[name] = bufToArray(buf, 'uint32');
            delete this.vars.preLenNum;
        });
    });
});

ru.clause('longaddr', function (name) {
    this.buffer(name, 8).tap(function () {
        var addrBuf = this.vars[name];
        this.vars[name] = addrBuf2Str(addrBuf);
    });
});

ru.clause('locationbuffer', function (name) {
    this.buffer(name, 16 * this.vars.preLenNum).tap(function () {
        delete this.vars.preLenNum;
    });
});

ru.clause('zonebuffer', function (name) {
    this.tap(function () {
        this.buffer(name, 3 * this.vars.preLenNum).tap(function () {
            var buf = this.vars[name];
            this.vars[name] = bufToArray(buf, 'zonebuffer');
            delete this.vars.preLenNum;
        });
    });
});

ru.clause('stringPreLen', function (name) {
    this.uint8('len').tap(function () {
        this.string(name, this.vars.len);
        knownBufLen += this.vars.len;
        delete this.vars.len;
    });
});

ru.clause('extfieldsets', function (name, bufLen) {
    this.tap(function () {
        this.buffer(name, bufLen - knownBufLen);
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

function bufToArray(buf, type) {
    var i,
        arr = [];

    if (type === 'uint8') {
        for (i = 0; i < buf.length; i += 1) {
            arr.push(buf.readUInt8(i));
        }
    } else if (type === 'uint16') {
        for (i = 0; i < buf.length; i += 2) {
            arr.push(buf.readUInt16LE(i));
        }
    } else if (type === 'uint24') {
        for (i = 0; i < buf.length; i += 3) {
            var lsb = buf.readUInt16LE(i),
                msb = buf.readUInt8(i + 2),
                val = (msb << 16) + lsb;
            arr.push(val);
        }
    } else if (type === 'uint32') {
        for (i = 0; i < buf.length; i += 4) {
            arr.push(buf.readUInt32LE(i));
        }
    } else if (type === 'zonebuffer') {
        for (i = 0; i < buf.length; i += 3) {
            arr.push(buf.readUInt8(i), buf.readUInt16LE(i + 1));
        }
    }

    return arr;
}

module.exports = Functional;
