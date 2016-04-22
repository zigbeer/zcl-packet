/* jshint node: true */
'use strict';

var should = require('should'),
    Chance = require('chance'),
    chance = new Chance();

var Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().Rule();

var zclmeta = require('../zclmeta'),
    funcClass = require('../functional');

/*************************************************************************************************/
/*** Functional Class Test                                                                     ***/
/*************************************************************************************************/
describe('Functional Class Testing', function () {
    it('funcInstance check', function () {
        zclmeta.ClusterId.enums.forEach(function (clusterObj) {
            var Cluster = clusterObj.key;

            if (zclmeta[Cluster] === undefined || zclmeta[Cluster].Cmd === undefined)       // Cmd Test
            // if (zclmeta[Cluster] === undefined || zclmeta[Cluster].CmdRsp === undefined) // CmdRsp Test
                return;

            zclmeta[Cluster].Cmd.enums.forEach(function (cmdObj) {          // Cmd Test
            // zclmeta[Cluster].CmdRsp.enums.forEach(function (cmdObj) {    // CmdRsp Test
                var cmd = cmdObj.key,
                    funcObj;

                funcObj = new funcClass(Cluster, 0, cmd);                   // Cmd Test
                // funcObj = new funcClass(Cluster, 1, cmd);                // CmdRsp Test

                (funcObj.cmd).should.be.equal(cmd);
            });
        });
    });
});

/*************************************************************************************************/
/*** Functional frame() and parse() Test                                                       ***/
/*************************************************************************************************/
describe('Functional frame() and parse() Testing', function () {
    zclmeta.ClusterId.enums.forEach(function (clusterObj) {
        var Cluster = clusterObj.key;

        if (zclmeta[Cluster] === undefined || zclmeta[Cluster].Cmd === undefined)       // Cmd Test
        // if (zclmeta[Cluster] === undefined || zclmeta[Cluster].CmdRsp === undefined) // CmdRsp Test
            return;

        zclmeta[Cluster].Cmd.enums.forEach(function (cmdObj) {          // Cmd Test
        // zclmeta[Cluster].CmdRsp.enums.forEach(function (cmdObj) {    // CmdRsp Test
            var cmd = cmdObj.key,
                funcObj,
                reqParams,
                payload;

            funcObj = new funcClass(Cluster, 0, cmd);                   // Cmd Test
            // funcObj = new funcClass(Cluster, 1, cmd);                // CmdRsp Test
            delete funcObj.direction;

            reqParams = zclmeta.functional.getParams(Cluster, cmd);

            reqParams.forEach(function (arg) {
                arg.value = randomArg(arg.type);
                funcObj[arg.name] = arg.value;
            });

            funcObj.args = reqParams;
            payload = funcObj.frame();

            if (payload.length !== 0) {
                funcObj.parse(payload.length, payload, function (err, result) {
                    it(funcObj.cmd + ' frame() and parse() check', function () {
                        delete funcObj.cluster;
                        delete funcObj.cmd;
                        delete funcObj.cmdId;
                        delete funcObj.args;
                        return funcObj.should.be.deepEqual(result);
                    });
                });
            }
        });
    });
});

function randomArg(type) {
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
            var stringLen = chance.integer({min: 0, max: 255});
            return chance.string({length: stringLen});
        case 'preLenUint8':
        case 'preLenUint16':
        case 'preLenUint32':
            return 10;
        case 'dynUint8':
        case 'dynUint16':
        case 'dynUint24':
        case 'dynUint32':
            testArr = [];
            for (k = 0; k < 10; k += 1) {
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
            for (k = 0; k < 20; k += 2) {
                testArr[k] = chance.integer({min: 0, max: 255});
                testArr[k + 1] = chance.integer({min: 0, max: 65535});
            }
            return testArr;
        case 'extfieldsets':
            return [ { clstId: 0x0006, len: 0x3, extField: [0x01, 0x02, 0x03]}, { clstId: 0x0009, len: 0x5, extField: [0x05, 0x04, 0x03, 0x02, 0x01]} ];
        default:
            break;
    }

    return;
}
