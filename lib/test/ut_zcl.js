/* jshint node: true */
'use strict';

var should = require('should'),
    ZclPacket = require('../zcl');

/*************************************************************************************************/
/*** Foundation Class Test                                                                     ***/
/*************************************************************************************************/
describe('ZclPacket Class Test', function () {
    var func = new ZclPacket('functional', 0x0006);

    describe('Constructor Check', function () {
        it('new ZclPacket()', function () {
            func.cmdType.should.be.equal('functional');
            func.clusterId.should.be.equal(0x0006);
            func._zclFrame.should.be.deepEqual({});
        });
    });

    describe('Signature Check', function () {
        it('frame()', function () {
            (function () { func.frame({}, 0, 0, 'Toggle', []); }).should.not.throw();
            (function () { func.frame({}, 0, 0, 0, {}); }).should.not.throw();

            (function () { func.frame([], 0, 0, 'Toggle', []); }).should.throw();
            (function () { func.frame('xxx', 0, 0, 'Toggle', []); }).should.throw();
            (function () { func.frame(123, 0, 0, 'Toggle', []); }).should.throw();
            (function () { func.frame(undefined, 0, 0, 'Toggle', []); }).should.throw();
            (function () { func.frame([], {}, 0, 'Toggle', []); }).should.throw();
            (function () { func.frame([], [], 0, 'Toggle', []); }).should.throw();
            (function () { func.frame([], 'xxx', 0, 'Toggle', []); }).should.throw();
            (function () { func.frame([], undefined, 0, 'Add', []); }).should.throw();
            (function () { func.frame([], 0, {}, 'Toggle', []); }).should.throw();
            (function () { func.frame([], 0, [], 'Toggle', []); }).should.throw();
            (function () { func.frame([], 0, 'xxx', 'Toggle', []); }).should.throw();
            (function () { func.frame([], 0, 'undefined', 'Add', []); }).should.throw();
            (function () { func.frame([], 0, 0, {}, []); }).should.throw();
            (function () { func.frame([], 0, 0, [], []); }).should.throw();
            (function () { func.frame([], 0, 0, 'xxx', []); }).should.throw();
            (function () { func.frame([], 0, 0, 123, []); }).should.throw();
            (function () { func.frame([], 0, 0, undefined, []); }).should.throw();
        });

        it('parse()', function () {
            (function () { func.parse(new Buffer([])); }).should.not.throw();

            (function () { func.parse({}); }).should.throw();
            (function () { func.parse([]); }).should.throw();
            (function () { func.parse('xxx'); }).should.throw();
            (function () { func.parse(123); }).should.throw();
            (function () { func.parse(undefined); }).should.throw();
        });
    });

    describe('foundPacket Functional Check', function () {
        var zclFrames = [
            {
                frameCntl: {
                    frameType: 1,
                    manufSpec: 0,
                    direction: 0,
                    disDefaultRsp: 1
                },
                manufCode: 0,
                seqNum: 0,
                cmd: 'writeUndiv',
                payload: [
                    {attrId: 0x1234, dataType: 0x41, attrData: 'hello'},
                    {attrId: 0xabcd, dataType: 0x24, attrData: [100, 2406]},
                    {attrId: 0x1234, dataType: 0x08, attrData: 60}
                ]
            },
            {
                frameCntl: {
                    frameType: 3,
                    manufSpec: 1,
                    direction: 0,
                    disDefaultRsp: 1
                },
                manufCode: 0xaaaa,
                seqNum: 1,
                cmd: 'configReport',
                payload: [
                    {direction: 0, attrId: 0x0001, dataType: 0x20, minRepIntval: 500, maxRepIntval: 1000, repChange: 10},
                    {direction: 1, attrId: 0x0001, timeout: 999},
                    {direction: 0, attrId: 0x0001, dataType: 0x43, minRepIntval: 100, maxRepIntval: 200}
                ]
            },
            {
                frameCntl: {
                    frameType: 2,
                    manufSpec: 0,
                    direction: 1,
                    disDefaultRsp: 1
                },
                manufCode: 0,
                seqNum: 2,
                cmd: 'writeStrcut',
                payload: [
                    {attrId: 0x0011, selector: {indicator: 3, indexes: [0x0101, 0x0202, 0x0303]}, dataType: 0x21, attrData: 60000},
                    {attrId: 0x0022, selector: {indicator: 0}, dataType: 0x50, attrData: {elmType: 0x20, numElms: 3, elmVals: [1, 2, 3]}},
                    {attrId: 0x0033, selector: {indicator: 1, indexes: [0x0101]}, dataType: 0x4c, attrData: {numElms: 0x01, structElms: [{elmType: 0x20, elmVal: 1}]}}
                ]
            }];

        zclFrames.forEach(function(zclFrame) {
            var zBuf,
                foundPacket = new ZclPacket('foundation');

            it('frame() and parse() Check', function () {
                zBuf = foundPacket.frame(zclFrame.frameCntl, zclFrame.manufCode, zclFrame.seqNum, zclFrame.cmd, zclFrame.payload);
                foundPacket.parse(zBuf, function (err, result) {
                    return zclFrame.should.be.deepEqual(result);
                });
            });
        });
    });

    describe('funcPacket Functional Check', function () {
      var zclFrames = [
            {
                frameCntl: {
                    frameType: 1,
                    manufSpec: 0,
                    direction: 0,
                    disDefaultRsp: 1
                },
                manufCode: 0,
                seqNum: 0,
                cmd: 'Add',
                payload: {
                    groupid: 0x1234,
                    sceneid: 0x08,
                    transtime: 0x2468,
                    scenename: 'genscenes',
                    extensionfieldsets: [ { clstId: 0x0006, len: 0x3, extField: [0x01, 0x02, 0x03]}, 
                                          { clstId: 0x0009, len: 0x5, extField: [0x05, 0x04, 0x03, 0x02, 0x01]} ]
                }
            },
            {
                frameCntl: {
                    frameType: 3,
                    manufSpec: 1,
                    direction: 1,
                    disDefaultRsp: 0
                },
                manufCode: 0xaaaa,
                seqNum: 1,
                cmd: 'AddRsp',
                payload: {
                    status: 0x26,
                    groupId: 0xffff,
                    sceneId: 0x06
                }
            },
            {
                frameCntl: {
                    frameType: 2,
                    manufSpec: 0,
                    direction: 1,
                    disDefaultRsp: 1
                },
                manufCode: 0,
                seqNum: 2,
                cmd: 'GetSceneMembershipRsp',
                payload: {
                    status: 0x01,
                    capacity: 0x02,
                    groupid: 0x2468,
                    scenecount: 3,
                    scenelist: [0x22, 0x33, 0x56]
                }
            }];

        zclFrames.forEach(function(zclFrame) {
            var zBuf,
                funcPacket = new ZclPacket('functional', 0x0005);
            
            it('frame() and parse() Check', function () {
                zBuf = funcPacket.frame(zclFrame.frameCntl, zclFrame.manufCode, zclFrame.seqNum, zclFrame.cmd, zclFrame.payload);
                funcPacket.parse(zBuf, function (err, result) {
                    if (result.cmd === 'Add')
                        result.frameCntl.direction = 0;
                    else 
                        result.frameCntl.direction = 1;

                    return zclFrame.should.be.deepEqual(result);
                });
            });
        });
    });
});
