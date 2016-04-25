/* jshint node: true */
'use strict';

var Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().Rule();

var FoundPayload = require('./foundation'),
    FuncPayload = require('./functional');

function Zcl (cmdType, clusterId) {
    if (cmdType !== 'foundation' && cmdType !== 'functional')
        throw new Error('cmdType must be a string of foundation or functional.');

    if (cmdType === 'functional' && !clusterId)
        throw new Error('clusterId must be filled.');
    
    this.cmdType = cmdType;
    this.clusterId = (clusterId) ? clusterId : null;
    this._zclFrame = new ZclFrame();
} 

Zcl.prototype.parse = function (zclBuf, callback) {
    var self = this,
        zclObj;

    if (!Buffer.isBuffer(zclBuf)) throw new Error('zclBuf must be a buffer.');

    this._zclFrame.parse(zclBuf, function (data) {
        // data = { frameCntl: { frameType, manufSpec, direction, disDefaultRsp}, manufCode, seqNum, cmd, payload }

        if (self.cmdType === 'foundation') {
            zclObj = new FoundPayload(data.cmd);
        } else {
            zclObj = new FuncPayload(self.clusterId, data.frameCntl.direction, data.cmd);
            data.frameCntl.direction = zclObj.direction;
        }

        data.cmd = zclObj.cmd;                         // make sure data.cmd will be string

        zclObj.parse(data.payload, function (err, payload) {
            if (err) {
                callback(err);
            } else {
                data.payload = payload;
                callback(null, data);
            }
        });
    });
};

Zcl.prototype.frame = function (frameCntl, manufCode, seqNum, cmd, zclPayload) {
    // frameCntl: Object, manufCode: Number, seqNum: Number, cmd: String | Number, zclPayload: Object | Array
    var zclObj;

    if ((typeof cmd !== 'string') && (typeof cmd !== 'number')) 
        throw new Error('cmd must be a string or number.');

    if (this.cmdType === 'foundation') {
        zclObj = new FoundPayload(cmd);
    } else {
        zclObj = new FuncPayload(this.clusterId, frameCntl.direction, cmd);
    }

    return this._zclFrame.frame(frameCntl, manufCode, seqNum, zclObj.cmdId, zclObj.frame(zclPayload));
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

module.exports = Zcl;