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

<br />

<a name="Installation"></a>
### 1.2 Installation  

> $ npm install zcl-packet --save

<br />

<a name="Usage"></a>
### 1.3 Usage  

**zcl-packet** exports as a Constructor denoted as `ZclPacket` in this document. You can create an instance with cmdType `foundation` or `functional` and just simply call `parse()` and `frame()` method to parse/build zcl packet you need.

//  It has two properties: `foundation` and `functional`, they are using for process foundation and functional command packet, respectively.

```javascript
var ZclPacket = require('zcl-packet'),
    foundPacket = new ZPacket('foundation');

foundPacket.frame(); //TODO

foundPacket.parse(function () {
    //TODO
});
```

<br />

<a name="APIs"></a>
## 2. APIs  

* [new ZclPacket()]
* frame()
* parse()

*******************

### ZclPacket Class

<a name="zPacketCls"></a>
#### new ZclPacket(cmdType[, clusterId])

**Arguments:**

    1. `cmdType`(_String_): It can be either a string of 'foundation' or 'functional' to indicate which type of ZCL command you want to process.
    2. `clusterId`(_Number_): Cluster ID. It is must be filled if `cmdType` is 'functional'.

**Returns:**
    
    * (_Object_): foundPacket or funcPacket

**Examples:**

```javascript
var ZclPacket = require('zcl-packet');
    
var foundPacket = new ZPacket('foundation'),
    funcPacket = new ZPacket('functional');
```


### 2.1 Foundation CLass

Exposed by `require('zcl-packet').foundation`

An instance of thia class is denoted as **foundPacket**. It has two method `parse()` and `frame()` to parse oe build ZCL foundation command packet.

*******************

#### new Foundation()

Create a new instance of Foundation class

**Arguments:**
    * (none)

**Returns:**
    * (none)  

**Examples:**

```javascript
var Foundation = require('zcl-packet').foundation;

var foundPacket = new Foundation();
```

***********************

#### .frame(frameCntl, manufCode, )

***********************

#### .parse(zBuf, callback)

Parse ZCL foundation buffer to a readable object. 

**Arguments:**
    * zBuf (_Buffer_): ZCL foundation buffer to be parsed.
    * callback (_Function_): `function (err, result) {...}`. Get called when the zcl buffer is parsed.

**Returns:**
    * (none)  

**Examples:**

```javascript
// Here is a example of parsing 
```

<br />

<a name="Appendix"></a>
## 3. Appendix  


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
