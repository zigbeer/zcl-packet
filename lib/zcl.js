/* jshint node: true */
'use strict';

var Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().Rule();

var zclmeta = require('./zclmeta'),
    // FoundClass = require('./foundation'),
    FuncClass = require('./functional');

var zcl = {
        Foundation: Foundation,
        Functional: Functional
    };

/*************************************************************************************************/
/*** Foundation Class                                                                          ***/
/*************************************************************************************************/
function Foundation(){

}

Foundation.prototype.parse = function (bufLen, zclBuf, callback) {

};

Foundation.prototype.frame = function (frameCntl, manufCode, seqNum, cmd, framePayload) {

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
function ZclFrame(frameCntl, manufCode, seqNum, cmdId, payload) {
    this.frameCntl = frameCntl;
    this.manufCode = manufCode;
    this.seqNum = seqNum;
    this.cmdId = cmdId;
    this.payload = payload;
}

ZclFrame.prototype.frame = function () {
    var frameCntlOctet = (this.frameCntl.frameType & 0x03) | ((this.frameCntl.manufSpec << 2) & 0x04) | ((this.frameCntl.direction << 3) & 0x08) | ((this.frameCntl.disDefaultRsp << 4) & 0x10),
        dataBuf = Concentrate().uint8(frameCntlOctet);

    if (this.frameCntl.manufSpec === 1) {
        dataBuf = dataBuf.uint16(this.manufCode);
    }

    dataBuf = dataBuf.uint8(this.seqNum).uint8(this.cmdId).buffer(this.payload);

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
    this.uint8('frameCntl').tap(function () {
        var filedValue = this.vars.frameCntl;

        delete this.vars.frameCntl;
        this.vars.frameType = (filedValue & 0x03);
        this.vars.manufSpec = ((filedValue >> 2) & 0x01);
        this.vars.direction = ((filedValue >> 3) & 0x01);
        this.vars.disDefaultRsp = ((filedValue >> 4) & 0x01);
    }).tap(function () {
        if (this.vars.manufSpec === 0)
            this.vars.manufCode = 0;
        else if (this.vars.manufSpec === 1)
            this.uint16('manufCode');
    }).tap(function () {
        this.uint8('seqNum').uint8('cmd');
    }).tap(function () {
        if (this.vars.manufSpec === 0)
            this.buffer('payload', bufLen - 3);
        else if (this.vars.manufSpec === 1)
            this.buffer('payload', bufLen - 5);
    });
});

module.exports = zcl;
