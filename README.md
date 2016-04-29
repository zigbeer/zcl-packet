zcl-packet
========================

**zcl-packet** is a framer and parser for **Z**igBee **C**luster **L**ibrary (ZCL) **packet** on node.js.  

<br />

## Table of Contents  

1. [Overview](#Overview)  
    1.1 [ZigBee Cluster Library](#ZCL)  
    1.2 [Installation](#Installation)  
    1.3 [Usage](#Usage)  

2. [APIs](#APIs): [new Zcl()](#API_Zcl), [frame()](#API_frame), and [parse()](#API_parse)  

3. [Appendix](#Appendix)  
    3.1 [ZCL Foundation Command Reference Tables](#FoundCmdTbl)  
    3.2 [ZCL Functional Command Reference Tables](#FuncCmdTbl)  

4. [Contributors](#Contributors)  

5. [License](#License)  

<br />

<a name="Overview"></a>
## 1. Overview  

The **zcl-packet** is the packet builder and parser for [_ZIGBEE CLUSTER LIBRARY SPECIFICATION_](http://www.zigbee.org/download/standards-zigbee-cluster-library/) commands.  

<br />

<a name="ZCL"></a>
### 1.1 ZigBee Cluster Library  

The ZCL is a set of clusters and cross-cluster commands used in the public profiles defined by the ZigBee Alliance to speed the development and standardization of the public profiles.  

A *Cluster* is a related collection of *Commands* and *Attributes*, which together define an interface to specific functionality. *Commands* are actions the cluster must perform. *Attributes* are data items or states defined within a cluster.  

**ZCL Foundation:** Each attribute of clusters may be read from, written to, and reported over-the-air with standard, cross-cluster ZCL commands. These cross-cluster commands are called the *ZCL foundation* which is work across any cluster in the ZCL.  

**ZCL Functional:** The ZCL is divided into a number of functional domains, such as General, Closures, HVAC, and Lighting. Clusters from these functional domains are used in the ZigBee Public Profiles to produce descriptions of devices. Each functional domain define its own specialized clusters. These specific clusters commands are called the *ZCL functional*.  

<br />

<a name="Installation"></a>
### 1.2 Installation  

> $ npm install zcl-packet --save

<br />

<a name="Usage"></a>
### 1.3 Usage  

To use zcl-packet, just new an instance with `cmdType` from the Zcl class. The property `cmdType` indicates the command type of `'foundation'` or `'functional'`.  

Here is an quick example and the detail of framed/parsed result can be found in the [frame() API](#API_frame)/[parse() API](#API_parse) section.  

```js
var Zcl = require('zcl-packet'),
    zclFoundation = new Zcl('foundation'),
    zclBuf;

// build a ZCL raw buffer
zclBuf = zclFoundation.frame({manufSpec: 0, direction: 0, disDefaultRsp: 0}, 0, 0, 'read', [attrId: 0x0001, ...]);

// parse to ZCL frame object
zclFoundation.parse(new Buffer([0x00, 0x00, 0x02, ...]), function (err, result) {
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

1. `cmdType` (_String_): The command type, set it to `'foundation'` or `'functional'` of which type of command packet you like to process.  
2. `clusterId` (_Number_): Cluster Id. It's must be filled if `cmdType` is `'functional'`.  

**Returns:**  

* (_Object_): zclFoundation or zclFunctional, an instance of Zcl.

**Examples:**  

```js
var Zcl = require('zcl-packet');

// new `Zcl` instance with given command type
var zclFoundation = new Zcl('foundation'),
    zclFunctional = new Zcl('functional', 0x0006);
```

*************************************************
<a name="API_frame"></a>
### .frame(frameCntl, manufCode, seqNum, cmd, zclPayload)

Generates a raw buffer of ZCL command packet.  

**Arguments:**  

1. `frameCntl` (_Object_): Frame control. The following table shows the details of each property.  

    | Property      | Type  | Mandatory | Description                                        |
    |---------------|-------|-----------|----------------------------------------------------|
    | manufSpec     | 1-bit | required  | Manufacturer specific.                             |
    | direction     | 1-bit | required  | Direction.                                         |
    | disDefaultRsp | 1-bit | required  | Disable default response.                          |
2. `manufCode` (_Number_): Manufacturer code. This argument is 16-bit and it will be invalid if `frameCntl.manufSpec` is equal to 0.  
3. `seqNum` (_Number_): Transaction sequence number. This argument is 8-bit.  
4. `cmd` (_String_ | _Number_): Command Id indicates which command packet you want to build.  
5. `zclPayload` (_Object_ | _Array_): ZCL Frame payload. It contains information specific to individual command types.  

**Returns:**  

* (_Buffer_): ZCL raw buffer.

**Example:**  

```js
// example of generating zcl foundation command buffer
// foundation command: 'write'
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

// example of generating zcl functional command buffer
// functional command: 'add' from 'genGroups' cluster
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

Parse ZCL raw buffer to a readable command object.  

**Arguments:**  

1. `zclBuf` (_Buffer_): ZCL raw buffer to be parsed.  
2. `callback` (_Function_): `function (err, result) {...}`. Get called when the ZCL buffer is parsed.  

**Returns:**  

* _none_

**Examples:**  

```js
// example of parsing foundation raw buffer.
var zclFoundation = new Zcl('foundation');
var foundBuf = new Buffer([0x00, 0x00, 0x02, 0x34, 0x12, 0x41, 0x05, 0x68, 0x65, 0x6c, 0x6c, 0x6f, 0xcd, 0xab, 0x24, 0x66, 0x09, 0x00, 0x00, 0x64]);

zclFoundation.parse(foundBuf, function(err, result) {
    if (!err)
        console.log(result);
    // the parsed result to show you the format
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

// example of parsing functional raw buffer.
var zclFunctional = new Zcl('functional', 0x0004);
var funcBuf = new Buffer([0x05, 0xaa, 0xaa , 0x01, 0x00, 0x01, 0x00, 0x06, 0x67, 0x72, 0x6f, 0x75, 0x70, 0x31]);

zclFunctional.parse(funcBuf, function(err, result) {
    if (!err)
        console.log(result);
    // the parsed result to show you the format
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

<a name="FoundCmdTbl"></a>
### 3.1 ZCL Foundation Command Reference Table  

* ZCL foundation commands are used for manipulating attributes and other general tasks that are not specific to an individual cluster.  
* Since ZCL foundation commands are usually used for operating many attributes, you need to fill in the relevant record of each attribute you want to operate, attribute record format will vary depending on foundation command.  
* The detail of each foundation command is documented in [ZIGBEE CLUSTER LIBRARY SPECIFICATION(Section 2.4)]().  

<a name="FoundCmdDescTbl"></a>
#### Foundation Command Description Table  

The following table describe payload format of foundation commands. Here is the description of each column in the table:  

* Cmd-API:  
    * The command name in **zcl-packet**.  
* Cmd-ID:  
    * The command ID corresponding to the command name.  
* Description:  
    * Describe the purpose of each command.  
* Payload:  
    * Payload format of Cmd-API.  
    * Payload will be an array of attributes record if command is used to manipulate many attributes.  
* Parameter Types  
    * Indicate property value type of payload object.  
    * Each attribute record in the array is an object of [command-dependent atribute record](#AttrRecTbl).  

| Cmd-API             | Cmd-ID | Description                           | Payload                       | Parameter Types         |
|---------------------|--------|---------------------------------------|-------------------------------|-------------------------|
| read                | 0      | Read attributes                       | `[ readRec, ... ]`            | _none_                  |
| readRsp             | 1      | Read attributes response              | `[ readStatusRec, ... ]`      | _none_                  |
| write               | 2      | Write attributes                      | `[ writeRec, ... ]`           | _none_                  |
| writeUndiv          | 3      | Write attributes undivided            | `[ writeRec, ... ]`           | _none_                  |
| writeRsp            | 4      | Write attributes response             | `[ writeStatusRec, ... ]`     | _none_                  |
| writeNoRsp          | 5      | Write attributes no response          | `[ writeRec, ... ]`           | _none_                  |
| configReport        | 6      | Configure reporting                   | `[ attrRptCfgRec, ... ]`      | _none_                  |
| configReportRsp     | 7      | Configure reporting response          | `[ attrStatusRec, ... ]`      | _none_                  |
| readReportConfig    | 8      | Read reporting configuration          | `[ attrRec, ... ]`            | _none_                  |
| readReportConfigRsp | 9      | Read reporting configuration response | `[ attrRptCfgRec, ... ]`      | _none_                  |
| report              | 10     | Report attributes                     | `[ attrReport, ... ]`         | _none_                  |
| defaultRsp          | 11     | Default response                      | `{ cmdId, statusCode }`       | uint8, uint8            |
| discover            | 12     | Discover attributes                   | `{ startAttrId, maxAttrIds }` | uint16, uint8           |
| discoverRsp         | 13     | Discover attributes response          | `{ discComplete, attrInfos }` | uint16, array(attrInfo) |
| readStruct          | 14     | Read attributes structured            | `[ readAttrRec, ... ]`        | _none_                  |
| writeStrcut         | 15     | Write attributes structured           | `[ writeAttrRec, ... ]`       | _none_                  |
| writeStrcutRsp      | 16     | Write attributes structured response  | `[ writeAttrStstusRec, ... ]` | _none_                  |

*************************************************

<a name="AttrRecTbl"></a>
#### Attribute Record Table  

The following table list each type of attribute record and describe their format.  

**Note:** The detail of `multi` and `selector` field type can be found in the [Data Unit Table](#DataUnitTbl).  

| Cmd-API            | Field Names                                | Field Types                    | Judge Field  | Additional Field Names                                  | Additional Field Types                     |
|--------------------|--------------------------------------------|--------------------------------|--------------|---------------------------------------------------------|--------------------------------------------|
| readRec            | `{ attrId }`                               | uint16                         | _none_       | _none_                                                  | _none_                                     |
| readStatusRec      | `{ attrId, status }`                       | uint16, uint8                  | status(0)    | `{ dataType, attrData }`                                | uint8, multi                               |
|                    |                                            |                                | status(1)    | _none_                                                  | _none_                                     |
| readStatusRec      | `{ attrId, status }`                       | uint16, uint8                  | _none_       | _none_                                                  | _none_                                     |
| writeRec           | `{ attrId, dataType, attrData }`           | uint16, uin8, multi            | _none_       | _none_                                                  | _none_                                     |
| writeStatusRec     | `{ status, attrId }`                       | uint8, uint16                  | _none_       | _none_                                                  | _none_                                     |
| attrRptCfgRec      | `{ direction, attrId }`                    | uint8, uint16                  | direction(0) | `{ dataType, minRepIntval, maxRepIntval, [repChange] }` | uint8, uint16, uint16, depends(`dataType`) |
|                    |                                            |                                | direction(1) | `{ timeout }`                                           | uint16                                     |
| attrStatusRec      | `{ status, direction, attrId }`            | uint8, uint8, uint16           | _none_       | _none_                                                  | _none_                                     |
| attrRec            | `{ direction, attrId }`                    | uint8, uint16                  | _none_       | _none_                                                  | _none_                                     |
| attrRptCfgRec      | `{ status, direction, attrId }`            | uint8, uint8, uint16           | status(0)    | `{ dataType, minRepIntval, maxRepIntval, [repChange] }` | uint8, uint16, uint16, depends(`dataType`) |
|                    |                                            |                                | status(1)    | `{ timeout }`                                           | uint16                                     |
| attrReport         | `{ attrID, dataType, attrData }`           | uint16, uin8, multi            | _none_       | _none_                                                  | _none_                                     |
| attrInfo           | `{ attrId, dataType }`                     | uint16, uint8                  | _none_       | _none_                                                  | _none_                                     |
| readAttrRec        | `{ attrId, selector }`                     | uint16, selector               | _none_       | _none_                                                  | _none_                                     |
| writeAttrRec       | `{ attrId, selector, dataType, attrData }` | uint16, selector, uint8, multi | _none_       | _none_                                                  | _none_                                     |
| writeAttrStstusRec | `{ status, attrId, selector }`             | uint8, attrId, selector        | _none_       | _none_                                                  | _none_                                     |

*************************************************

<a name="DataUnitTbl"></a>
#### Data Unit Table  

| Data Unit | Judge Field          | Field Names                     | Field Types                              |
|-----------|----------------------|---------------------------------|------------------------------------------|
| multi     | dataType(72, 80, 81) | `{ elmType, numElms, elmVals }` | uint8, uint16, array(depends(`elmType`)) |
|           | dataType(76)         | `{ numElms, structElms }`       | uint16, array(`struct`)                  |
| selector  | _none_               | `{ indicator, indexes }`        | uint8, array(depends(`indicator`))       |
| struct    | _none_               | `{ elmType, elmVal }`           | uint8, depends(`elmType`)                |

<br />

<a name="FuncCmdTbl"></a>
### 3.2 ZCL Functional Command Reference Table  

The following table describe payload format of functional commands. Here is the description of each column in the table:  

* Cluster:  
    - The ZCL cluster name.  
* Cmd:  
    - The command name, in zcl-packet, according to a *ZIGBEE CLUSTER LIBRARY SPECIFICATION* command.  
* CmdId:  
    - The command Id corresponding to the command name.  
* Direction:  
    - c2s, Command is sent from the client side to the server side.  
    - s2c, Command is sent from the server side to the client side.  
* Arguments:  
    - Required parameters of a Cmd.  

**Functional domains:**  
* [General](#GenTbl)  
* [Closures](#ClosuresTbl)  
* [HVAC](#HvacTbl)  
* [Lighting](#LightingTbl)  
* [Security and Safety](#SsTbl)  
* [Protocol Interfaces](#PiTbl)  
* [Home Automation](#HaTbl)  

*************************************************
<a name="GenTbl"></a>
### 3.2.1 General  

| Cluster          | Cmd                     | CmdId | Direction | Arguments                                                                                                           |
|------------------|-------------------------|-------|-----------|---------------------------------------------------------------------------------------------------------------------|
| genBasic         | resetFactDefault        | 0     | c2s       | `{ }`                                                                                                               |
| genIdentify      | identify                | 0     | c2s       | `{ identifytime }`                                                                                                  |
|                  | identifyQuery           | 1     | c2s       | `{ }`                                                                                                               |
|                  | ezmodeInvoke            | 2     | c2s       | `{ action }`                                                                                                        |
|                  | updateCommissionState   | 3     | c2s       | `{ action, commstatemask }`                                                                                         |
|                  | triggerEffect           | 64    | c2s       | `{ effectid, effectvariant }`                                                                                       |
|                  | identifyQueryRsp        | 0     | s2c       | `{ timeout }`                                                                                                       |
| genGroups        | add                     | 0     | c2s       | `{ groupid, groupname }`                                                                                            |
|                  | view                    | 1     | c2s       | `{ groupid }`                                                                                                       |
|                  | getMembership           | 2     | c2s       | `{ groupcount, grouplist }`                                                                                         |
|                  | remove                  | 3     | c2s       | `{ groupid }`                                                                                                       |
|                  | removeAll               | 4     | c2s       | `{ }`                                                                                                               |
|                  | addIfIdentifying        | 5     | c2s       | `{ groupid, groupname }`                                                                                            |
|                  | addRsp                  | 0     | s2c       | `{ status, groupid }`                                                                                               |
|                  | viewRsp                 | 1     | s2c       | `{ status, groupid, groupname }`                                                                                    |
|                  | getMembershipRsp        | 2     | s2c       | `{ capacity, groupcount, grouplist }`                                                                               |
|                  | removeRsp               | 3     | s2c       | `{ status, groupid }`                                                                                               |
| genScenes        | add                     | 0     | c2s       | `{ groupid, sceneid, transtime, scenename, extensionfieldsets }`                                                    |
|                  | view                    | 1     | c2s       | `{ groupid, sceneid }`                                                                                              |
|                  | remove                  | 2     | c2s       | `{ groupid, sceneid }`                                                                                              |
|                  | removeAll               | 3     | c2s       | `{ groupid }`                                                                                                       |
|                  | store                   | 4     | c2s       | `{ groupid, sceneid }`                                                                                              |
|                  | recall                  | 5     | c2s       | `{ groupid, sceneid }`                                                                                              |
|                  | getSceneMembership      | 6     | c2s       | `{ groupid }`                                                                                                       |
|                  | enhancedAdd             | 64    | c2s       | `{ groupid, sceneid, transtime, scenename, extensionfieldsets }`                                                    |
|                  | enhancedView            | 65    | c2s       | `{ groupid, sceneid }`                                                                                              |
|                  | copy                    | 66    | c2s       | `{ mode, groupidfrom, sceneidfrom, groupidto, sceneidto }`                                                          |
|                  | addRsp                  | 0     | s2c       | `{ status, groupId, sceneId }`                                                                                      |
|                  | viewRsp                 | 1     | s2c       | `{ status, groupid, sceneid, transtime, scenename, extensionfieldsets }`                                            |
|                  | removeRsp               | 2     | s2c       | `{ status, groupid, sceneid }`                                                                                      |
|                  | removeAllRsp            | 3     | s2c       | `{ status, groupid }`                                                                                               |
|                  | storeRsp                | 4     | s2c       | `{ status, groupid, sceneid }`                                                                                      |
|                  | getSceneMembershipRsp   | 6     | s2c       | `{ status, capacity, groupid, scenecount, scenelist }`                                                              |
|                  | enhancedAddRsp          | 64    | s2c       | `{ }`                                                                                                               |
|                  | enhancedViewRsp         | 65    | s2c       | `{ status, groupid, sceneid, transtime, scenename, extensionfieldsets }`                                            |
|                  | copyRsp                 | 66    | s2c       | `{ status, groupidfrom, sceneidfrom }`                                                                              |
| genOnOff         | off                     | 0     | c2s       | `{ }`                                                                                                               |
|                  | on                      | 1     | c2s       | `{ }`                                                                                                               |
|                  | toggle                  | 2     | c2s       | `{ }`                                                                                                               |
|                  | offWithEffect           | 64    | c2s       | `{ effectid, effectvariant }`                                                                                       |
|                  | onWithRecallGlobalScene | 65    | c2s       | `{ }`                                                                                                               |
|                  | onWithTimedOff          | 66    | c2s       | `{ ctrlbits, ctrlbyte, ontime, offwaittime }`                                                                       |
| genLevelCtrl     | moveToLevel             | 0     | c2s       | `{ level, transtime }`                                                                                              |
|                  | move                    | 1     | c2s       | `{ movemode, rate }`                                                                                                |
|                  | step                    | 2     | c2s       | `{ stepmode, stepsize, transtime }`                                                                                 |
|                  | stop                    | 3     | c2s       | `{ }`                                                                                                               |
|                  | moveToLevelWithOnOff    | 4     | c2s       | `{ level, transtime }`                                                                                              |
|                  | moveWithOnOff           | 5     | c2s       | `{ movemode, rate }`                                                                                                |
|                  | stepWithOnOff           | 6     | c2s       | `{ stepmode, stepsize, transtime }`                                                                                 |
|                  | stopWithOnOff           | 7     | c2s       | `{ }`                                                                                                               |
| genAlarms        | reset                   | 0     | c2s       | `{ alarmcode, clusterid }`                                                                                          |
|                  | resetAll                | 1     | c2s       | `{ }`                                                                                                               |
|                  | get                     | 2     | c2s       | `{ }`                                                                                                               |
|                  | resetLog                | 3     | c2s       | `{ }`                                                                                                               |
|                  | publishEventLog         | 4     | c2s       | `{ }`                                                                                                               |
|                  | alarm                   | 0     | s2c       | `{ alarmcode, clusterid }`                                                                                          |
|                  | getRsp                  | 1     | s2c       | `{ status, alarmcode, clusterid, timestamp }`                                                                       |
|                  | getEventLog             | 2     | s2c       | `{ }`                                                                                                               |
| genRssiLocation  | setAbsolute             | 0     | c2s       | `{ coord1, coord2, coord3, power, pathlossexponent }`                                                               |
|                  | setDevCfg               | 1     | c2s       | `{ power, pathlossexponent, calperiod, numrssimeasurements, reportingperiod }`                                      |
|                  | getDevCfg               | 2     | c2s       | `{ targetaddr }`                                                                                                    |
|                  | getData                 | 3     | c2s       | `{ getdatainfo, numrsp, targetaddr }`                                                                               |
|                  | devCfgRsp               | 0     | s2c       | `{ status, power, pathlossexp, calperiod, numrssimeasurements, reportingperiod }`                                   |
|                  | dataRsp                 | 1     | s2c       | `{ status, locationtype, coord1, coord2, coord3, power, pathlossexp, locationmethod, qualitymeasure, locationage }` |
|                  | dataNotif               | 2     | s2c       | `{ locationtype, coord1, coord2, coord3, power, pathlossexp, locationmethod, qualitymeasure, locationage }`         |
|                  | compactDataNotif        | 3     | s2c       | `{ locationtype, coord1, coord2, coord3, qualitymeasure, locationage }`                                             |
|                  | rssiPing                | 4     | s2c       | `{ locationtype }`                                                                                                  |
| genCommissioning | restartDevice           | 0     | c2s       | `{ options, delay, jitter }`                                                                                        |
|                  | saveStartupParams       | 1     | c2s       | `{ options, index }`                                                                                                |
|                  | restoreStartupParams    | 2     | c2s       | `{ options, index }`                                                                                                |
|                  | resetStartupParams      | 3     | c2s       | `{ options, index }`                                                                                                |
|                  | restartDeviceRsp        | 0     | s2c       | `{ status }`                                                                                                        |
|                  | saveStartupParamsRsp    | 1     | s2c       | `{ status }`                                                                                                        |
|                  | restoreStartupParamsRsp | 2     | s2c       | `{ status }`                                                                                                        |
|                  | resetStartupParamsRsp   | 3     | s2c       | `{ status }`                                                                                                        |

*************************************************
<a name="ClosuresTbl"></a>
### 3.2.2 Closures  

| Cluster                | Cmd                          | CmdId | Direction | Arguments                                                                                         |
|------------------------|------------------------------|-------|-----------|---------------------------------------------------------------------------------------------------|
| closuresDoorLock       | lockDoor                     | 0     | c2s       | `{ pincodevalue }`                                                                                |
|                        | unlockDoor                   | 1     | c2s       | `{ pincodevalue }`                                                                                |
|                        | toggleDoor                   | 2     | c2s       | `{ pincodevalue }`                                                                                |
|                        | unlockWithTimeout            | 3     | c2s       | `{ timeout, pincodevalue }`                                                                       |
|                        | getLogRecord                 | 4     | c2s       | `{ logindex }`                                                                                    |
|                        | setPinCode                   | 5     | c2s       | `{ userid, userstatus, usertype, pincodevalue }`                                                  |
|                        | getPinCode                   | 6     | c2s       | `{ userid }`                                                                                      |
|                        | clearPinCode                 | 7     | c2s       | `{ userid }`                                                                                      |
|                        | clearAllPinCodes             | 8     | c2s       | `{ }`                                                                                             |
|                        | setUserStatus                | 9     | c2s       | `{ userid, userstatus }`                                                                          |
|                        | getUserStatus                | 10    | c2s       | `{ userid }`                                                                                      |
|                        | setWeekDaySchedule           | 11    | c2s       | `{ scheduleid, userid, daysmask, starthour, startminute, endhour, endminute }`                    |
|                        | getWeekDaySchedule           | 12    | c2s       | `{ scheduleid, userid }`                                                                          |
|                        | clearWeekDaySchedule         | 13    | c2s       | `{ scheduleid, userid }`                                                                          |
|                        | setYearDaySchedule           | 14    | c2s       | `{ scheduleid, userid, zigbeelocalstarttime, zigbeelocalendtime }`                                |
|                        | getYearDaySchedule           | 15    | c2s       | `{ scheduleid, userid }`                                                                          |
|                        | clearYearDaySchedule         | 16    | c2s       | `{ scheduleid, userid }`                                                                          |
|                        | setHolidaySchedule           | 17    | c2s       | `{ holidayscheduleid, zigbeelocalstarttime, zigbeelocalendtime, opermodelduringholiday }`         |
|                        | getHolidaySchedule           | 18    | c2s       | `{ holidayscheduleid }`                                                                           |
|                        | clearHolidaySchedule         | 19    | c2s       | `{ holidayscheduleid }`                                                                           |
|                        | setUserType                  | 20    | c2s       | `{ userid, usertype }`                                                                            |
|                        | getUserType                  | 21    | c2s       | `{ userid }`                                                                                      |
|                        | setRfidCode                  | 22    | c2s       | `{ userid, userstatus, usertype, pincodevalue }`                                                  |
|                        | getRfidCode                  | 23    | c2s       | `{ userid }`                                                                                      |
|                        | clearRfidCode                | 24    | c2s       | `{ userid }`                                                                                      |
|                        | clearAllRfidCodes            | 25    | c2s       | `{ }`                                                                                             |
|                        | lockDoorRsp                  | 0     | s2c       | `{ status }`                                                                                      |
|                        | unlockDoorRsp                | 1     | s2c       | `{ status }`                                                                                      |
|                        | toggleDoorRsp                | 2     | s2c       | `{ status }`                                                                                      |
|                        | unlockWithTimeoutRsp         | 3     | s2c       | `{ status }`                                                                                      |
|                        | getLogRecordRsp              | 4     | s2c       | `{ logentryid, timestamp, eventtype, source, eventidalarmcode, userid, pincodevalue }`            |
|                        | setPinCodeRsp                | 5     | s2c       | `{ status }`                                                                                      |
|                        | getPinCodeRsp                | 6     | s2c       | `{ userid, userstatus, usertype, pincodevalue }`                                                  |
|                        | clearPinCodeRsp              | 7     | s2c       | `{ status }`                                                                                      |
|                        | clearAllPinCodesRsp          | 8     | s2c       | `{ status }`                                                                                      |
|                        | setUserStatusRsp             | 9     | s2c       | `{ status }`                                                                                      |
|                        | getUserStatusRsp             | 10    | s2c       | `{ userid, userstatus }`                                                                          |
|                        | setWeekDayScheduleRsp        | 11    | s2c       | `{ status }`                                                                                      |
|                        | getWeekDayScheduleRsp        | 12    | s2c       | `{ scheduleid, userid, status, daysmask, starthour, startminute, endhour, endminute }`            |
|                        | clearWeekDayScheduleRsp      | 13    | s2c       | `{ status }`                                                                                      |
|                        | setYearDayScheduleRsp        | 14    | s2c       | `{ status }`                                                                                      |
|                        | getYearDayScheduleRsp        | 15    | s2c       | `{ scheduleid, userid, status, zigbeelocalstarttime, zigbeelocalendtime }`                        |
|                        | clearYearDayScheduleRsp      | 16    | s2c       | `{ status }`                                                                                      |
|                        | setHolidayScheduleRsp        | 17    | s2c       | `{ status }`                                                                                      |
|                        | getHolidayScheduleRsp        | 18    | s2c       | `{ holidayscheduleid, status, zigbeelocalstarttime, zigbeelocalendtime, opermodelduringholiday }` |
|                        | clearHolidayScheduleRsp      | 19    | s2c       | `{ status }`                                                                                      |
|                        | setUserTypeRsp               | 20    | s2c       | `{ status }`                                                                                      |
|                        | getUserTypeRsp               | 21    | s2c       | `{ userid, usertype }`                                                                            |
|                        | setRfidCodeRsp               | 22    | s2c       | `{ status }`                                                                                      |
|                        | getRfidCodeRsp               | 23    | s2c       | `{ userid, userstatus, usertype, pincodevalue }`                                                  |
|                        | clearRfidCodeRsp             | 24    | s2c       | `{ status }`                                                                                      |
|                        | clearAllRfidCodesRsp         | 25    | s2c       | `{ status }`                                                                                      |
|                        | operationEventNotification   | 32    | s2c       | `{ opereventsrc, opereventcode, userid, pin, zigbeelocaltime, data }`                             |
|                        | programmingEventNotification | 33    | s2c       | `{ programeventsrc, programeventcode, userid, pin, usertype, userstatus, zigbeelocaltime, data }` |
| closuresWindowCovering | upOpen                       | 0     | c2s       | `{ }`                                                                                             |
|                        | downClose                    | 1     | c2s       | `{ }`                                                                                             |
|                        | stop                         | 2     | c2s       | `{ }`                                                                                             |
|                        | goToLiftValue                | 4     | c2s       | `{ liftvalue }`                                                                                   |
|                        | goToLiftPercentage           | 5     | c2s       | `{ percentageliftvalue }`                                                                         |
|                        | goToTiltValue                | 7     | c2s       | `{ tiltvalue }`                                                                                   |
|                        | goToTiltPercentage           | 8     | c2s       | `{ percentagetiltvalue }`                                                                         |

*************************************************
<a name="HvacTbl"></a>
### 3.2.3 HVAC  

| Cluster        | Cmd                  | CmdId | Direction | Arguments                                                                  |
|----------------|----------------------|-------|-----------|----------------------------------------------------------------------------|
| hvacThermostat | setpointRaiseLower   | 0     | c2s       | `{ mode, amount }`                                                         |
|                | setWeeklySchedule    | 1     | c2s       | `{ numoftrans, dayofweek, mode, thermoseqmode }`                           |
|                | getWeeklySchedule    | 2     | c2s       | `{ daystoreturn, modetoreturn }`                                           |
|                | clearWeeklySchedule  | 3     | c2s       | `{ }`                                                                      |
|                | getRelayStatusLog    | 4     | c2s       | `{ }`                                                                      |
|                | getWeeklyScheduleRsp | 0     | s2c       | `{ numoftrans, dayofweek, mode, thermoseqmode }`                           |
|                | getRelayStatusLogRsp | 1     | s2c       | `{ timeofday, relaystatus, localtemp, humidity, setpoint, unreadentries }` |

*************************************************
<a name="LightingTbl"></a>
### 3.2.4 Lighting  

| Cluster           | Cmd                            | CmdId | Direction | Arguments                                            |
|-------------------|--------------------------------|-------|-----------|------------------------------------------------------|
| lightingColorCtrl | moveToHue                      | 0     | c2s       | `{ hue, direction, transtime }`                      |
|                   | moveHue                        | 1     | c2s       | `{ movemode, rate }`                                 |
|                   | stepHue                        | 2     | c2s       | `{ stepmode, stepsize, transtime }`                  |
|                   | moveToSaturation               | 3     | c2s       | `{ saturation, transtime }`                          |
|                   | moveSaturation                 | 4     | c2s       | `{ movemode, rate }`                                 |
|                   | stepSaturation                 | 5     | c2s       | `{ stepmode, stepsize, transtime }`                  |
|                   | moveToHueAndSaturation         | 6     | c2s       | `{ hue, saturation, transtime }`                     |
|                   | moveToColor                    | 7     | c2s       | `{ colorx, colory, transtime }`                      |
|                   | moveColor                      | 8     | c2s       | `{ ratex, ratey }`                                   |
|                   | stepColor                      | 9     | c2s       | `{ stepx, stepy, transtime }`                        |
|                   | moveToColorTemp                | 10    | c2s       | `{ colortemp, transtime }`                           |
|                   | enhancedMoveToHue              | 64    | c2s       | `{ enhancehue, direction, transtime }`               |
|                   | enhancedMoveHue                | 65    | c2s       | `{ movemode, rate }`                                 |
|                   | enhancedStepHue                | 66    | c2s       | `{ stepmode, stepsize, transtime }`                  |
|                   | enhancedMoveToHueAndSaturation | 67    | c2s       | `{ enhancehue, saturation, transtime }`              |
|                   | colorLoopSet                   | 68    | c2s       | `{ bits, bytee, action, direction, time, starthue }` |
|                   | stopMoveStep                   | 71    | c2s       | `{ bits, bytee, action, direction, time, starthue }` |

*************************************************
<a name="SsTbl"></a>
### 3.2.5 Security and Safety  

| Cluster   | Cmd                      | CmdId | Direction | Arguments                                                                                                                                                                                                                                                                                                                  |
|-----------|--------------------------|-------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ssIasZone | enrollRsp                | 0     | c2s       | `{ enrollrspcode, zoneid }`                                                                                                                                                                                                                                                                                                |
|           | statusChangeNotification | 0     | s2c       | `{ zonestatus, extendedstatus }`                                                                                                                                                                                                                                                                                           |
|           | enrollReq                | 1     | s2c       | `{ zonetype, manucode }`                                                                                                                                                                                                                                                                                                   |
| ssIasAce  | arm                      | 0     | c2s       | `{ armmode }`                                                                                                                                                                                                                                                                                                              |
|           | bypass                   | 1     | c2s       | `{ numofzones, zoneidlist }`                                                                                                                                                                                                                                                                                               |
|           | emergency                | 2     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | fire                     | 3     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | panic                    | 4     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | getZoneIDMap             | 5     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | getZoneInfo              | 6     | c2s       | `{ zoneid }`                                                                                                                                                                                                                                                                                                               |
|           | getPanelStatus           | 7     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | getBypassedZoneList      | 8     | c2s       | `{ }`                                                                                                                                                                                                                                                                                                                      |
|           | getZoneStatus            | 9     | c2s       | `{ startzoneid, maxnumzoneid, zonestatusmaskflag, zonestatusmask }`                                                                                                                                                                                                                                                        |
|           | armRsp                   | 0     | s2c       | `{ armnotification }`                                                                                                                                                                                                                                                                                                      |
|           | getZoneIDMapRsp          | 1     | s2c       | `{ zoneidmapsection0, zoneidmapsection1, zoneidmapsection2, zoneidmapsection3, zoneidmapsection4, zoneidmapsection5, zoneidmapsection6, zoneidmapsection7, zoneidmapsection8, zoneidmapsection9, zoneidmapsection10, zoneidmapsection11, zoneidmapsection12, zoneidmapsection13, zoneidmapsection14, zoneidmapsection15 }` |
|           | getZoneInfoRsp           | 2     | s2c       | `{ zoneid, zonetype, ieeeaddr }`                                                                                                                                                                                                                                                                                           |
|           | zoneStatusChanged        | 3     | s2c       | `{ zoneid, zonestatus, audiblenotif, strlen, string }`                                                                                                                                                                                                                                                                     |
|           | panelStatusChanged       | 4     | s2c       | `{ panelstatus, secondsremain, audiblenotif, alarmstatus }`                                                                                                                                                                                                                                                                |
|           | getPanelStatusRsp        | 5     | s2c       | `{ panelstatus, secondsremain, audiblenotif, alarmstatus }`                                                                                                                                                                                                                                                                |
|           | setBypassedZoneList      | 6     | s2c       | `{ numofzones, zoneid }`                                                                                                                                                                                                                                                                                                   |
|           | bypassRsp                | 7     | s2c       | `{ numofzones, bypassresult }`                                                                                                                                                                                                                                                                                             |
|           | getZoneStatusRsp         | 8     | s2c       | `{ zonestatuscomplete, numofzones, zoneinfo }`                                                                                                                                                                                                                                                                             |
| ssIasWd   | startWarning             | 0     | c2s       | `{ startwarninginfo, warningduration }`                                                                                                                                                                                                                                                                                    |
|           | squawk                   | 1     | c2s       | `{ squawkinfo }`                                                                                                                                                                                                                                                                                                           |

*************************************************
<a name="PiTbl"></a>
### 3.2.6 Protocol Interfaces  

| Cluster                | Cmd                   | CmdId | Direction | Arguments                       |
|------------------------|-----------------------|-------|-----------|---------------------------------|
| piGenericTunnel        | matchProtocolAddr     | 0     | c2s       | `{ protocoladdr }`              |
|                        | matchProtocolAddrRsp  | 0     | s2c       | `{ devieeeaddr, protocoladdr }` |
|                        | advertiseProtocolAddr | 1     | s2c       | `{ protocoladdr }`              |
| piBacnetProtocolTunnel | transferNPDU          | 0     | c2s       | `{ npdu }`                      |

*************************************************
<a name="HaTbl"></a>
### 3.2.7 Home Automation  

| Cluster                 | Cmd                      | CmdId | Direction | Arguments                                                                              |
|-------------------------|--------------------------|-------|-----------|----------------------------------------------------------------------------------------|
| haApplianceEventsAlerts | getAlerts                | 0     | c2s       | `{ }`                                                                                  |
|                         | getAlertsRsp             | 0     | s2c       | `{ alertscount, aalert }`                                                              |
|                         | alertsNotification       | 1     | s2c       | `{ alertscount, aalert }`                                                              |
|                         | eventNotification        | 2     | s2c       | `{ eventheader, eventid }`                                                             |
| haApplianceStatistics   | log                      | 0     | c2s       | `{ logid }`                                                                            |
|                         | logQueue                 | 1     | c2s       | `{ }`                                                                                  |
|                         | logNotification          | 0     | s2c       | `{ timestamp, logid, loglength, logpayload }`                                          |
|                         | logRsp                   | 1     | s2c       | `{ timestamp, logid, loglength, logpayload }`                                          |
|                         | logQueueRsp              | 2     | s2c       | `{ logqueuesize, logid }`                                                              |
|                         | statisticsAvailable      | 3     | s2c       | `{ logqueuesize, logid }`                                                              |
| haElectricalMeasurement | getProfileInfo           | 0     | c2s       | `{ }`                                                                                  |
|                         | getMeasurementProfile    | 1     | c2s       | `{ attrid, starttime, numofuntervals }`                                                |
|                         | getProfileInfoRsp        | 0     | s2c       | `{ profilecount, profileintervalperiod, maxnumofintervals, numofattrs, listofattr }`   |
|                         | getMeasurementProfileRsp | 1     | s2c       | `{ starttime, status, profileintervalperiod, numofintervalsdeliv, attrid, intervals }` |

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
