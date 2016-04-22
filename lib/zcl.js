/* jshint node: true */
'use strict';

var Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().Rule();

var zclmeta = require('./zclmeta'),
    FoundPayload = require('./foundation'),
    FuncClass = require('./functional');

var zcl = {
        Foundation: Foundation,
        Functional: Functional
    };

/*************************************************************************************************/
/*** Foundation Class                                                                          ***/
/*************************************************************************************************/
function Foundation(){
    this._zclFrame = new ZclFrame();
}

Foundation.prototype.parse = function (zclBuf, callback) {
    var self = this,
        cmdName;

    if (!Buffer.isBuffer(zclBuf)) throw new Error('zclBuf must ba a buffer.');

    this._zclFrame.parse(zclBuf.length, zclBuf, function (data) {
        cmdName = zclmeta.FoundationId.get(data.cmd).key;
        (new FoundPayload(cmdName)).parse(data.payload, function (err, foundPayload) {
            if (err) {
                callback(err);
            } else {
                data.payload = foundPayload;
                callback(null, data);
            }
        });
    });
};

Foundation.prototype.frame = function (frameCntl, manufCode, seqNum, cmd, framePayload) {
    var cmdId,
        cmdName,
        payload;

    if ((typeof cmd !== 'string') && (typeof cmd !== 'number')) 
        throw new Error('cmdName must be a string or number.');

    cmdId = zclmeta.FoundationId.get(cmd).value;
    cmdName = zclmeta.FoundationId.get(cmd).key;
    payload = (new FoundPayload(cmdName)).frame(framePayload);

    return this._zclFrame.frame(frameCntl, manufCode, seqNum, cmdId, payload);
};

/*************************************************************************************************/
/*** Functional Class                                                                          ***/
/*************************************************************************************************/
function Functional(clusterId){
    this.clusterId = clusterId;
}

Functional.prototype.parse = function (bufLen, zclBuf, callback) {
    var self = this,
        zclFrame,
        funcObj;

    zclFrame = new ZclFrame();
  
    zclFrame.parse(bufLen, zclBuf, function (data) {
        // data = { frameType, manufSpec, direction, disDefaultRsp, manufCode, seqNum, cmd, payload }
        
        funcObj = new FuncClass(self.clusterId, data.direction, data.cmd);
        data.direction = funcObj.direction;
        data.cmd = funcObj.cmd;

        funcObj.parse(data.payload.length, data.payload, function (err, payloadData) {
            if (err) {
                callback(err);
            } else {
                data.payload = payloadData;
                callback(null, data);
            }
        });
    });
};

Functional.prototype.frame = function (frameCntl, manufCode, seqNum, cmd, valObj) {
    // frameCntl: Object, manufCode: Number, seqNum: Number, cmd: String | Number, valObj: Object | Array
    var zclFrame,
        funcObj;

    funcObj = new FuncClass(this.clusterId, frameCntl.direction, cmd, valObj);
    zclFrame = new ZclFrame(frameCntl, manufCode, seqNum, funcObj.cmdId, funcObj.frame());

    return zclFrame.frame();
};

/*************************************************************************************************/
/*** ZclFrame Class                                                                            ***/
/*************************************************************************************************/
function ZclFrame() { }

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

ZclFrame.prototype.parse = function (bufLen, buf, callback) {
    var parser;

    parser = DChunks().join(ru.zclFrame(bufLen)).compile();

    parser.once('parsed', function (result) {
        parser = null;
        callback(result);
    });

    parser.end(buf);
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
            manufSpec: ((filedValue >> 2) & 0x01),
            direction: ((filedValue >> 3) & 0x01),
            disDefaultRsp: ((filedValue >> 4) & 0x01),
        };
        manufSpec = this.vars.frameCntl.manufSpec;
    }).tap(function () {
        if (manufSpec === 0)
            this.vars.manufCode = 0;
        else if (manufSpec === 1)
            this.uint16('manufCode');
    }).tap(function () {
        this.uint8('seqNum').uint8('cmd');
    }).tap(function () {
        if (manufSpec === 0)
            this.buffer('payload', bufLen - 3);
        else if (manufSpec === 1)
            this.buffer('payload', bufLen - 5);
    });
});

module.exports = zcl;
