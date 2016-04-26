# zcl-packet  
<br />

**zcl-packet** is a framer and parser of ZCL packet for node.js.   

<br />

## Table of Contents  

1. [Overview](#Overview)  
    1.1 [Zigbee Cluster Library](#ZCL)  
    1.2 [Installation](#Installation)  
    1.3 [Usage](#Usage)  

2. [APIs](#APIs)  
    2.1 [Foundation CLass](#FoundCls)  
    2.2 [Functional Class](#FuncCls)  

3. [Appendix](#Appendix)  
    3.1 [ZCL Foundation Command Reference Table](#foundCmdTbl)
    3.2 [ZCL Functional Command Reference Tables](#funcCmdTbl)

4. [Contributors](#Contributors)  
5. [License](#License)  

<br />

<a name="Overview"></a>
## 1. Overview  

**zcl-packet** is a framer/parser of **Z**igbee **C**luster **L**ibrary raw packets on node.js. It is aims to help you in building and parsing zcl command packet

<br />

<a name="ZCL"></a>
### 1.1 Zigbee Cluster Library  

The **Z**igBee **C**luster **L**ibrary (ZCL) is defined by the ZigBee Alliance which is a set of clusters and cross-cluster commands used in the public profiles to speed the development and standardization of the public profiles. 

If you are making a public profile device, such as a power meter intended to be compatible with the Automatic Metering profile, or a thermostat intended to be compatible with the Home Automation or Commercial Building Automation Profile, then the ZCL is required.  That's what public profiles are all about: interoperability.

// pic

(1) ZCL Functional: The ZigBee Cluster Library is organized into functional domains, such as General, Closures, HVAC, and Lighting. Clusters from these functional domains are used in the ZigBee Public Profiles to produce descriptions of devices. Each functional domain has many clusters, and each cluster is a related collection of commands and attributes. ZCL Functional command is generally referred to the command of clusters.

(2) ZCL Foundation: Each attribute of clusters may be read from, written to, and reported over-the-air with standard, cross-cluster ZCL commands. These cross-cluster commands are called the ZCL foundation which is work across any cluster in the ZCL. Only those endpoints that support the ZigBee Cluster Library support the ZCL foundation commands. 

//ZCL Foundation: Each attribute of clusters may be read from, written to, and reported over-the-air with standard, cross-cluster ZCL commands. These cross-cluster commands are called the ZCL foundation which is work across any cluster in the ZCL. Only those endpoints that support the ZigBee Cluster Library support the ZCL foundation commands. 

<br />

<a name="Installation"></a>
### 1.2 Installation  

> $ npm install zcl-packet --save

<br />

<a name="Usage"></a>
### 1.3 Usage  

**zcl-packet** exports as a Constructor denoted as `Zcl` in this document. You can create an instance with cmdType `foundation` or `functional` and just simply call `parse()` and `frame()` method to parse/build zcl packet you need.

//  It has two properties: `foundation` and `functional`, they are using for process foundation and functional command packet, respectively.

```javascript
var Zcl = require('zcl-packet'),
    foundPacket = new ZPacket('foundation');

foundPacket.frame(); //TODO

foundPacket.parse(function () {
    //TODO
});
```

<br />

<a name="APIs"></a>
## 2. APIs  

* [new Zcl()](#zPacketCls)
* [frame()](#zclFrame)
* [parse()](#zclParse)

*******************

### Zcl Class

<a name="zPacketCls"></a>
#### new Zcl(cmdType[, clusterId])

**Arguments:**

    1. `cmdType`(_String_): It can be either a string of 'foundation' or 'functional' to indicate which type of ZCL command you want to process.
    2. `clusterId`(_Number_): Cluster ID. It is must be filled if `cmdType` is 'functional'.

**Returns:**
    
    * (_Object_): foundPacket or funcPacket

**Examples:**

```javascript
var Zcl = require('zcl-packet');
    
var foundPacket = new Zcl('foundation'),
    funcPacket = new Zcl('functional', );
```

***********************

<a name="zclFrame"></a>
#### .frame(frameCntl, manufCode, seqNum, cmd, zclPayload)

Build ZCL command object to a rau buffer.

**Arguments:**

    1. `frameCntl`(_Object_): Frame Control. The following table shows the details of each property.
    2. `manuCode`(_Number_): Manufacturer Code. This argument is 16-bit and it will be invalid if `frameCntl.manufSpec` is equal to 0.
    3. `seqNum`(_Number_): Transaction Sequence Number. This argument is 8-bit.
    4. `cmd`(_String_ | _Number_): Command Name(string) or Command Identifier(number).
    5. `zclPayload`(_Object_ | _Arrar_): ZCL Frame Payload. It contains information specific to individual command types.

    | Property       | Type  | Mandatory |Description                                         |
    | -------------- | ----- | --------- | -------------------------------------------------- |
    | frameType      | 2-bit | required  | Frame type, 0 or 1 means foundation or functional. |
    | manufSpec      | 1-bit | required  | Manufacturer specific                              |
    | direction      | 1-bit | required  | Direction                                          |
    | disDefaultRsp  | 1-bit | required  | Disable default response                           |


**Returns:**
    * (_Buffer_): ZCL raw buffer

**Example:**

```javascript
// Here is an example of building foundation payload
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

// Here is an example of building functional payload
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

funcBuf = funcPacket.frame(frameCntl2, 0xaaaa, 1, 'add', funcPayload);
```

***********************

<a name="zclParse"></a>
#### .parse(zclBuf, callback)

Parse ZCL buffer to a readable ZCL payload object. 

**Arguments:**

    1. `zclBuf`(_Buffer_): ZCL raw buffer to be parsed.
    2. `callback` (_Function_): `function (err, result) {...}`. Get called when the zcl buffer is parsed.

**Returns:**

    * (none)  

**Examples:**

```javascript
// Here is a example of parsing foundation raw buffer.
var foundPacket = new Zcl('foundation');
var foundBuf = new Buffer([00, 00, 02, 34, 12, 41, 05, 68, 65, 6c, 6c, 6f, cd, ab, 24, 66, 09, 00, 00, 64, 34, 12, 08, 3c]);

foundPacket.parse('write', function(err, result) {
    if (!err)
        console.log(result);
        // result equal to
        // {
        //     frameCntl: { frameType: 0, manufSpec: 0, direction: 0, disDefaultRsp: 0 }
        //     seqNum: 0,
        //     cmd: 2, // write
        //     payload: [
        //         { attrId: 0x1234, dataType: 0x41, attrData: 'hello' },
        //         { attrId: 0xabcd, dataType: 0x24, attrData: [100, 2406] },
        //         { attrId: 0x1234, dataType: 0x08, attrData: 60 }
        //     ]
        // }
});

// Here is a example of parsing functional raw buffer.
var funcPacket = new Zcl('functional', 0x0004);
var funcBuf = new Buffer([04, aa, aa ,01, 00, 01, 00, 06, 67, 72, 6f, 75, 70, 31]);

foundPacket.parse('add', function(err, result) {
    if (!err)
        console.log(result);
        // result equal to
        // {
        //     frameCntl: { frameType: 0, manufSpec: 1, direction: 0, disDefaultRsp: 0 }
        //     manufCode: 0xaaaa
        //     seqNum: 1,
        //     cmd: 0, // add
        //     payload: { groupid: 0x0001, groupname: 'group1' }
        // }
});
```

<br />

<a name="Appendix"></a>
## 3. Appendix  

<br />

<a name="foundCmdTbl"></a>
### 3.1 ZCL Foundation Command Related Tables

* ZCl foundation commands are used for manipulating attributes and other general tasks that are not specific to an individual cluster. 
* Since ZCL foundation commands are usually used for operating many attributes, you need to fill in the relevant information of each attribute, attribute information format will vary depending on the command. 

(1) Foundation Command Description Table
The following table describe payload format of each command. Here is the description of each column in the table:
    
        * Cmd-API
        * Cmd-ID
        * Description
        * Payload
        * Parameter Types

|       Cmd-API       | Cmd-ID |              Description              |            Payload            |           Field Types          |
| ------------------- | ------ | ------------------------------------- | ----------------------------- | ------------------------------ |
| read                | 0      | Read attributes                       | [ readRec, ... ]              | None                           |
| readRsp             | 1      | Read attributes response              | [ readStatusRec, ... ]        | None                           |
| write               | 2      | Write attributes                      | [ writeRec, ... ]             | None                           |
| writeUndiv          | 3      | Write attributes undivided            | [ writeRec, ... ]             | None                           |
| writeRsp            | 4      | Write attributes response             | [ writeStatusRec, ... ]       | None                           |
| writeNoRsp          | 5      | Write attributes no response          | [ writeRec, ...]              | None                           |
| configReport        | 6      | Configure reporting                   | [ attrRptCfgRec, ...]         | None                           |
| configReportRsp     | 7      | Configure reporting response          | [ attrStatusRec, ...]         | None                           |
| readReportConfig    | 8      | Read reporting configuration          | [ attrRec, ... ]              | None                           |
| readReportConfigRsp | 9      | Read reporting configuration response | [ attrRptCfgRec, ... ]        | None                           |
| report              | 10     | Report attributes                     | [ attrReport, ...]            | None                           |
| defaultRsp          | 11     | Default response                      | { cmdId, statusCode }         | uint8, uint8                   |
| discover            | 12     | Discover attributes                   | { startAttrId, maxAttrIds }   | uint16, uint8                  |
| discoverRsp         | 13     | Discover attributes response          | { discComplete, attrInfos }   | uint16, array(attrInfo)        |
| readStruct          | 14     | Read attributes structured            | [ readAttrRec ... ]           | None                           |
| writeStrcut         | 15     | Write attributes structured           | [ writeAttrRec, ... ]         | None                           |
| writeStrcutRsp      | 16     | Write attributes structured response  | [ writeAttrStstusRec, ... ]   | None                           |


|       Cmd-API       |              Field Names             |         Field Types        |
| ------------------- | ------------------------------------ | -------------------------- |
| readRec             | attrId                               | uint16                     |
| readStatusRec       | attrId, status, TODO                 | uint16, uint8              |
| writeRec            | attrId, dataType, attrData           | uint16, uin8, TODO         |
| writeStatusRec      | status, attrId                       | uint8, uint16              |
| attrRptCfgRec       | direction, attrId, TODO              | uint8, uint16,             |
| attrStatusRec       | status, direction, attrId            | uint8, uint8, uint16       |
| attrRec             | direction, attrId                    | uint8, uint16              |
| attrRptCfgRec       | status, direction, attrId, TODO      | uint8, uint8, uint16, TODO |
| attrReport          | attrID, dataType, attrData           | uint16, uin8, TODO         |
| attrInfo            | attrId, dataType                     | uint16, uint8              |
| readAttrRec         | attrId, selector                     | uint16, TODO               |
| writeAttrRec        | attrId, selector, dataType, attrData | uint16, TODO, uint8, TODO  |
| writeAttrStstusRec  | status, attrId, selector             | uint8, attrId, TODO        |

<br />

<a name="funcCmdTbl"></a>
### 3.2 ZCL Functional Command Reference Table

<br />

<a name="Contributors"></a>
## 4. Contributors  

* [Jack Wu](https://www.npmjs.com/~jackchased)  
* [Hedy Wang](https://www.npmjs.com/~hedywings)  

<br />

<a name="License"></a>
## 5. License 

The MIT License (MIT)

Copyright (c) 2016  
Jack Wu <jackchased@gmail.com>, Hedy Wang <hedywings@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
