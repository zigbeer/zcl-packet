/* jshint node: true */
'use strict';

var fs = require('fs'),
    Enum = require('enum');

var zclMeta = JSON.parse(fs.readFileSync('./defs/zcl_meta.json')),
    zclDefs = JSON.parse(fs.readFileSync('./defs/zcl_defs.json'));

var zclmeta = {
    ClusterId: new Enum(zclDefs.ClusterId),
    Direction: new Enum(zclDefs.Direction),
    DataType: new Enum(zclDefs.DataType),
    ParamType: new Enum(zclDefs.ParamType),
    GenBasic: new Enum(zclDefs.GenBasic),
    GenIdentify: new Enum(zclDefs.GenIdentify),
    GenGroups: new Enum(zclDefs.GenGroups),
    GenScenes: new Enum(zclDefs.GenScenes),
    GenOnOff: new Enum(zclDefs.GenOnOff),
    GenLevelControl: new Enum(zclDefs.GenLevelControl),
    GenAlarms: new Enum(zclDefs.GenAlarms),
    GenLocation: new Enum(zclDefs.GenLocation),
    GenCommissioning: new Enum(zclDefs.GenCommissioning),
    ClosuresDoorLock: new Enum(zclDefs.ClosuresDoorLock),
    HvacThermostat: new Enum(zclDefs.HvacThermostat),
    LightingColorControl: new Enum(zclDefs.LightingColorControl),
    SsIasZone: new Enum(zclDefs.SsIasZone),
    SsIasAce: new Enum(zclDefs.SsIasAce),
    SsIasWd: new Enum(zclDefs.SsIasWd),
    PiGenericTunnel: new Enum(zclDefs.PiGenericTunnel),
    PiBacnetProtocolTunnel: new Enum(zclDefs.PiBacnetProtocolTunnel),
    HaApplianceEventsAlerts: new Enum(zclDefs.HaApplianceEventsAlerts),
    HaApplianceStatistics: new Enum(zclDefs.HaApplianceStatistics),
    HaElectricalMeasurement: new Enum(zclDefs.HaElectricalMeasurement),
};

zclDefs.ClusterId = null;
zclDefs.Direction = null;
zclDefs.DataType = null;
zclDefs.ParamType = null;
zclDefs.GenBasic = null;
zclDefs.GenIdentify = null;
zclDefs.GenGroups = null;
zclDefs.GenScenes = null;
zclDefs.GenOnOff = null;
zclDefs.GenLevelControl = null;
zclDefs.GenAlarms = null;
zclDefs.GenLocation = null;
zclDefs.GenCommissioning = null;
zclDefs.ClosuresDoorLock = null;
zclDefs.HvacThermostat = null;
zclDefs.LightingColorControl = null;
zclDefs.SsIasZone = null;
zclDefs.SsIasAce = null;
zclDefs.SsIasWd = null;
zclDefs.PiGenericTunnel = null;
zclDefs.PiBacnetProtocolTunnel = null;
zclDefs.HaApplianceEventsAlerts = null;
zclDefs.HaApplianceStatistics = null;
zclDefs.HaElectricalMeasurement = null;
zclDefs = null;

zclmeta.get = function (cluster, cmd) {
    var meta = zclMeta[cluster];
    return meta ? meta[cmd] : undefined;
    // return: {
    //  direction,
    //  cmdId,
    //  params: [ { name: type }, ... ]
    // }
};


zclmeta.getDirection = function (cluster, cmd) {
    var meta = this.get(cluster, cmd);
    if (meta)
        meta = this.Direction.get(meta.direction);

    return meta ? meta.key : undefined;        // return: "Client To Server", "Server To Client"
};

zclmeta.getParams = function (cluster, cmdName) {
    var meta = zclmeta.get(cluster, cmdName),
        params = meta ? meta.params : meta;    // [ { name: type }, .... ]

    if (params)
        return zclmeta.cloneParamsWithNewFormat(params);
    else
        return;
};

zclmeta.cloneParamsWithNewFormat = function (params) {
    var output = [];

    params.forEach(function (item, idx) {
        var newItem = {
                name: Object.keys(item)[0],
                type: null
            };

        newItem.type = item[newItem.name];  // type is a number
        output.push(newItem);
    });

    output = zclmeta._paramTypeToString(output);

    return output;
};

zclmeta._paramTypeToString = function (params) {
    params.forEach(function (item, idx) {
        var type = zclmeta.ParamType.get(item.type);   // enum | undefined
        item.type = type ? type.key : item.type;    // item.type is a string
    });

    return params;
};

module.exports = zclmeta;
