/* jshint node: true */
'use strict';

var Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().Rule();

var FoundPayload = require('./foundation'),
    FuncPayload = require('./functional');

var zcl = {
        Foundation: Foundation,
        Functional: Functional
    };

/*************************************************************************************************/
/*** Foundation Class                                                                          ***/
/*************************************************************************************************/
function Foundation() {
    this._zclFrame = new ZclFrame();
}

Foundation.prototype.parse = function (zclBuf, callback) {
    var self = this,
        foundObj;

    if (!Buffer.isBuffer(zclBuf)) throw new Error('zclBuf must be a buffer.');

    this._zclFrame.parse(zclBuf, function (data) {
        // data = { frameCntl: { frameType, manufSpec, direction, disDefaultRsp}, manufCode, seqNum, cmd, payload }

        foundObj = new FoundPayload(data.cmd);
        data.cmd = foundObj.cmd;                         // make sure data.cmd will be string

        foundObj.parse(data.payload, function (err, foundPayload) {
            if (err) {
                callback(err);
            } else {
                data.payload = foundPayload;
                callback(null, data);
            }
        });
    });
};

Foundation.prototype.frame = function (frameCntl, manufCode, seqNum, cmd, zclPayload) {
    // frameCntl: Object, manufCode: Number, seqNum: Number, cmd: String | Number, zclPayload: Object | Array
    var foundObj;

    if ((typeof cmd !== 'string') && (typeof cmd !== 'number')) 
        throw new Error('cmd must be a string or number.');

    foundObj = new FoundPayload(cmd);

    return this._zclFrame.frame(frameCntl, manufCode, seqNum, foundObj.cmdId, foundObj.frame(zclPayload));
};

/*************************************************************************************************/
/*** Functional Class                                                                          ***/
/*************************************************************************************************/
function Functional(clusterId){
    this.clusterId = clusterId;
    this._zclFrame = new ZclFrame();
}

Functional.prototype.parse = function (zclBuf, callback) {
    var self = this,
        funcObj;

    if (!Buffer.isBuffer(zclBuf)) throw new Error('zclBuf must be a buffer.');

    this._zclFrame.parse(zclBuf, function (data) {
        // data = { frameCntl: { frameType, manufSpec, direction, disDefaultRsp}, manufCode, seqNum, cmd, payload }

        funcObj = new FuncPayload(self.clusterId, data.frameCntl.direction, data.cmd);
        data.frameCntl.direction = funcObj.direction;    // make sure data.direction will be string
        data.cmd = funcObj.cmd;                          // make sure data.cmd will be string

        funcObj.parse(data.payload, function (err, funcPayload) {
            if (err) {
                callback(err);
            } else {
                data.payload = funcPayload;
                callback(null, data);
            }
        });
    });
};

Functional.prototype.frame = function (frameCntl, manufCode, seqNum, cmd, zclPayload) {
    // frameCntl: Object, manufCode: Number, seqNum: Number, cmd: String | Number, zclPayload: Object | Array
    var funcObj;

    if ((typeof cmd !== 'string') && (typeof cmd !== 'number')) 
        throw new Error('cmd must be a string or number.');

    funcObj = new FuncPayload(this.clusterId, frameCntl.direction, cmd, zclPayload);

    return this._zclFrame.frame(frameCntl, manufCode, seqNum, funcObj.cmdId, funcObj.frame());
};

/*************************************************************************************************/
/*** ZclFrame Class                                                                            ***/
/*************************************************************************************************/
function ZclFrame() {}

ZclFrame.prototype.parse = function (buf, callback) {
    var parser;

    parser = DChunks().join(ru.zclFrame(buf.length)).compile();

    parser.once('parsed', function (result) {
        parser = null;
        callback(result);
    });

    parser.end(buf);
};

ZclFrame.prototype.frame = function (frameCntl, manufCode, seqNum, cmdId, payload) {
    if (typeof frameCntl !== 'object' || Array.isArray(frameCntl)) throw new Error('frameCntl must be an object');
    if (typeof manufCode !== 'number') throw new Error('manufCode must be an number');
    if (typeof seqNum !== 'number') throw new Error('seqNum must be an number');

    var frameCntlOctet = (frameCntl.frameType & 0x03) | ((frameCntl.manufSpec << 2) & 0x04) | ((frameCntl.direction << 3) & 0x08) | ((frameCntl.disDefaultRsp << 4) & 0x10),
        dataBuf = Concentrate().uint8(frameCntlOctet);

    if (frameCntl.manufSpec === 1) {
        dataBuf = dataBuf.uint16(manufCode);
    }

    dataBuf = dataBuf.uint8(seqNum).uint8(cmdId).buffer(payload);

    return dataBuf.result();
};

/*************************************************************************************************/
/*** Add Parsing Rules to DChunks                                                              ***/
/*************************************************************************************************/
ru.clause('zclFrame', function (bufLen) {
    var manufSpec;

    this.uint8('frameCntl').tap(function () {
        var filedValue = this.vars.frameCntl;
        
        this.vars.frameCntl = {
            frameType: (filedValue & 0x03),
            manufSpec: (filedValue & 0x04) >> 2,
            direction: (filedValue & 0x08) >> 3,
            disDefaultRsp: (filedValue & 0x10) >> 4,
        };
        manufSpec = this.vars.frameCntl.manufSpec;
    }).tap(function () {
        if (!manufSpec)
            this.vars.manufCode = 0;
        else
            this.uint16('manufCode');
    }).tap(function () {
        this.uint8('seqNum').uint8('cmd');
    }).tap(function () {
        if (!manufSpec)
            this.buffer('payload', bufLen - 3);
        else
            this.buffer('payload', bufLen - 5);
    });
});

module.exports = zcl;
