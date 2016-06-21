var expect = require('chai').expect,
    zcl = require('../index');

describe('APIs Arguments Check for Throwing Error', function() {
    describe('#.frame', function() {
        var frameCntl = {frameType:1, manufSpec: 0, direction: 0, disDefaultRsp: 1};

        it('should be a function', function () {
            expect(zcl.frame).to.be.a('function');
        });

        it('should throw TypeError if input frameCntl is not an object', function () {
            expect(function () { return zcl.frame(undefined, 0, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(null, 0, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(NaN, 0, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame([], 0, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(true, 0, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(new Date(), 0, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(function () {}, 0, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);

            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, 'genOnOff'); }).not.to.throw(TypeError);
        });

        it('should throw TypeError if input manufCode is not a number', function () {
            expect(function () { return zcl.frame(frameCntl, undefined, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, null, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, NaN, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, [], 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, true, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, new Date(), 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, function () {}, 0, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
        });

        it('should throw TypeError if input seqNum is not a number', function () {
            expect(function () { return zcl.frame(frameCntl, 0, undefined, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, null, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, NaN, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, [], 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, true, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, new Date(), 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, function () {}, 'toggle', {}, 'genOnOff'); }).to.throw(TypeError);
        });

        it('should throw TypeError if input cmd is not a number and not a string', function () {
            expect(function () { return zcl.frame(frameCntl, 0, 0, undefined, {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, null, {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, NaN, {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, [], {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, true, {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, new Date(), {}, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, function () {}, {}, 'genOnOff'); }).to.throw(TypeError);

            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, 'genOnOff'); }).not.to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 2, {}, 'genOnOff'); }).not.to.throw(TypeError);
        });

        it('should throw TypeError if input zclPayload is not an object and not an array', function () {
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', undefined, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', null, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', NaN, 'genOnOff'); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', true, 'genOnOff'); }).to.throw(TypeError);

            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, 'genOnOff'); }).not.to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', [], 'genOnOff'); }).not.to.throw(TypeError);
        });

        it('should throw TypeError if input clusterId is not a number and not a string', function () {
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, undefined); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, null); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, NaN); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, []); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, true); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, new Date()); }).to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, function () {}); }).to.throw(TypeError);

            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, 'genOnOff'); }).not.to.throw(TypeError);
            expect(function () { return zcl.frame(frameCntl, 0, 0, 'toggle', {}, 6); }).not.to.throw(TypeError);
        });
    });

    describe('#.parse', function() {
        var zclBuf = new Buffer([0x11, 0x00, 0x02]);

        it('should be a function', function () {
            expect(zcl.parse).to.be.a('function');
        });

        it('should throw TypeError if input zclBuf is not a buffer', function () {
            expect(function () { return zcl.parse(undefined, 0, function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse(null, 0, function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse(NaN, 0, function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse([], 0, function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse(true, 0, function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse(new Date(), 0, function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse(function () {}, 0, function () {}); }).to.throw(TypeError);
        });

        it('should throw TypeError if input clusterId is not a number and not a string', function () {
            expect(function () { return zcl.parse(zclBuf, undefined, function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse(zclBuf, null, function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse(zclBuf, NaN, function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse(zclBuf, [], function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse(zclBuf, true, function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse(zclBuf, new Date(), function () {}); }).to.throw(TypeError);
            expect(function () { return zcl.parse(zclBuf, function () {}, function () {}); }).to.throw(TypeError);

            expect(function () { return zcl.parse(zclBuf, 'genOnOff', function () {}); }).not.to.throw(TypeError);
            expect(function () { return zcl.parse(zclBuf, 6, function () {}); }).not.to.throw(TypeError);
        });
    });

    describe('#.header', function() {
        it('should be a function', function () {
            expect(zcl.header).to.be.a('function');
        });

        it('should throw TypeError if input buf is not a buffer', function () {
            expect(function () { return zcl.header(undefined); }).to.throw(TypeError);
            expect(function () { return zcl.header(null); }).to.throw(TypeError);
            expect(function () { return zcl.header(NaN); }).to.throw(TypeError);
            expect(function () { return zcl.header([]); }).to.throw(TypeError);
            expect(function () { return zcl.header(true); }).to.throw(TypeError);
            expect(function () { return zcl.header(new Date()); }).to.throw(TypeError);
            expect(function () { return zcl.header(function () {}); }).to.throw(TypeError);
        });
    });
});