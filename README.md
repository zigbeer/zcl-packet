zcl-packet
========================

**zcl-packet** is a framer and parser for **Z**igBee **C**luster **L**ibrary (ZCL) **packet** on node.js.  

<br />

## Table of Contents  

1. [Overview](#Overview)  
    1.1 [ZigBee Cluster Library](#ZCL)  
    1.2 [Installation](#Installation)  
    1.3 [Usage](#Usage)  

2. [APIs](#APIs): new Zcl(), frame(), and parse()  

3. [Appendix](#Appendix)  
    3.1 [ZCL Foundation Command Reference Table](#foundCmdTbl)  
    3.2 [ZCL Functional Command Reference Tables](#funcCmdTbl)  

4. [Contributors](#Contributors)  

5. [License](#License)  

<br />

<a name="Overview"></a>
## 1. Overview  

The **zcl-packet** is the packet builder and parser for ZigBee Alliance *ZIGBEE CLUSTER LIBRARY SPECIFICATION* commands.  

<br />

<a name="ZCL"></a>
### 1.1 ZigBee Cluster Library  

The ZCL is a set of clusters and cross-cluster commands used in the public profiles defined by the ZigBee Alliance to speed the development and standardization of the public profiles.  

A *Cluster* is a related collection of *Commands* and *Attributes*, which together define an interface to specific functionality. *Commands* are actions the cluster must perform. *Attributes* are data items or states defined within a cluster.  

* **ZCL Foundation**: Each attribute of clusters may be read from, written to, and reported over-the-air with standard, cross-cluster ZCL commands. These cross-cluster commands are called the *ZCL foundation* which is work across any cluster in the ZCL.  

* **ZCL Functional**: The ZCL is divided into a number of functional domains, such as General, Closures, HVAC, and Lighting. Clusters from these functional domains are used in the ZigBee Public Profiles to produce descriptions of devices. Each functional domain define its own specialized clusters. These specific clusters commands are called the *ZCL functional*.  

<br />

<a name="Installation"></a>
### 1.2 Installation  

> $ npm install zcl-packet --save

<br />

<a name="Usage"></a>
### 1.3 Usage  

To use zcl-packet, just new an instance with `cmdType` from the Zcl class. The property `cmdType` indicates the command type of `'foundation'` or `'functional'`.  

Here is an quick example and the parsed result format can be found in the [parse() API](#API_parse) section.

```js
var Zcl = require('zcl-packet'),
    zclFoundation = new Zcl('foundation');

zclFoundation.frame({manufSpec: 0, direction: 0, disDefaultRsp: 0}, 0, 0, 'read', [ attrId: 0x0001, ... ]);

var zclBuf = new Buffer([0x00, 0x00, 0x02, ... ]);

zclFoundation.parse( zclBuf, function (err, result) {
    if (!err)
        console.log(result);  // The parsed result
});
```

<br />

<a name="APIs"></a>
## 2. APIs  

* [new Zcl()](#API_Zcl)  
* [frame()](#API_frame)  
* [parse()](#API_parse)  

*************************************************
<a name="API_Zcl"></a>
### new Zcl(cmdType[, clusterId])

Create a new instance of the `Zcl` class.  

**Arguments:**  

1. `cmdType` (_String_): The command type, set it to `'foundation'` or `'functional'` of which command you like to invoke.  
2. `clusterId` (_Number_): Cluster Id. It is must be filled if `cmdType` is `'functional'`.  

**Returns:**  

* (_Object_): zclFoundation or zclFunctional, an instance of Zcl.

**Examples:**  

```js
var Zcl = require('zcl-packet');    
var zclFoundation = new Zcl('foundation'),
    zclFunctional = new Zcl('functional', 0x0006);
```

*************************************************
<a name="API_frame"></a>
### .frame(frameCntl, manufCode, seqNum, cmd, zclPayload)

Generates a buffer containing a ZCL command packet.  

**Arguments:**  

1. `frameCntl` (_Object_): Frame control. The following table shows the details of each property.  

    | Property      | Type  | Mandatory | Description                                        |
    |---------------|-------|-----------|----------------------------------------------------|
    | manufSpec     | 1-bit | required  | Manufacturer specific.                             |
    | direction     | 1-bit | required  | Direction.                                         |
    | disDefaultRsp | 1-bit | required  | Disable default response.                          |
2. `manuCode` (_Number_): Manufacturer code. This argument is 16-bit and it will be invalid if `frameCntl.manufSpec` is equal to 0.  
3. `seqNum` (_Number_): Transaction sequence number. This argument is 8-bit.  
4. `cmd` (_String_ | _Number_): Command id of which command you want to invoke.  
5. `zclPayload` (_Object_ | _Arrar_): ZCL Frame payload. An argument passes to the command, it contains information specific to individual command types.  

**Returns:**  

* (_Buffer_): ZCL raw buffer.

**Example:**  

```js
// example of calling foundation command 'write'
var zclFoundation = new Zcl('foundation');
var frameCntl1 = {
        manufSpec: 0,
        direction: 0,
        disDefaultRsp: 0
    },
    foundPayload = [
        { attrId: 0x1234, dataType: 0x41, attrData: 'hello' },
        { attrId: 0xabcd, dataType: 0x24, attrData: [100, 2406] }
    ],
    foundBuf;

foundBuf = zclFoundation.frame(frameCntl1, 0, 0, 'write', foundPayload);

// example of calling 'add' from the cluster 'genGroups'
var zclFunctional = new Zcl('functional', 0x0004);
var frameCntl2 = {
        manufSpec: 1,
        direction: 0,
        disDefaultRsp: 0
    },
    funcPayload = {
        groupid: 0x0001,
        groupname: 'group1'
    },
    funcBuf;

funcBuf = zclFunctional.frame(frameCntl2, 0xaaaa, 1, 'add', funcPayload);
```

*************************************************
<a name="API_parse"></a>
### .parse(zclBuf, callback)

Parse ZCL buffer to a readable ZCL payload object.  

**Arguments:**  

1. `zclBuf` (_Buffer_): ZCL raw buffer to be parsed.  
2. `callback` (_Function_): `function (err, result) {...}`. Get called when the ZCL buffer is parsed.  

**Returns:**  

* _none_

**Examples:**  

```js
// Example of parsing foundation raw buffer.
var zclFoundation = new Zcl('foundation');
var foundBuf = new Buffer([0x00, 0x00, 0x02, 0x34, 0x12, 0x41, 0x05, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0xcd, 0xab, 0x24, 0x66, 0x09, 0x00, 0x00, 0x64]);

zclFoundation.parse(foundBuf, function(err, result) {
    if (!err)
        console.log(result);
    // result equal to
    // {
    //     frameCntl: { frameType: 0, manufSpec: 0, direction: 0, disDefaultRsp: 0 },
    //     manufCode: 0,
    //     seqNum: 0,
    //     cmd: 'write',
    //     payload: [ 
    //         { attrId: 4660, dataType: 65, attrData: 'hello' },
    //         { attrId: 43981, dataType: 36, attrData: [ 100, 2406 ] }
    //     ]
    // }
});

// Example of parsing functional raw buffer.
var zclFunctional = new Zcl('functional', 0x0004);
var funcBuf = new Buffer([0x05, 0xaa, 0xaa , 0x01, 0x00, 0x01, 0x00, 0x06, 0x67, 0x72, 0x6f, 0x75, 0x70, 0x31]);

zclFunctional.parse(funcBuf, function(err, result) {
    if (!err)
        console.log(result);
    // result equal to
    // {
    //     frameCntl: { frameType: 1, manufSpec: 1, direction: 0, disDefaultRsp: 0 },
    //     manufCode: 43690,
    //     seqNum: 1,
    //     cmd: 'add',
    //     payload: {
    //         groupid: 1,
    //         groupname: 'group1'
    //     }
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