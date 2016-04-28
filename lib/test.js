var Zcl = require('./zcl');

var foundPacket = new Zcl('foundation');
var frameCntl1 = {
        frameType: 0,
        manufSpec: 0,
        direction: 0,
        disDefaultRsp: 0
    },
    foundPayload = [
        { attrId: 0x1234, dataType: 0x41, attrData: 'hello' },
        { attrId: 0xabcd, dataType: 0x24, attrData: [100, 2406] },
        { attrId: 0x1234, dataType: 0x08, attrData: 60 }
    ],
    foundBuf;

foundBuf = foundPacket.frame(frameCntl1, 0, 0, 'write', foundPayload);

var funcPacket = new Zcl('functional', 0x0004);
var frameCntl2 = {
        frameType: 0,
        manufSpec: 1,
        direction: 0,
        disDefaultRsp: 0
    },
    funcPayload = {
        groupid: 0x0001,
        groupname: 'group1'
    },
    funcBuf;

funcBuf = funcPacket.frame(frameCntl2, 0xaaaa, 1, 'Add', funcPayload);

console.log(funcBuf);