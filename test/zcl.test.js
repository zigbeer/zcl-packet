var expect = require('chai').expect,
    zcl = require('../index');

describe('APIs Arguments Check for Throwing Error', function() {
    describe('#.frame', function() {
        it('should be a function', function () {
            expect(zcl.frame).to.be.a('function');
        });
    });

    describe('#.parse', function() {
        it('should be a function', function () {
            expect(zcl.parse).to.be.a('function');
        });
    });

    describe('#.header', function() {
        it('should be a function', function () {
            expect(zcl.header).to.be.a('function');
        });
    });
});