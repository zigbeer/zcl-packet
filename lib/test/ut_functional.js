/* jshint node: true */
'use strict';

var should = require('should'),
    Chance = require('chance'),
    chance = new Chance();

var zclmeta = require('../zclmeta'),
    funcClass = require('../functional');

var Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().Rule();

/*************************************************************************************************/
/*** Add Parsing Rules for Functional frame Test                                               ***/
/*************************************************************************************************/
var knownBufLen;

ru.clause('stringPreLen', function (name) {
    this.uint8('len').tap(function () {
        this.string(name, this.vars.len);
        knownBufLen += this.vars.len;
        delete this.vars.len;
    });
});

ru.clause('extfieldsets', function (name, bufLen) {
    this.tap(function () {
        this.buffer(name, bufLen - knownBufLen).tap(function () {
            var buf = this.vars[name];
            this.vars[name] = bufToArray(buf, 'extfieldsets');
            delete this.vars.preLenNum;
        });
    });  
});

function bufToArray(buf, type) {
    var i = 0,
        arr = [];

    if (type === 'extfieldsets') {
        var obj = {};
        i = 0;
        obj.clstId = buf.readUInt16LE(i);
        obj.len = buf.readUInt8(i+2);
        i += 3;
        obj.extField = [];
        for (var j = 0; j < obj.len; j+=1) {
            obj.extField.push(buf.readUInt8(i + j));
        }
        arr.push(obj);
    }

    return arr;
}

/*************************************************************************************************/
/*** Functional Class Test                                                                      ***/
/*************************************************************************************************/
describe('Functional Class Testing', function () {
    it('funcInstance check', function () {
        zclmeta.ClusterId.enums.forEach(function (clusterObj) {
            var Cluster = clusterObj.key;

            if (zclmeta[Cluster] === undefined || zclmeta[Cluster].Cmd === undefined)
                return;

            zclmeta[Cluster].Cmd.enums.forEach(function (cmdObject) {
                var cmd = cmdObject.key,
                    funcObj;

                funcObj = new funcClass(Cluster, 0, cmd);
                (funcObj.cmd).should.be.equal(cmd);
            });

            if (zclmeta[Cluster].CmdRsp === undefined)
                return;

            zclmeta[Cluster].CmdRsp.enums.forEach(function (cmdObject) {
                var cmd = cmdObject.key,
                    funcObj;

                funcObj = new funcClass(Cluster, 1, cmd);
                (funcObj.cmd).should.be.equal(cmd);
            });
        });
    });
});

/*************************************************************************************************/
/*** Functional 'frame' Method Test                                                             ***/
/*************************************************************************************************/
describe('Functional frame Testing', function () {
    zclmeta.ClusterId.enums.forEach(function (clusterObj) {
        var Cluster = clusterObj.key;

        // if (zclmeta[Cluster] === undefined || zclmeta[Cluster].Cmd === undefined)
        if (zclmeta[Cluster] === undefined || zclmeta[Cluster].CmdRsp === undefined)
            return;

        // zclmeta[Cluster].Cmd.enums.forEach(function (cmdObject) {
        zclmeta[Cluster].CmdRsp.enums.forEach(function (cmdObject) {
            var cmd = cmdObject.key,
                funcObj,
                reqParams,
                payload;

            // funcObj = new funcClass(Cluster, 0, cmd);
            funcObj = new funcClass(Cluster, 1, cmd);
            funcObj.parser = parser;
            delete funcObj.direction;


            reqParams = zclmeta.functional.getParams(Cluster, cmd);

            reqParams.forEach(function (arg) {
                arg.value = randomArgForFrame(arg.type);
                funcObj[arg.name] = arg.value;
            });

            funcObj.args = reqParams;
            payload = funcObj.frame();

            if (payload.length !== 0) {console.log('payload' + payload.length);
                funcObj.parser(payload.length, payload, function (err, result) {
                    it(funcObj.cmd + ' framer check', function () {
                        delete funcObj.cluster;
                        delete funcObj.cmd;
                        delete funcObj.cmdId;
                        delete funcObj.args;
                        delete funcObj.parser;
                        return funcObj.should.be.deepEqual(result);
                    });
                });
            } else {
                console.log('jackchased' + funcObj.cmd);
            }
        });
    });
});

/*************************************************************************************************/
/*** Functions for Functional frame Test                                                       ***/
/*************************************************************************************************/
function randomArgForFrame(type) {
    var testBuf,
        testArr,
        k;

    switch (type) {
        case 'uint8':
            return chance.integer({min: 0, max: 255});
        case 'uint16':
            return chance.integer({min: 0, max: 65535});
        case 'uint32':
            return chance.integer({min: 0, max: 4294967295});
        case 'int8' :
            return chance.integer({min: -128, max: 127});
        case 'int16' :
            return chance.integer({min: -32768, max: 32767});
        case 'int32' :
            return chance.integer({min: -2147483648, max: 2147483647});
        case 'floatle':
            return chance.floating({min: 0, max: 4294967295});
        case 'longaddr':
            return '0x00124b00019c2ee9';
        case 'stringPreLen':
            var stringLen = chance.integer({min: 0, max: 5});                
            return chance.string({length: stringLen});
        case 'preLenUint8':
        case 'preLenUint16':
        case 'preLenUint32':
            return 3;
        case 'dynUint8':
        case 'dynUint16':
        case 'dynUint24':
        case 'dynUint32':
            testArr = [];
            for (k = 0; k < 3; k += 1) {
                if (type === 'dynUint8')
                    testArr[k] = chance.integer({min: 0, max: 255});
                else if (type === 'dynUint16')
                    testArr[k] = chance.integer({min: 0, max: 65535});
                else if (type === 'dynUint24')
                    testArr[k] = chance.integer({min: 0, max: 16777215});
                else if (type === 'dynUint32')
                    testArr[k] = chance.integer({min: 0, max: 4294967295});
            }
            return testArr;
        case 'locationbuffer':
            testBuf = new Buffer(16);
            for (k = 0; k < 16; k += 1) {
                testBuf[k] = chance.integer({min: 0, max: 255});
            }
            return testBuf;
        case 'zonebuffer': 
            testArr = [];
            for (k = 0; k < 6; k += 2) {
                testArr[k] = chance.integer({min: 0, max: 255});
                testArr[k + 1] = chance.integer({min: 0, max: 65535});
            }
            return testArr;
        case 'extfieldsets':
            testBuf = new Buffer(6);
            for (k = 0; k < 6; k += 1) {
                testBuf[k] = chance.integer({min: 0, max: 255});
            }
            return [{clstId: 0x0006, len: 0x3, extField: [0x01, 0x02, 0x03]}];
        default:
            break;
    }

    return;
}

function parser(bufLen, zclBuf, callback) {
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
}
