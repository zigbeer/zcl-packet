/* jshint node: true */
'use strict';

var Concentrate = require('concentrate'),
    DChunks = require('dissolve-chunks'),
    ru = DChunks().Rule();

var FoundPayload = require('./foundation'),
    FuncPayload = require('./functional');

var zcl = {};

zcl.parse = function (zclBuf, clusterId, callback) {
    var zclObj,
        zclFrame = new ZclFrame();

    if (!Buffer.isBuffer(zclBuf)) throw new Error('zclBuf must be a buffer.');

    if (arguments.length === 2) {
        callback = clusterId;
        clusterId = null;
    }

    zclFrame.parse(zclBuf, function (data) {
        // data = { frameCntl: { frameType, manufSpec, direction, disDefaultRsp }, manufCode, seqNum, cmd, payload }

        if (data.frameCntl.frameType === 0) {
            zclObj = new FoundPayload(data.cmd);
        } else if (data.frameCntl.frameType === 1) {
            if (!clusterId)
                return callback(new Error('clusterId must be given.'));

            zclObj = new FuncPayload(clusterId, data.frameCntl.direction, data.cmd);
        }

        data.cmd = zclObj.cmd;    // make sure data.cmd will be string

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

zcl.frame = function (frameCntl, manufCode, seqNum, cmd, zclPayload, clusterId) {
    // frameCntl: Object, manufCode: Number, seqNum: Number, cmd: String | Number, zclPayload: Object | Array
    var zclObj,
        zclFrame = new ZclFrame();

    if ((typeof cmd !== 'string') && (typeof cmd !== 'number')) 
        throw new Error('cmd must be a string or number.');

    if (frameCntl.frameType === 0) {
        zclObj = new FoundPayload(cmd);
    } else if (frameCntl.frameType === 1) {
        if (!clusterId)
            new Error('clusterId must be given.');

        zclObj = new FuncPayload(clusterId, frameCntl.direction, cmd);
    }

    return zclFrame.frame(frameCntl, manufCode, seqNum, zclObj.cmdId, zclObj.frame(zclPayload));
};

zcl.header = function (buf) {
    var i = 0,
        headByte = buf.readUInt8(0),
        header = {
            frameCntl: {
                frameType: (headByte & 0x03),
                manufSpec: ((headByte >> 2) & 0x01),
                direction: ((headByte >> 3) & 0x01),
                disDefaultRsp: ((headByte >> 4) & 0x01)
            },
            manufCode: null,
            seqNum: null,
            cmdId: null
        };

    i += 1; // first byte, frameCntl, has parsed

    if (header.frameCntl.manufSpec === 1) {
        header.manufCode = buf.readUInt16LE(i);
        i += 2;
    } else if (header.frameCntl.manufSpec === 0) {
        header.manufCode = null;
    }

    header.seqNum = buf.readUInt8(i);
    i += 1;
    header.cmdId = buf.readUInt8(i);

    if (header.frameCntl.frameType < 0x02 && header.cmdId < 0x80)
        return header;
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