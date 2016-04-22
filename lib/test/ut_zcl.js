var _ = require('lodash'),
    should = require('should'),
    zcl = require('../zcl'),
    FoundPayload = require('../foundation'),
    foundMeta = require('../zclmeta').foundation;

var Foundation = zcl.Foundation,
    Functional = zcl.Functional;


/*************************************************************************************************/
/*** Foundation Class Test                                                                     ***/
/*************************************************************************************************/
describe('Foundation Class Test', function() {
    var found = new Foundation();

    describe('Constructor Check', function () {
        it('Foundation()', function () {
            found._zclFrame.should.be.deepEqual({});
        });
    });

    describe('Signature Check', function () {
        it('frame()', function () {
            (function () { found.frame({}, 0, 0, 'read', []); }).should.not.throw();

            (function () { found.frame([], 0, 0, 'read', []); }).should.throw();
            (function () { found.frame('xxx', 0, 0, 'read', []); }).should.throw();
            (function () { found.frame(123, 0, 0, 'read', []); }).should.throw();
            (function () { found.frame(undefined, 0, 0, 'read', []); }).should.throw();
            (function () { found.frame([], {}, 0, 'read', []); }).should.throw();
            (function () { found.frame([], [], 0, 'read', []); }).should.throw();
            (function () { found.frame([], 'xxx', 0, 'read', []); }).should.throw();
            (function () { found.frame([], undefined, 0, 'read', []); }).should.throw();
            (function () { found.frame([], 0, {}, 'read', []); }).should.throw();
            (function () { found.frame([], 0, [], 'read', []); }).should.throw();
            (function () { found.frame([], 0, 'xxx', 'read', []); }).should.throw();
            (function () { found.frame([], 0, 'undefined', 'read', []); }).should.throw();
            (function () { found.frame([], 0, 'undefined', {}, []); }).should.throw();
            (function () { found.frame([], 0, 'undefined', [], []); }).should.throw();
            (function () { found.frame([], 0, 'undefined', 'xxx', []); }).should.throw();
            (function () { found.frame([], 0, 'undefined', 123, []); }).should.throw();
            (function () { found.frame([], 0, 'undefined', undefined, []); }).should.throw();
        });

        it('parse()', function () {
            (function () { found.parse(new Buffer([])); }).should.not.throw();

            (function () { found.parse({}); }).should.throw();
            (function () { found.parse([]); }).should.throw();
            (function () { found.parse('xxx'); }).should.throw();
            (function () { found.parse(123); }).should.throw();
            (function () { found.parse(undefined); }).should.throw();
        });
    });

    describe('Functional Check', function () {
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
                cmd: 3,
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
                cmd: 6,
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
                cmd: 15,
                payload: [
                    {attrId: 0x0011, selector: {indicator: 3, indexes: [0x0101, 0x0202, 0x0303]}, dataType: 0x21, attrData: 60000},
                    {attrId: 0x0022, selector: {indicator: 0}, dataType: 0x50, attrData: {elmType: 0x20, numElms: 3, elmVals: [1, 2, 3]}},
                    {attrId: 0x0033, selector: {indicator: 1, indexes: [0x0101]}, dataType: 0x4c, attrData: {numElms: 0x01, structElms: [{elmType: 0x20, elmVal: 1}]}}
                ]
            }];

        
        zclFrames.forEach(function(zclFrame) {
            var zBuf;
                foundFrame = new Foundation();
            
            it('frame() and parse() Check', function (done) {
                zBuf = foundFrame.frame(zclFrame.frameCntl, zclFrame.manufCode, zclFrame.seqNum, zclFrame.cmd, zclFrame.payload);
                foundFrame.parse(zBuf, function (err, result) {
                    if (_.isEqual(zclFrame, result)) done();
                });
            });
        });
    });
});




