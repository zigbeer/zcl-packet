/* jshint node: true */
'use strict';

var Enum = require('enum');

var zcl = {
    // General Clusters
    GenBasic: {},
    GenPowerCfg: {},
    GenDeviceTempConfig: {},
    GenIdentify: {},
    GenGroups: {},
    GenScenes: {},
    GenOnOff: {},
    GenOnOffSwitchConfig: {},
    GenLevelControl: {},
    GenAlarms: {},
    GenTime: {},
    GenLocation: {},
    GenAnalogInputBasic: {},
    GenAnalogOutputBasic: {},
    GenAnalogValueBasic: {},
    GenBinaryInputBasic: {},
    GenBinaryOutputBasic: {},
    GenBinaryValueBasic: {},
    GenMultistateInputBasic: {},
    GenMultistateOutputBasic: {},
    GenMultistateValueBasic: {},
    GenCommissioning: {},
    GenPartition: {},
    GenPowerPrefile: {},
    GenAppControl: {},
    GenPollControl: {},
    GenGreenPowerProxy: {},
    // Closure Clusters
    ClosuresShadeConfig: {},
    ClosuresDoorLock: {},
    ClosuresWindowConvering: {},
    // Hvac Clusters
    HvacPumpConfigControl: {},
    HvacThermostat: {},
    HvacFanControl: {},
    HvacDihumidificationControl: {},
    HvacUserInterfaceConfig: {},
    // Lighting Clusters
    LightingColorControl: {},
    LightingBallastConfig: {},
    // Measurement and Sensing Clusters
    MsIlluminanceMeasurement: {},
    MsIlluminanceLevelSensingConfig: {},
    MsTemperatureMeasurement: {},
    MsPressureMeasurement: {},
    MsFlowMeasurement: {},
    MsRelativeHumidity: {},
    MsOccupancySensing: {},
    // Security and Safety (SS) Clusters
    SsIasZone: {},
    SsIasAce: {},
    SsIasWd: {},
    // Protocol Interfaces
    PiGenericTunnel: {},
    PiBacnetProtocolTunnel: {},
    PiAnalogInputBacnetReg: {},
    PiAnalogInputBacnetExt: {},
    PiAnalogOutputBacnetReg: {},
    PiAnalogOutputBacnetExt: {},
    PiAnalogValueBacnetReg: {},
    PiAnalogValueBacnetExt: {},
    PiBinaryInputBacnetReg: {},
    PiBinaryInputBacnetExt: {},
    PiBinaryOutputBacnetReg: {},
    PiBinaryOutputBacnetExt: {},
    PiBinaryValueBacnetReg: {},
    PiBinaryValueBacnetExt: {},
    PiMultistateInputBacnetReg: {},
    PiMultistateInputBacnetExt: {},
    PiMultistateOutputBacnetReg: {},
    PiMultistateOutputBacnetExt: {},
    PiMultistateValueBacnetReg: {},
    PiMultistateValueBacnetExt: {},
    Pi11073ProtocolTunnel: {},
    // Advanced Metering Initiative (SE) Clusters
    SePricing: {},
    SeLoadControl: {},
    SeSimpleMetering: {},
    SeMessage: {},
    SeSeTunneling: {},
    SePrepayment: {},
    SeEnergyMgmt: {},
    SeTouCalendar: {},
    SeDeviceMgmt: {},
    SeEvents: {},
    SeMduPairing: {},
    HaApplianceIdentification: {},
    HaMeterIdentification: {},
    HaApplianceEventsAlerts: {},
    HaApplianceStatistics: {},
    HaElectricalMeasurement: {},
    HaDiagnostic: {}
};

module.exports = zcl;

zcl.FoundationId = new Enum({
    'read': 0x00,
    'readRsp': 0x01,
    'write': 0x02,
    'writeUndiv': 0x03,
    'writeRsp': 0x04,
    'writeNoRsp': 0x05,
    'configReport': 0x06,
    'configReportRsp': 0x07,
    'readReportConfig': 0x08,
    'readReportConfigRsp': 0x09,
    'report': 0x0a,
    'defaultRsp': 0x0b,
    'discover': 0x0c,
    'discoverRsp': 0x0d,
    'readStruct': 0x0e,
    'writeStrcut': 0x0f,
    'writeStrcutRsp': 0x10,
    'max': 0x11
});

zcl.ClusterId = new Enum({
    // General Clusters
    'GenBasic': 0x0000,
    'GenPowerCfg': 0x0001,
    'GenDeviceTempConfig': 0x0002,
    'GenIdentify': 0x0003,
    'GenGroups': 0x0004,
    'GenScenes': 0x0005,
    'GenOnOff': 0x0006,
    'GenOnOffSwitchConfig': 0x0007,
    'GenLevelControl': 0x0008,
    'GenAlarms': 0x0009,
    'GenTime': 0x000A,
    'GenLocation': 0x000B,
    'GenAnalogInputBasic': 0x000C,
    'GenAnalogOutputBasic': 0x000D,
    'GenAnalogValueBasic': 0x000E,
    'GenBinaryInputBasic': 0x000F,
    'GenBinaryOutputBasic': 0x0010,
    'GenBinaryValueBasic': 0x0011,
    'GenMultistateInputBasic': 0x0012,
    'GenMultistateOutputBasic': 0x0013,
    'GenMultistateValueBasic': 0x0014,
    'GenCommissioning': 0x0015,
    'GenPartition': 0x0016,
    'OTA': 0x0019,
    'GenPowerPrefile': 0x001A,
    'GenAppControl': 0x001B,
    'GenPollControl': 0x0020,
    'GenGreenPowerProxy': 0x0021,
    // Closures Clusters
    'ClosuresShadeConfig': 0x0100,
    'ClosuresDoorLock': 0x0101,
    'ClosuresWindowConvering': 0x0102,
    // HVAC Clusters
    'HvacPumpConfigControl': 0x0200,
    'HvacThermostat': 0x0201,
    'HvacFanControl': 0x0202,
    'HvacDihumidificationControl': 0x0203,
    'HvacUserInterfaceConfig': 0x0204,
    // Lighting Clusters
    'LightingColorControl': 0x0300,
    'LightingBallastConfig': 0x0301,
    // Measurement and Sensing Clusters
    'MsIlluminanceMeasurement': 0x0400,
    'MsIlluminanceLevelSensingConfig': 0x0401,
    'MsTemperatureMeasurement': 0x0402,
    'MsPressureMeasurement': 0x0403,
    'MsFlowMeasurement': 0x0404,
    'MsRelativeHumidity': 0x0405,
    'MsOccupancySensing': 0x0406,
    // Security and Safety (SS) Clusters
    'SsIasZone': 0x0500,
    'SsIasAce': 0x0501,
    'SsIasWd': 0x0502,
    // Protocol Interfaces
    'PiGenericTunnel': 0x0600,
    'PiBacnetProtocolTunnel': 0x0601,
    'PiAnalogInputBacnetReg': 0x0602,
    'PiAnalogInputBacnetExt': 0x0603,
    'PiAnalogOutputBacnetReg': 0x0604,
    'PiAnalogOutputBacnetExt': 0x0605,
    'PiAnalogValueBacnetReg': 0x0606,
    'PiAnalogValueBacnetExt': 0x0607,
    'PiBinaryInputBacnetReg': 0x0608,
    'PiBinaryInputBacnetExt': 0x0609,
    'PiBinaryOutputBacnetReg': 0x060A,
    'PiBinaryOutputBacnetExt': 0x060B,
    'PiBinaryValueBacnetReg': 0x060C,
    'PiBinaryValueBacnetExt': 0x060D,
    'PiMultistateInputBacnetReg': 0x060E,
    'PiMultistateInputBacnetExt': 0x060F,
    'PiMultistateOutputBacnetReg': 0x0610,
    'PiMultistateOutputBacnetExt': 0x0611,
    'PiMultistateValueBacnetReg': 0x0612,
    'PiMultistateValueBacnetExt': 0x0613,
    'Pi11073ProtocolTunnel': 0x0614,
    // Advanced Metering Initiative :SE) Clusters
    'SePricing': 0x0700,
    'SeLoadControl': 0x0701,
    'SeSimpleMetering': 0x0702,
    'SeMessage': 0x0703,
    'SeSeTunneling': 0x0704,
    'SePrepayment': 0x0705,
    'SeEnergyMgmt': 0x0706,
    'SeTouCalendar': 0x0707,
    'SeDeviceMgmt': 0x0708,
    'SeEvents': 0x0709,
    'SeMduPairing': 0x070A,
    'HaApplianceIdentification': 0x0B00,
    'HaMeterIdentification': 0x0B01,
    'HaApplianceEventsAlerts': 0x0B02,
    'HaApplianceStatistics': 0x0B03,
    'HaElectricalMeasurement': 0x0B04,
    'HaDiagnostic': 0x0B05,
    'ManuSpecificCluster': 0xFFFF
});

zcl.Direction = new Enum({
    "Client To Server": 0,
    "Server To Client": 1
 });

zcl.DataType = new Enum({
    'NO_DATA': 0x00,
    'DATA8': 0x08,
    'DATA16': 0x09,
    'DATA24': 0x0a,
    'DATA32': 0x0b,
    'DATA40': 0x0c,
    'DATA48': 0x0d,
    'DATA56': 0x0e,
    'DATA64': 0x0f,
    'BOOLEAN': 0x10,
    'BITMAP8': 0x18,
    'BITMAP16': 0x19,
    'BITMAP24': 0x1a,
    'BITMAP32': 0x1b,
    'BITMAP40': 0x1c,
    'BITMAP48': 0x1d,
    'BITMAP56': 0x1e,
    'BITMAP64': 0x1f,
    'UINT8': 0x20,
    'UINT16': 0x21,
    'UINT24': 0x22,
    'UINT32': 0x23,
    'UINT40': 0x24,
    'UINT48': 0x25,
    'UINT56': 0x26,
    'UINT64': 0x27,
    'INT8': 0x28,
    'INT16': 0x29,
    'INT24': 0x2a,
    'INT32': 0x2b,
    'INT40': 0x2c,
    'INT48': 0x2d,
    'INT56': 0x2e,
    'INT64': 0x2f,
    'ENUM8': 0x30,
    'ENUM16': 0x31,
    'SEMI_PREC': 0x38,
    'SINGLE_PREC': 0x39,
    'DOUBLE_PREC': 0x3a,
    'OCTET_STR': 0x41,
    'CHAR_STR': 0x42,
    'LONG_OCTET_STR': 0x43,
    'LONG_CHAR_STR': 0x44,
    'ARRAY': 0x48,
    'STRUCT': 0x4c,
    'SET': 0x50,
    'BAG': 0x51,
    'TOD': 0xe0,
    'DATE': 0xe1,
    'UTC': 0xe2,
    'CLUSTER_ID': 0xe8,
    'ATTR_ID': 0xe9,
    'BAC_OID': 0xea,
    'IEEE_ADDR': 0xf0,
    '128_BIT_SEC_KEY': 0xf1,
    'UNKNOWN': 0xff
});

zcl.StatusCode = new Enum({
    'SUCCESS': 0x00,
    'FAILURE': 0x01,
    'NOT_AUTHORIZED': 0x7E,
    'MALFORMED_COMMAND': 0x80,
    'UNSUP_CLUSTER_COMMAND': 0x81,
    'UNSUP_GENERAL_COMMAND': 0x82,
    'UNSUP_MANU_CLUSTER_COMMAND': 0x83,
    'UNSUP_MANU_GENERAL_COMMAND': 0x84,
    'INVALID_FIELD': 0x85,
    'UNSUPPORTED_ATTRIBUTE': 0x86,
    'INVALID_VALUE': 0x87,
    'READ_ONLY': 0x88,
    'INSUFFICIENT_SPACE': 0x89,
    'DUPLICATE_EXISTS': 0x8a,
    'NOT_FOUND': 0x8b,
    'UNREPORTABLE_ATTRIBUTE': 0x8c,
    'INVALID_DATA_TYPE': 0x8d,
    'INVALID_SELECTOR': 0x8e,
    'WRITE_ONLY': 0x8f,
    'INCONSISTENT_STARTUP_STATE': 0x90,
    'DEFINED_OUT_OF_BAND': 0x91,
    'INCONSISTENT': 0x92,
    'ACTION_DENIED': 0x93,
    'TIMEOUT': 0x94,
    'ABORT': 0x95,
    'INVALID_IMAGE': 0x96,
    'WAIT_FOR_DATA': 0x97,
    'NO_IMAGE_AVAILABLE': 0x98,
    'REQUIRE_MORE_IMAGE': 0x99,
    'HARDWARE_FAILURE': 0xc0,
    'SOFTWARE_FAILURE': 0xc1,
    'CALIBRATION_ERROR': 0xc2,
    'CMD_HAS_RSP': 0xFF    // Non-standard status (used for Default Rsp)
});

zcl.ParamType = new Enum({

});

zcl.PrivateCluster = {

};

/***                                   GENERAL SPECIFICATION                                   ***/
/*************************************************************************************************/
/*** General Basic Cluster                                                                     ***/
/*************************************************************************************************/
zcl.GenBasic.Attr = new Enum({
    // Basic Device Information
    'ZclVersion': 0x0000,
    'AppVersion': 0x0001,
    'StackVersion': 0x0002,
    'HwVersion': 0x0003,
    'ManufacturerName': 0x0004,
    'ModelId': 0x0005,
    'DateCode': 0x0006,
    'PowerSource': 0x0007,
    'AppProfileVersion': 0x0008,
    'SwBuildId': 0x4000,
    // Basic Device Settings
    'LocationDesc': 0x0010,
    'PhysicalEnv': 0x0011,
    'DeviceEnabled': 0x0012,
    'AlarmMask': 0x0013,
    'DisableLocalConfig': 0x0014
});

zcl.GenBasic.AttrType = {
    ZclVersion: 'UINT8',
    AppVersion: 'UINT8',
    StackVersion: 'UINT8',
    HwVersion: 'UINT8',
    ManufacturerName: 'CHAR_STR',
    ModelId: 'CHAR_STR',
    DateCode: 'CHAR_STR',
    PowerSource: 'PowerSourceAttrValue',                 // ENUM8
    AppProfileVersion: 'AppProfileVersionAttrValue',
    LocationDesc: 'CHAR_STR',
    PhysicalEnv: 'PhysicalEnvAttrValue',                 // ENUM8
    DeviceEnabled: 'DeviceEnabledAttrValue',             // BOOLEAN
    AlarmMask: 'AlarmMaskAttrValue',                     // BITMAP8
    DisableLocalConfig: 'DisableLocalConfigAttrValue'    // BITMAP8
};

zcl.GenBasic.PowerSourceAttrValue = new Enum({
    'Unknown': 0x00,
    'Mains1Phase': 0x01,
    'Mains3Phase': 0x02,
    'Battery': 0x03,
    'DC': 0x04,
    'EmergMainsConstPwr': 0x05,
    'EmergMainsXferSw': 0x06
});

zcl.GenBasic.AppProfileVersionAttrValue = new Enum({
    'BuildingAutomation': 0x00,
    'RemoteControl': 0x01,
    'SmartEnergy': 0x02,
    'HealthCare': 0x03,
    'HomeAutomation': 0x04,
    'InputDevice': 0x05,
    'LightLink': 0x06,
    'RetailServices': 0x07,
    'TelecomServices': 0x08
});

zcl.GenBasic.PhysicalEnvAttrValue = new Enum({
    'UnspecifiedEnv': 0x00,
    // Specified per Profile 0x01-0x7F
    'UnknownEnv': 0xFF
});

zcl.GenBasic.DeviceEnabledAttrValue = new Enum({
    'DeviceDisabled': 0x00,
    'DeviceEnabled': 0x01
});

zcl.GenBasic.AlarmMaskAttrValue = new Enum({
    'HwFault': 0x01,
    'SwFault': 0x02
});

zcl.GenBasic.DisableLocalConfigAttrValue = new Enum({
    // BIT0
    'ResetEnabled': 0x00,
    'ResetDisabled': 0x01,
    // BIT1
    'DeviceCfgEnabled': 0x00,
    'DeviceCfgDisabled': 0x02
});

zcl.GenBasic.Cmd = new Enum({
    'ResetFactDefault': 0x00
});

/*************************************************************************************************/
/*** General Power Configuration Cluster                                                       ***/
/*************************************************************************************************/
zcl.GenPowerCfg.Attr = new Enum({
    // Mains Information
    'MainsVoltage': 0x0000,
    'MainsFrequency': 0x0001,
    // Mains Settings
    'MainsAlarmMask': 0x0010,
    'MainsVoltMinThres': 0x0011,
    'MainsVoltMaxThres': 0x0012,
    'MainsVoltageDwellTripPoint': 0x0013,
    // Battery Information
    'BatteryVoltage': 0x0020,
    'BatteryPercentageRemaining': 0x0021,
    // Battery Settings
    'BatteryVolt': 0x0030,
    'BatterySize': 0x0031,
    'BatteryAHrRating': 0x0032,
    'BatteryQuantity': 0x0033,
    'BatteryRatedVoltage': 0x0034,
    'BatteryAlarmMask': 0x0035,
    'BatteryVoltMinThres': 0x0036,
    'BatteryVoltThres1': 0x0037,
    'BatteryVoltThres2': 0x0038,
    'BatteryVoltThres3': 0x0039,
    'BatteryPercentMinThres': 0x003A,
    'BatteryPercentThres1': 0x003B,
    'BatteryPercentThres2': 0x003C,
    'BatteryPercentThres3': 0x003D,
    'BatteryAlarmState': 0x003E    // TODO
});

zcl.GenPowerCfg.AttrType = {
    MainsVoltage: 'UINT16',
    MainsFrequency: 'UINT8',
    MainsAlarmMask: 'MainsAlarmMaskAttrValue',        // BITMAP8
    MainsVoltMinThres: 'UINT16',
    MainsVoltMaxThres: 'UINT16',
    MainsVoltageDwellTripPoint: 'UINT16',
    BatteryVoltage: 'UINT8',
    BatteryVolt: 'CHAR_STR',
    BatterySize: 'BatterySizeAttrValue',              // ENUM8
    BatteryAHrRating: 'UINT16',
    BatteryQuantity: 'UINT8',
    BatteryRatedVoltage: 'UINT8',
    BatteryAlarmMask: 'BatteryAlarmMaskAttrValue',    // BITMAP8
    BatteryVoltMinThres: 'UINT8'
};

zcl.GenPowerCfg.MainsAlarmMaskAttrValue = new Enum({
    'VoltTooLow': 0x01,
    'VoltTooHigh': 0x02,
    'PowerSuppLost': 0x04
});

zcl.GenPowerCfg.BatterySizeAttrValue = new Enum({
    'NoBattery': 0x00,
    'BuiltIn': 0x01,
    'Other': 0x02,
    'AA': 0x03,
    'AAA': 0x04,
    'C': 0x05,
    'D': 0x06,
    'Unknown': 0xFF
});

zcl.GenPowerCfg.BatteryAlarmMaskAttrValue = new Enum({
    'VoltTooLow': 0x01,
    'BatteryAlarm1': 0x02,
    'BatteryAlarm2': 0x04,
    'BatteryAlarm3': 0x08
});

/*************************************************************************************************/
/*** General Device Temperature Configuration Cluster                                          ***/
/*************************************************************************************************/
zcl.GenDeviceTempConfig.Attr = new Enum({
    // Device Temperature Information
    'CurrentTemperature': 0x0000,
    'MinTempExperienced': 0x0001,
    'MaxTempExperienced': 0x0002,
    'OverTempTotalDwell': 0x0003,
    // Device Temperature Settings
    'DevTempAlarmMask': 0x0010,
    'LowTempThres': 0x0011,
    'HighTempThres': 0x0012,
    'LowTempDwellTripPoint': 0x0013,
    'HighTempDwellTripPoint': 0x0014
});

zcl.GenDeviceTempConfig.AttrType = {
    CurrentTemperature: 'INT16',
    MinTempExperienced: 'INT16',
    MaxTempExperienced: 'INT16',
    OverTempTotalDwell: 'UINT16',
    DevTempAlarmMask: 'DevTempAlarmMaskAttrValue',    // BITMAP8
    LowTempThres: 'INT16',
    HighTempThres: 'INT16',
    LowTempDwellTripPoint: 'UINT24',
    HighTempDwellTripPoint: 'UINT24'
};

zcl.GenDeviceTempConfig.DevTempAlarmMaskAttrValue = new Enum({
    'TempTooLow': 0x01,
    'TempTooHigh': 0x02
});

/*************************************************************************************************/
/*** General Identify Cluster                                                                  ***/
/*************************************************************************************************/
zcl.GenIdentify.Attr = new Enum({
    'IdentifyTime': 0x0000,
    'IdentifyCommissionState': 0x0001    // TODO
});

zcl.GenIdentify.AttrType = {
    IdentifyTime: 'UINT16'
};

zcl.GenIdentify.Cmd = new Enum({
    'Identify': 0x00,
    'IdentifyQuery': 0x01,
    'EzmodeInvoke': 0x02,
    'UpdateCommissionState': 0x03,
    'TriggerEffect': 0x40
});

zcl.GenIdentify.CmdRsp = new Enum({
    'IdentifyQueryRsp': 0x00    
});

/*************************************************************************************************/
/*** General Group Cluster                                                                     ***/
/*************************************************************************************************/
zcl.GenGroups.Attr = new Enum({
    'NameSupport': 0x0000
});

zcl.GenGroups.AttrType = {
    NameSupport: 'BITMAP8'
};

zcl.GenGroups.Cmd = new Enum({
    'Add': 0x00,
    'View': 0x01,
    'GetMembership': 0x02,
    'Remove': 0x03,
    'RemoveAll': 0x04,
    'AddIfIdentifying': 0x05
});

zcl.GenGroups.CmdRsp = new Enum({
    'AddRsp': 0x00,
    'ViewRsp': 0x01,
    'GetMembershipRsp': 0x02,
    'RemoveRsp': 0x03 
});

zcl.GenGroups.StatusValue = new Enum({
    'Success': 0x00,
    'NotFound': 0x8b,
    'DuplicateExists': 0x8a,
    'InsufficientSpace': 0x89
});

/*************************************************************************************************/
/*** General Scenes Cluster                                                                    ***/
/*************************************************************************************************/
zcl.GenScenes.Attr = new Enum({
    'Count': 0x0000,
    'CurrentScene': 0x0001,
    'CurrentGroup': 0x0002,
    'SceneValid': 0x0003,
    'NameSupport': 0x0004,
    'LastCfgBy': 0x0005
});

zcl.GenScenes.AttrType = {
    Count: 'UINT8',
    CurrentScene: 'UINT8',
    CurrentGroup: 'UINT16',
    SceneValid: 'BOOLEAN',
    NameSupport: 'BITMAP8',
    LastCfgBy: 'IEEE_ADDR'
};

zcl.GenScenes.Cmd = new Enum({
    'Add': 0x00,
    'View': 0x01,
    'Remove': 0x02,
    'RemoveAll': 0x03,
    'Store': 0x04,
    'Recall': 0x05,
    'GetSceneMembership': 0x06,
    'EnhancedAdd': 0x40,
    'EnhancedView': 0x41,
    'Copy': 0x42
    // TODO: Duplicate?
});

zcl.GenScenes.CmdRsp = new Enum({
    'AddRsp': 0x00,
    'ViewRsp': 0x01,
    'RemoveRsp': 0x02,
    'RemoveAllRsp': 0x03,
    'StoreRsp': 0x04,
    'GetSceneMembershipRsp': 0x06,
    'EnhancedAddRsp': 0x40,
    'EnhancedViewRsp': 0x41,
    'CopyRsp': 0x42
});

zcl.GenScenes.StatusValue = new Enum({
    'Success': 0x00,
    'DuplicateExists' : 0x8a,
    'NotFound': 0x8b,
    'InsufficientSpace': 0x89,
    'InvalidField': 0x85
});

/*************************************************************************************************/
/*** General On/Off Cluster                                                                    ***/
/*************************************************************************************************/
zcl.GenOnOff.Attr = new Enum({
    'OnOff': 0x0000,
    // TODO
    'GlobalSceneCtrl': 0x4000,
    'OnTime': 0x4001,
    'OffWaitTime': 0x4002
});

zcl.GenOnOff.AttrType = {
    OnOff: 'BOOLEAN'
};

zcl.GenOnOff.Cmd = new Enum({
    'Off': 0x00,
    'On': 0x01,
    'Toggle': 0x02,
    'OffWithEffect': 0x40,
    'OnWithRecallGlobalScene': 0x41,
    'OnWithTimedOff': 0x42
});

/*************************************************************************************************/
/*** General On/Off Switch Configuration Cluster                                               ***/
/*************************************************************************************************/
zcl.GenOnOffSwitchConfig.Attr = new Enum({
    // Switch Information
    'SwitchType': 0x0000,
    // Switch Settings
    'SwitchMultiFunction': 0x0002,    // TODO
    'SwitchActions': 0x0010
});

zcl.GenOnOffSwitchConfig.AttrType = {
    SwitchType: 'SwitchTypeAttrValue',         // ENUM8
    SwitchActions: 'SwitchActionsAttrValue'    // ENUM8
};

zcl.GenOnOffSwitchConfig.SwitchTypeAttrValue = new Enum({
    'Toggle': 0x00,
    'Momentary': 0x01,
    'Multifunction': 0x02
});

zcl.GenOnOffSwitchConfig.SwitchActionsAttrValue = new Enum({
    'Actions0': 0x00,
    'Actions1': 0x01,
    'Actions2': 0x02
});

/*************************************************************************************************/
/*** General Level Control Cluster                                                             ***/
/*************************************************************************************************/
zcl.GenLevelControl.Attr = new Enum({
    'CurrentLevel': 0x0000,
    'RemainingTime': 0x0001,
    'OnOffTransitionTime': 0x0010,
    'OnLevel': 0x0011,
    // TODO
    'OnTransitionTime': 0x0012,
    'OffTransitionTime': 0x0013,
    'DefaultMoveRate': 0x0014
});

zcl.GenLevelControl.AttrType = {
    CurrentLevel: 'UINT8',
    RemainingTime: 'UINT16',
    OnOffTransitionTime: 'UINT16',
    OnLevel: 'UINT8'
};

zcl.GenLevelControl.Cmd = new Enum({
    'MoveToLevel': 0x00,
    'Move': 0x01,
    'Step': 0x02,
    'Stop': 0x03,
    'MoveToLevelWithOnOff': 0x04,
    'MoveWithOnOff': 0x05,
    'StepWithOnOff': 0x06,
    'StopWithOnOff': 0x07 
});

zcl.GenLevelControl.MoveModeValue = new Enum({
    'Up': 0x00,
    'Down': 0x01
});

zcl.GenLevelControl.StepModeValue = new Enum({
    'Up': 0x00,
    'Down': 0x01
});

/*************************************************************************************************/
/*** General Alarms Cluster                                                                    ***/
/*************************************************************************************************/
zcl.GenAlarms.Attr = new Enum({
    'AlarmCount': 0x0000
});

zcl.GenAlarms.AttrType = {
    AlarmCount: 'UINT16'
};

zcl.GenAlarms.Cmd = new Enum({
    'Reset': 0x00,
    'ResetAll': 0x01,
    'Get': 0x02,
    'ResetLog': 0x03,
    'PublishEventLog': 0x04    // TODO
});

zcl.GenAlarms.CmdRsp = new Enum({
    'Alarm': 0x00,
    'GetRsp': 0x01,
    'GetEventLog': 0x02        // TODO
});

zcl.GenAlarms.StatusValue = new Enum({
    'Success': 0x00,
    'NotFound': 0x8b
});

/*************************************************************************************************/
/*** General Time Cluster                                                                      ***/
/*************************************************************************************************/
zcl.GenTime.Attr = new Enum({
    'Time': 0x0000,
    'TimeStatus': 0x0001,
    'TimeZone': 0x0002,
    'DstStart': 0x0003,
    'DstEnd': 0x0004,
    'DstShift': 0x0005,
    'StandardTime': 0x0006,
    'LocalTime': 0x0007,
    'LastSetTime': 0x0008,
    'ValidUntilTime': 0x0009
});

zcl.GenTime.AttrType = {
    Time: 'UTC',
    TimeStatus: 'TimeStatusAttrValue',    // BITMAP8
    TimeZone: 'INT32',
    DstStart: 'UINT32',
    DstEnd: 'UINT32',
    DstShift: 'DstShiftAttrValue',
    StandardTime: 'UINT32',
    LocalTime: 'UINT32',
    LastSetTime: 'UTC',
    ValidUntilTime: 'UTC'
};

zcl.GenTime.DstShiftAttrValue = new Enum({
    'Min': 0xFFFEAE80,
    'Max': 0xFFFEAE80
});

zcl.GenTime.TimeStatusAttrValue = new Enum({
    'Master': 0x01,
    'Synchronized': 0x02,
    'MasterZoneDst': 0x04
});

/*************************************************************************************************/
/*** General RSSI Location Cluster                                                             ***/
/*************************************************************************************************/
zcl.GenLocation.Attr = new Enum({
    // Location Information
    'Type': 0x0000,
    'Method': 0x0001,
    'Age': 0x0002,
    'QualityMeasure': 0x0003,
    'NumOfDevices': 0x0004,
    // Location Settings
    'Coordinate1': 0x0010,
    'Coordinate2': 0x0011,
    'Coordinate3': 0x0012,
    'Power': 0x0013,
    'PathLossExponent': 0x0014,
    'ReportingPeriod': 0x0015,
    'CalcPeriod': 0x0016,
    'NumRSSIMeasurements': 0x0017
});

zcl.GenLocation.AttrType = {
    // Location Information
    Type: 'TypeAttrValue',        // DATA8
    Method: 'MethodAttrValue',    // ENUM8
    Age: 'UINT16',
    QualityMeasure: 'UINT8',
    NumOfDevices: 'UINT8',
    // Location Settings
    Coordinate1: 'INT16',
    Coordinate2: 'INT16',
    Coordinate3: 'INT16',
    Power: 'INT16',
    PathLossExponent: 'UINT16',
    ReportingPeriod: 'UINT16',
    CalcPeriod: 'UINT16',
    NumRSSIMeasurements: 'UINT16'
};

zcl.GenLocation.TypeAttrValue = new Enum({
    'Absolute': 0x01,
    '2_D': 0x02,
    'CoordinateSystem': 0x0C
});

zcl.GenLocation.MethodAttrValue = new Enum({
    'Lateration': 0x00,
    'Signposting': 0x01,
    'RFfingerprinting': 0x02,
    'OutOfBand': 0x03
});

zcl.GenLocation.Cmd = new Enum({
    'SetAbsolute': 0x00,
    'SetDevCfg': 0x01,
    'GetDevCfg': 0x02,
    'GetData': 0x03
    // 'RssiRsp': 0x04,
    // 'SendPings': 0x05,
    // 'AnchorNodeAnnounce': 0x06
});

zcl.GenLocation.CmdRsp = new Enum({
    'DevCfgRsp': 0x00,
    'DataRsp': 0x01,
    'DataNotif': 0x02,
    'CompactDataNotif': 0x03,
    'RssiPing': 0x04
    // 'RssiReq': 0x05,
    // 'ReportRssiMeas': 0x06,
    // 'ReqOwnLocation': 0x07
});

zcl.GenLocation.StatusValue = new Enum({
    'Success': 0x00,
    'NotFound': 0x01
});

/*************************************************************************************************/
/*** General Analog Input (Basic) Cluster                                                      ***/
/*************************************************************************************************/
zcl.GenAnalogInputBasic.Attr = new Enum({
    'Description': 0x001C,
    'MaxPresentValue': 0x0041,
    'MinPresentValue': 0x0045,
    'OutOfService': 0x0051,
    'PresentValue': 0x0055,
    'Reliability': 0x0067,
    'Resolution': 0x006A,
    'StatusFlags': 0x006F,
    'EngineeringUnits': 0x0075,
    'ApplicationType': 0x0100
});

zcl.GenAnalogInputBasic.AttrType = {
    Description: 'CHAR_STR',
    MaxPresentValue: 'SINGLE_PREC',
    MinPresentValue: 'SINGLE_PREC',
    OutOfService: 'BOOLEAN',
    PresentValue: 'SINGLE_PREC',
    Reliability: 'ENUM8',
    Resolution: 'SINGLE_PREC',
    StatusFlags: 'BITMAP8',
    EngineeringUnits: 'ENUM16',
    ApplicationType: 'UINT32'
};

/*************************************************************************************************/
/*** General Analog Output (Basic) Cluster                                                     ***/
/*************************************************************************************************/
zcl.GenAnalogOutputBasic.Attr = new Enum({
    'Description': 0x001C,
    'MaxPresentValue': 0x0041,
    'MinPresentValue': 0x0045,
    'OutOfService': 0x0051,
    'PresentValue': 0x0055,
    'PriorityArray': 0x0057,
    'Reliability': 0x0067,
    'RelinquishDefault': 0x0068,
    'Resolution': 0x006A,
    'StatusFlags': 0x006F,
    'EngineeringUnits': 0x0075,
    'ApplicationType': 0x0100
});

zcl.GenAnalogOutputBasic.AttrType = {
    Description: 'CHAR_STR',
    MaxPresentValue: 'SINGLE_PREC',
    MinPresentValue: 'SINGLE_PREC',
    OutOfService: 'BOOLEAN',
    PresentValue: 'SINGLE_PREC',
    PriorityArray: 'ARRAY',
    Reliability: 'ENUM8',
    RelinquishDefault: 'SINGLE_PREC',
    Resolution: 'SINGLE_PREC',
    StatusFlags: 'BITMAP8',
    EngineeringUnits: 'ENUM16',
    ApplicationType: 'UINT32'
};

/*************************************************************************************************/
/*** General Analog Value (Basic) Cluster                                                      ***/
/*************************************************************************************************/
zcl.GenAnalogValueBasic.Attr = new Enum({
    'Description': 0x001C,
    'OutOfService': 0x0051,
    'PresentValue': 0x0055,
    'PriorityArray': 0x0057,
    'Reliability': 0x0067,
    'RelinquishDefault': 0x0068,
    'StatusFlags': 0x006F,
    'EngineeringUnits': 0x0075,
    'ApplicationType': 0x0100
});

zcl.GenAnalogValueBasic.AttrType = {
    Description: 'CHAR_STR',
    OutOfService: 'BOOLEAN',
    PresentValue: 'SINGLE_PREC',
    PriorityArray: 'ARRAY',
    Reliability: 'ENUM8',
    RelinquishDefault: 'SINGLE_PREC',
    StatusFlags: 'BITMAP8',
    EngineeringUnits: 'ENUM16',
    ApplicationType: 'UINT32'
};

/*************************************************************************************************/
/*** General Binary Input (Basic) Cluster                                                      ***/
/*************************************************************************************************/
zcl.GenBinaryInputBasic.Attr = new Enum({
    'ActiveText': 0x0004,
    'Description': 0x001C,
    'InactiveText': 0x002E,
    'OutOfService': 0x0051,
    'Polarity': 0x0054,
    'PresentValue': 0x0055,
    'Reliability': 0x0067,
    'StatusFlags': 0x006F,
    'ApplicationType': 0x0100
});

zcl.GenBinaryInputBasic.AttrType = {
    ActiveText: 'CHAR_STR',
    Description: 'CHAR_STR',
    InactiveText: 'CHAR_STR',
    OutOfService: 'BOOLEAN',
    Polarity: 'ENUM8',
    PresentValue: 'BOOLEAN',
    Reliability: 'ENUM8',
    StatusFlags: 'BITMAP8',
    ApplicationType: 'UINT32'
};

/*************************************************************************************************/
/*** General Binary Output (Basic) Cluster                                                     ***/
/*************************************************************************************************/
zcl.GenBinaryOutputBasic.Attr = new Enum({
    'ActiveText': 0x0004,
    'Description': 0x001C,
    'InactiveText': 0x002E,
    'MinimumOffTime': 0x0042,
    'MinimumOnTime': 0x0043,
    'OutOfService': 0x0051,
    'Polarity': 0x0054,
    'PresentValue': 0x0055,
    'PriorityArray': 0x0057,
    'Reliability': 0x0067,
    'RelinquishDefault': 0x0068,
    'StatusFlags': 0x006F,
    'ApplicationType': 0x0100
});

zcl.GenBinaryOutputBasic.AttrType = {
    ActiveText: 'CHAR_STR',
    Description: 'CHAR_STR',
    InactiveText: 'CHAR_STR',
    MinimumOffTime: 'UINT32',
    MinimumOnTime: 'UINT32',
    OutOfService: 'BOOLEAN',
    Polarity: 'ENUM8',
    PresentValue: 'BOOLEAN',
    PriorityArray: 'ARRAY',
    Reliability: 'ENUM8',
    RelinquishDefault: 'BOOLEAN',
    StatusFlags: 'BITMAP8',
    ApplicationType: 'UINT32'
};

/*************************************************************************************************/
/*** General Binary Value (Basic) Cluster                                                      ***/
/*************************************************************************************************/
zcl.GenBinaryValueBasic.Attr = new Enum({
    'ActiveText': 0x0004,
    'Description': 0x001C,
    'InactiveText': 0x002E,
    'MinimumOffTime': 0x0042,
    'MinimumOnTime': 0x0043,
    'OutOfService': 0x0051,
    'PresentValue': 0x0055,
    'PriorityArray': 0x0057,
    'Reliability': 0x0067,
    'RelinquishDefault': 0x0068,
    'StatusFlags': 0x006F,
    'ApplicationType': 0x0100
});

zcl.GenBinaryValueBasic.AttrType = {
    ActiveText: 'CHAR_STR',
    Description: 'CHAR_STR',
    InactiveText: 'CHAR_STR',
    MinimumOffTime: 'UINT32',
    MinimumOnTime: 'UINT32',
    OutOfService: 'BOOLEAN',
    PresentValue: 'BOOLEAN',
    PriorityArray: 'ARRAY',
    Reliability: 'ENUM8',
    RelinquishDefault: 'BOOLEAN',
    StatusFlags: 'BITMAP8',
    ApplicationType: 'UINT32'
};

/*************************************************************************************************/
/*** General Multistate Input (Basic) Cluster                                                  ***/
/*************************************************************************************************/
zcl.GenMultistateInputBasic.Attr = new Enum({
    'StateText': 0x000E,
    'Description': 0x001C,
    'NumberOfStates': 0x004A,
    'OutOfService': 0x0051,
    'PresentValue': 0x0055,
    'PriorityArray': 0x0057,
    'Reliability': 0x0067,
    'StatusFlags': 0x006F,
    'ApplicationType': 0x0100
});

zcl.GenMultistateInputBasic.AttrType = {
    StateText: 'ARRAY',
    Description: 'CHAR_STR',
    NumberOfStates: 'UINT16',
    OutOfService: 'BOOLEAN',
    PresentValue: 'UINT16',
    PriorityArray: 'ARRAY',
    Reliability: 'ENUM8',
    StatusFlags: 'BITMAP8',
    ApplicationType: 'UINT32'
};

/*************************************************************************************************/
/*** General Multistate Output (Basic) Cluster                                                 ***/
/*************************************************************************************************/
zcl.GenMultistateOutputBasic.Attr = new Enum({
    'StateText': 0x000E,
    'Description': 0x001C,
    'NumberOfStates': 0x004A,
    'OutOfService': 0x0051,
    'PresentValue': 0x0055,
    'PriorityArray': 0x0057,
    'Reliability': 0x0067,
    'RelinquishDefault': 0x0068,
    'StatusFlags': 0x006F,
    'ApplicationType': 0x0100
});

zcl.GenMultistateOutputBasic.AttrType = {
    StateText: 'ARRAY',
    Description: 'CHAR_STR',
    NumberOfStates: 'UINT16',
    OutOfService: 'BOOLEAN',
    PresentValue: 'UINT16',
    PriorityArray: 'ARRAY',
    Reliability: 'ENUM8',
    RelinquishDefault: 'UINT16',
    StatusFlags: 'BITMAP8',
    ApplicationType: 'UINT32'
};

/*************************************************************************************************/
/*** General Multistate Value (Basic) Cluster                                                  ***/
/*************************************************************************************************/
zcl.GenMultistateValueBasic.Attr = new Enum({
    'StateText': 0x000E,
    'Description': 0x001C,
    'NumberOfStates': 0x004A,
    'OutOfService': 0x0051,
    'PresentValue': 0x0055,
    'PriorityArray': 0x0057,
    'Reliability': 0x0067,
    'RelinquishDefault': 0x0068,
    'StatusFlags': 0x006F,
    'ApplicationType': 0x0100
});

zcl.GenMultistateValueBasic.AttrType = {
    StateText: 'ARRAY',
    Description: 'CHAR_STR',
    NumberOfStates: 'UINT16',
    OutOfService: 'BOOLEAN',
    PresentValue: 'UINT16',
    PriorityArray: 'ARRAY',
    Reliability: 'ENUM8',
    RelinquishDefault: 'UINT16',
    StatusFlags: 'BITMAP8',
    ApplicationType: 'UINT32'
};

/*************************************************************************************************/
/*** General Commissioning Clusters                                                            ***/
/*************************************************************************************************/
zcl.GenCommissioning.Attr = new Enum({
    // Startup Parameters Attribute Set - Stack 0x000
    'ShortAddress': 0x0000,
    'ExtendedPANId': 0x0001,
    'PANId': 0x0002,
    'Channelmask': 0x0003,
    'ProtocolVersion': 0x0004,
    'StackProfile': 0x0005,
    'StartupControl': 0x0006,
    // Startup Parameters Attribute Set - Security 0x001
    'TrustCenterAddress': 0x0010,
    'TrustCenterMasterKey': 0x0011,
    'NetworkKey': 0x0012,
    'UseInsecureJoin': 0x0013,
    'PreconfiguredLinkKey': 0x0014,
    'NetworkKeySeqNum': 0x0015,
    'NetworkKeyType': 0x0016,
    'NetworkManagerAddress': 0x0017,
    // Join Parameters Attribute Set 0x002  
    'ScanAttempts': 0x0020,
    'TimeBetweenScans': 0x0021,  
    'RejoinInterval': 0x0022,
    'MaxRejoinInterval': 0x0023, 
    // End Device Parameters Attribute Set 0x003  
    'IndirectPollRate': 0x0030,
    'ParentRetryThreshold': 0x0031,
    // Concentrator Parameters Attribute Set 0x004
    'ConcentratorFlag': 0x0040,
    'ConcentratorRadius': 0x0041,
    'ConcentratorDiscoveryTime': 0x0042
});

zcl.GenCommissioning.AttrType = {
    ShortAddress: 'UINT16',
    ExtendedPANId: 'IEEE_ADDR',
    PANId: 'UINT16',
    Channelmask: 'BITMAP32',
    ProtocolVersion: 'UINT8',
    StackProfile: 'UINT8',
    StartupControl: 'StartupControlAttrValue',    // ENUM8
    TrustCenterAddress: 'IEEE_ADDR',
    TrustCenterMasterKey: '128_BIT_SEC_KEY',
    NetworkKey: '128_BIT_SEC_KEY',
    UseInsecureJoin: 'BOOLEAN',
    PreconfiguredLinkKey: '128_BIT_SEC_KEY',
    NetworkKeySeqNum: 'UINT8',
    NetworkKeyType: 'ENUM8',
    NetworkManagerAddress: 'UINT16',
    ScanAttempts: 'UINT8',
    TimeBetweenScans: 'UINT16',  
    RejoinInterval: 'UINT16',
    MaxRejoinInterval: 'UINT16',
    IndirectPollRate: 'UINT16',
    ParentRetryThreshold: 'UINT8',
    ConcentratorFlag: 'BOOLEAN',
    ConcentratorRadius: 'UINT8',
    ConcentratorDiscoveryTime: 'UINT8'
};

zcl.GenCommissioning.StartupControlAttrValue = new Enum({
    'Option0': 0x00,    // Silent join
    'Option1': 0x01,    // Form network
    'Option2': 0x02,    // Rejoin network
    'Option3': 0x03     // MAC Associate
});

zcl.GenCommissioning.Cmd = new Enum({
    // Commands Received by Commissioning Cluster Server
    'RestartDevice': 0x0000,
    'SaveStartupParams': 0x0001,
    'RestoreStartupParams': 0x0002,
    'ResetStartupParams': 0x0003
});

zcl.GenCommissioning.CmdRsp = new Enum({
    // Commands generated by Commissioning Cluster Server
    'RestartDeviceRsp': 0x0000,
    'SaveStartupParamsRsp': 0x0001,
    'RestoreStartupParamsRsp': 0x0002,
    'ResetStartupParamsRsp': 0x0003
});

zcl.GenCommissioning.RestartDeviceOptionsValue = new Enum({
    // - Startup Mode (bits: 0..2)
    // - Immediate (bit: 3)
    'StartupMode': 0x07,
    'Immediate': 0x08
});

zcl.GenCommissioning.ResetStartupParamsOptionsValue = new Enum({
    // - ResetCurrent (bits: 0)
    // - ResetAll (bit: 1)
    // - EraseIndex (bit: 2)
    'ResetCurrent': 0x01,
    'ResetAll': 0x02,
    'EraseIndex': 0x04
});

zcl.GenCommissioning.StatusValue = new Enum({
    'Success': 0x00,
    'Failure': 0x01,
    'InvalidField': 0x85,
    'InsufficientSpace': 0x89,
    'InconsistentStartupState': 0x90
});

/***                                  CLOSURES SPECIFICATION                                   ***/
/*************************************************************************************************/
/*** Closures Shade Configuration Cluster                                                      ***/
/*************************************************************************************************/
zcl.ClosuresShadeConfig.Attr = new Enum({
    // Shade information Attributes set
    'PhysicalClosedLimit': 0x0000,
    'MotorStepSize': 0x0001,
    'Status': 0x0002,
    // Shade settings Attributes set
    'LosedLimit': 0x0010,
    'Mode': 0x0012
});

zcl.ClosuresShadeConfig.AttrType = {
    PhysicalClosedLimit: 'UINT16',
    MotorStepSize: 'UINT8',
    Status: 'StatusAttrValue',    // BITMAP8
    LosedLimit: 'UINT16',
    Mode: 'ModeAttrValue'         // ENUM8
};

zcl.ClosuresShadeConfig.StatusAttrValue = new Enum({
    'ShadeOperational': 0x01,
    'ShadeAdjusting': 0x02,
    'ShadeDirection': 0x04,
    'ShadeMotorForwardDirection': 0x08
});

zcl.ClosuresShadeConfig.ModeAttrValue = new Enum({
    'Normal': 0x00,
    'Configure': 0x01
});

/*************************************************************************************************/
/*** Closures Door Lock Cluster                                                                ***/
/*************************************************************************************************/
zcl.ClosuresDoorLock.Attr = new Enum({
    'LockState': 0x0000,
    'LockType': 0x0001,
    'ActuatorEnabled': 0x0002,
    'DoorState': 0x0003,
    'DoorOpenEvents': 0x0004,
    'DoorClosedEvents': 0x0005,
    'OpenPeriod': 0x0006,
    // User, PIN, Schedule, & Log Information Attributes
    'NumOfLockRecordsSupported': 0x0010,
    'NumOfTotalUsersSupported': 0x0011,
    'NumOfPinUsersSupported': 0x0012,
    'NumOfRfidUsersSupported': 0x0013,
    'NumOfWeekDaySchedulesSupportedPerUser': 0x0014,
    'NumOfYearDaySchedulesSupportedPerUser': 0x0015,
    'NumOfHolidayScheduledsSupported': 0x0016,
    'MaxPinLen': 0x0017,
    'MinPinLen': 0x0018,
    'MaxRfidLen': 0x0019,
    'MinRfidLen': 0x001A,
    // Operational Settings Attributes
    'Enable_Logging': 0x0020,
    'Language': 0x0021,
    'LedSettings': 0x0022,
    'AutoRelockTime': 0x0023,
    'SoundVolume': 0x0024,
    'OperatingMode': 0x0025,
    'SupportedOperatingModes': 0x0026,
    'DefaultConfigurationRegister': 0x0027,
    'EnableLocalProgramming': 0x0028,
    'EnableOneTouchLocking': 0x0029,
    'EnableInsideStatusLed': 0x002A,
    'EnablePrivacyModeButton': 0x002B,
    // Security Settings Attributes
    'WrongCodeEntryLimit': 0x0030,
    'UserCodeTemporaryDisableTime': 0x0031,
    'SendPinOta': 0x0032,
    'RequirePinForRfOperation': 0x0033,
    'ZigbeeSecurityLevel': 0x0034,
    // Alarm and Event Masks Attributes
    'AlarmMask': 0x0040,
    'KeypadOperationEventMask': 0x0041,
    'RfOperationEventMask': 0x0042,
    'ManualOperationEventMask': 0x0043,
    'RfidOperationEventMask': 0x0044,
    'KeypadProgrammingEventMask': 0x0045,
    'RfProgrammingEventMask': 0x0046,
    'RfidProgrammingEventMask': 0x0047
});

zcl.ClosuresDoorLock.AttrType = {
    LockState: 'LockStateAttrValue',    // ENUM8
    LockType: 'LockTypeAttrValue',      // ENUM8
    ActuatorEnabled: 'BOOLEAN',         // BOOLEAN
    DoorState: 'DoorStateAttrValue',    // ENUM8
    DoorOpenEvents: 'UINT32',
    DoorClosedEvents: 'UINT32',
    OpenPeriod: 'UINT16',
    NumOfLockRecordsSupported: 'UINT16',
    NumOfTotalUsersSupported: 'UINT16',
    NumOfPinUsersSupported: 'UINT16',
    NumOfRfidUsersSupported: 'UINT16',
    NumOfWeekDaySchedulesSupportedPerUser: 'UINT8',
    NumOfYearDaySchedulesSupportedPerUser: 'UINT8',
    NumOfHolidayScheduledsSupported: 'UINT8',
    MaxPinLen: 'UINT8',
    MinPinLen: 'UINT8',
    MaxRfidLen: 'UINT8',
    MinRfidLen: 'UINT8',
    Enable_Logging: 'BOOLEAN',
    Language: 'CHAR_STR',
    LedSettings: 'UINT8',
    AutoRelockTime: 'UINT32',
    SoundVolume: 'UINT8',
    OperatingMode: 'UINT32',
    SupportedOperatingModes: 'BITMAP16',
    DefaultConfigurationRegister: 'BITMAP16',
    EnableLocalProgramming: 'BOOLEAN',
    EnableOneTouchLocking: 'BOOLEAN',
    EnableInsideStatusLed: 'BOOLEAN',
    EnablePrivacyModeButton: 'BOOLEAN',
    WrongCodeEntryLimit: 'UINT8',
    UserCodeTemporaryDisableTime: 'UINT8',
    SendPinOta: 'BOOLEAN',
    RequirePinForRfOperation: 'BOOLEAN',
    ZigbeeSecurityLevel: 'UINT8',
    AlarmMask: 'BITMAP16',
    KeypadOperationEventMask: 'BITMAP16',
    RfOperationEventMask: 'BITMAP16',
    ManualOperationEventMask: 'BITMAP16',
    RfidOperationEventMask: 'BITMAP16',
    KeypadProgrammingEventMask: 'BITMAP16',
    RfProgrammingEventMask: 'BITMAP16',
    RfidProgrammingEventMask: 'BITMAP16'
};

zcl.ClosuresDoorLock.LockStateAttrValue = new Enum({
    'NotFullyLocked': 0x00,
    'Locked': 0x01,
    'Unlocked': 0x02
});

zcl.ClosuresDoorLock.LockTypeAttrValue = new Enum({
    'Deadbolt': 0x00,
    'Magnetic': 0x01,
    'Other': 0x02,
    'Mortise': 0x03,
    'Rim': 0x04,
    'LatchBolt': 0x05,
    'CylindricalLock': 0x06,
    'TubularLock': 0x07,
    'InterconnectedLock': 0x08,
    'DeadLatch': 0x09,
    'DoorFurniture': 0x0A
});

zcl.ClosuresDoorLock.DoorStateAttrValue = new Enum({
    'Open': 0x00,
    'Closed': 0x01,
    'ErrorJammed': 0x02,
    'ErrorForcedOpen': 0x03,
    'ErrorUnspecified': 0x04
});

zcl.ClosuresDoorLock.Cmd = new Enum({
    'LockDoor': 0x00,
    'UnlockDoor': 0x01,
    'ToggleDoor': 0x02,
    'UnlockWithTimeout': 0x03,
    'GetLogRecord': 0x04,
    'SetPinCode': 0x05,
    'GetPinCode': 0x06,
    'ClearPinCode': 0x07,
    'ClearAllPinCodes': 0x08,
    'SetUserStatus': 0x09,
    'GetUserStatus': 0x0A,
    'SetWeekDaySchedule': 0x0B,
    'GetWeekDaySchedule': 0x0C,
    'ClearWeekDaySchedule': 0x0D,
    'SetYearDaySchedule': 0x0E,
    'GetYearDaySchedule': 0x0F,
    'ClearYearDaySchedule': 0x10,
    'SetHolidaySchedule': 0x11,
    'GetHolidaySchedule': 0x12,
    'ClearHolidaySchedule': 0x13,
    'SetUserType': 0x14,
    'GetUserType': 0x15,
    'SetRfidCode': 0x16,
    'GetRfidCode': 0x17,
    'ClearRfidCode': 0x18,
    'ClearAllRfidCodes': 0x19
});

zcl.ClosuresDoorLock.CmdRsp = new Enum({
    'LockDoorRsp': 0x00,
    'UnlockDoorRsp': 0x01,
    'ToggleDoorRsp': 0x02,
    'UnlockWithTimeoutRsp': 0x03,
    'GetLogRecordRsp': 0x04,
    'SetPinCodeRsp': 0x05,
    'GetPinCodeRsp': 0x06,
    'ClearPinCodeRsp': 0x07,
    'ClearAllPinCodesRsp': 0x08,
    'SetUserStatusRsp': 0x09,
    'GetUserStatusRsp': 0x0A,
    'SetWeekDayScheduleRsp': 0x0B,
    'GetWeekDayScheduleRsp': 0x0C,
    'ClearWeekDayScheduleRsp': 0x0D,
    'SetYearDayScheduleRsp': 0x0E,
    'GetYearDayScheduleRsp': 0x0F,
    'ClearYearDayScheduleRsp': 0x10,
    'SetHolidayScheduleRsp': 0x11,
    'GetHolidayScheduleRsp': 0x12,
    'ClearHolidayScheduleRsp': 0x13,
    'SetUserTypeRsp': 0x14,
    'GetUserTypeRsp': 0x15,
    'SetRfidCodeRsp': 0x16,
    'GetRfidCodeRsp': 0x17,
    'ClearRfidCodeRsp': 0x18,
    'ClearAllRfidCodesRsp': 0x19,
    'OperationEventNotification': 0x20,
    'ProgrammingEventNotification': 0X21
});

zcl.ClosuresDoorLock.StatusValue = new Enum({
    'Success': 0x00,
    'Failure': 0x01
});

/*************************************************************************************************/
/*** Closures Window Covering Cluster                                                          ***/
/*************************************************************************************************/
zcl.ClosuresWindowConvering.Attr = new Enum({
    'WindowCoveringType': 0x0000, 
    'PhysicalCloseLimitLiftCm': 0x0001, 
    'PhysicalCloseLimitTiltDdegree': 0x0002, 
    'CurrentPositionLiftCm': 0x0003, 
    'CurrentPositionTiltDdegree': 0x0004, 
    'NumOfActuationLift': 0x0005, 
    'NumOfActuationTilt': 0x0006, 
    'ConfigStatus': 0x0007, 
    'CurrentPositionLiftPercentage': 0x0008, 
    'CurrentPositionTiltPercentage': 0x0009, 
    // Window Covering Setting
    'InstalledOpenLimitLiftCm': 0x0010, 
    'InstalledClosedLimitLiftCm': 0x0011, 
    'InstalledOpenLimitTiltDdegree': 0x0012, 
    'InstalledClosedLimitTiltDdegree': 0x0013, 
    'VelocityLift': 0x0014, 
    'AccelerationTimeLift': 0x0015, 
    'DecelerationTimeLift': 0x0016, 
    'WindowCoveringMode': 0x0017, 
    'IntermediateSetpointsLift': 0x0018, 
    'IntermediateSetpointsTilt': 0x0019 
});

// TODO, AttrType

zcl.ClosuresWindowConvering.Cmd = new Enum({
    'UpOpen': 0x00, 
    'DownClose': 0x01, 
    'Stop': 0x02, 
    // 'GoToLiftSetpoint': 0x03, 
    'GoToLiftValue': 0x04, 
    'GoToLiftPercentage': 0x05, 
    // 'GoToTiltSetpoint': 0x06, 
    'GoToTiltValue': 0x07, 
    'GoToTiltPercentage': 0x08
    // 'ProgramSetpoint': 0x09 
});

/***                                    HVAC SPECIFICATION                                     ***/
/*************************************************************************************************/
/*** HVAC Pump Configuration and Control Cluster                                               ***/
/*************************************************************************************************/
zcl.HvacPumpConfigControl.Attr = new Enum({
    // Pump information Attribute set
    'MaxPressure': 0x0000,
    'MaxSpeed': 0x0001,
    'MaxFlow': 0x0002,
    'MinConstPressure': 0x0003,
    'MaxConstPressure': 0x0004,
    'MinCompPressure': 0x0005,
    'MaxCompPressure': 0x0006,
    'MinConstSpeed': 0x0007,
    'MaxConstSpeed': 0x0008,
    'MinConstFlow': 0x0009,
    'MaxConstFlow': 0x000A,
    'MinConstTemp': 0x000B,
    'MaxConstTemp': 0x000C,
    // Pump Dynamic Information Attribute set
    'PumpStatus': 0x0010,
    'EffectiveOperationMode': 0x0011,
    'EffectiveControlMode': 0x0012,
    'Capacity': 0x0013,
    'Speed': 0x0014,
    'LifetimeRunningHours': 0x0015,
    'Power': 0x0016,
    'LifetimeEnergyConsumed': 0x0017,
    // Pump Settings Attributes set
    'OperationMode': 0x0020,
    'ControlMode': 0x0021,
    'AlarmMask': 0x0022
});

zcl.HvacPumpConfigControl.AttrType = {
    MaxPressure: 'INT16',
    MaxSpeed: 'UINT16',
    MaxFlow: 'UINT16',
    MinConstPressure: 'INT16',
    MaxConstPressure: 'INT16',
    MinCompPressure: 'INT16',
    MaxCompPressure: 'INT16',
    MinConstSpeed: 'UINT16',
    MaxConstSpeed: 'UINT16',
    MinConstFlow: 'UINT16',
    MaxConstFlow: 'UINT16',
    MinConstTemp: 'INT16',
    MaxConstTemp: 'INT16',
    PumpStatus: 'PumpStatusAttrValue',                   // BITMAP16
    EffectiveOperationMode: 'OperationModeAttrValue',    // ENUM8
    EffectiveControlMode: 'ControlModeAttrValue',        // ENUM8
    Capacity: 'INT16',
    Speed: 'UINT16',
    LifetimeRunningHours: 'UINT24',
    Power: 'UINT24',
    LifetimeEnergyConsumed: 'UINT32',
    OperationMode: 'OperationModeAttrValue',             // ENUM8
    ControlMode: 'ControlModeAttrValue',                 // ENUM8
    AlarmMask: 'AlarmMaskAttrValue'                      // BITMAP16
};

zcl.HvacPumpConfigControl.PumpStatusAttrValue = new Enum({
    'DevFault': 0x0000,
    'SupplyFault': 0x0001,
    'SpeedLow': 0x0002,
    'SpeedHigh': 0x0003,
    'LocalOverride': 0x0004,
    'Running': 0x0005,
    'RemotePressure': 0x0006,
    'RemoteFlow': 0x0007,
    'RemoteTemp': 0x0008
});

zcl.HvacPumpConfigControl.OperationModeAttrValue = new Enum({
    'Normal': 0x00,
    'Minimum': 0x01,
    'Maximum': 0x02,
    'Local': 0x03
});

zcl.HvacPumpConfigControl.ControlModeAttrValue = new Enum({
    'ConstantSpeed': 0x00,
    'ConstantPressure': 0x01,
    'ProportionalPressure': 0x02,
    'ConstantFlow': 0x03,
    'ConstantTemp': 0x05,
    'Automatic': 0x07
});

zcl.HvacPumpConfigControl.AlarmMaskAttrValue = new Enum({
    'SupplyVoltageTooLow': 0x0001,
    'SupplyVoltageTooHigh': 0x0002,
    'PowerMissingPhase': 0x0004,
    'SystemPressureTooLow': 0x0008,
    'SystemPressureTooHigh': 0x0010,
    'DryRunning': 0x0020,
    'MotorTemperatureTooHigh': 0x0040,
    'PumpMotorHasFatalFailure': 0x0080,
    'ElectronicTemperatureTooHigh': 0x0100,
    'PumpBlocked': 0x0200,
    'SensorFailure': 0x0400,
    'ElectronicNonFatalFailure': 0x0800,
    'ElectronicFatalFailure': 0x1000,
    'GeneralFault': 0x2000
});

/*************************************************************************************************/
/*** HVAC Thermostat Cluster                                                                   ***/
/*************************************************************************************************/
zcl.HvacThermostat.Attr = new Enum({
    // Thermostat information Attribute set
    'LocalTemp': 0x0000,
    'OutdoorTemp': 0x0001,
    'Ocupancy': 0x0002,
    'AbsMinHeatSetpointLimit': 0x0003,
    'AbsMaxHeatSetpointLimit': 0x0004,
    'AbsMinCoolSetpointLimit': 0x0005,
    'AbsMaxCoolSetpointLimit': 0x0006,
    'PICoolingDemand': 0x0007,
    'PIHeatingDemand': 0x0008,
    'SystemTypeConfig': 0x0009,
    // Thermostat settings Attribute set
    'LocalTemperatureCalibration': 0x0010,
    'OccupiedCoolingSetpoint': 0x0011,
    'OccupiedHeatingSetpoint': 0x0012,
    'UnoccupiedCoolingSetpoint': 0x0013,
    'UnoccupiedHeatingSetpoint': 0x0014,
    'MinHeatSetpointLimit': 0x0015,
    'MaxHeatSetpointLimit': 0x0016,
    'MinCoolSetpointLimit': 0x0017,
    'MaxCoolSetpointLimit': 0x0018,
    'MinSetpointDeadBand': 0x0019,
    'RemoteSensing': 0x001A,
    'CtrlSeqeOfOper': 0x001B,
    'SystemMode': 0x001C,
    'AlarmMask': 0x001D,
    'RunningMode': 0x001E,
    // Thermostat Schedule & HVAC Relay Attribute Set
    'StartOfWeek': 0x0020,
    'NumberOfWeeklyTrans': 0x0021,
    'NumberOfDailyTrans': 0x0022,
    'TempSetpointHold': 0x0023,
    'TempSetpointHoldDuration': 0x0024,
    'ProgramingOperMode': 0x0025,
    'RunningState': 0x0029,
    // Thermostat Setpoint Change Tracking Attribute Set
    'SetpointChangeSource': 0x0030,
    'SetpointChangeAmount': 0x0031,
    'SetpointChangeSourceTimeStamp': 0x0032,
    // Thermostat AC Information Attribute Set
    'AcType': 0x0040,
    'AcCapacity': 0x0041,
    'AcRefrigerantType': 0x0042,
    'AcConpressorType': 0x0043,
    'AcErrorCode': 0x0044,
    'AcLouverPosition': 0x0045,
    'AcCollTemp': 0x0046,
    'AcCapacityFormat': 0x0047
});

zcl.HvacThermostat.AttrType = {
    LocalTemp: 'INT16',
    OutdoorTemp: 'INT16',
    Ocupancy: 'OcupancyAttrValue',                //  BITMAP8
    AbsMinHeatSetpointLimit: 'INT16',
    AbsMaxHeatSetpointLimit: 'INT16',
    AbsMinCoolSetpointLimit: 'INT16',
    AbsMaxCoolSetpointLimit: 'INT16',
    PICoolingDemand: 'UINT8',
    PIHeatingDemand: 'UINT8',
    SystemTypeConfig: 'BITMAP8',
    LocalTemperatureCalibration: 'INT8',
    OccupiedCoolingSetpoint: 'INT16',
    OccupiedHeatingSetpoint: 'INT16',
    UnoccupiedCoolingSetpoint: 'INT16',
    UnoccupiedHeatingSetpoint: 'INT16',
    MinHeatSetpointLimit: 'INT16',
    MaxHeatSetpointLimit: 'INT16',
    MinCoolSetpointLimit: 'INT16',
    MaxCoolSetpointLimit: 'INT16',
    MinSetpointDeadBand: 'INT8',
    RemoteSensing: 'RemoteSensingAttrValue',      // BITMAP8
    CtrlSeqeOfOper: 'CtrlSeqeOfOperAttrValue',    // ENUM8
    SystemMode: 'SystemModeAttrValue',            // ENUM8
    AlarmMask: 'AlarmMaskAttrValue',              // BITMAP8
    RunningMode: 'RunningModeAttrValue',
    StartOfWeek: 'StartOfWeekAttrValue',
    NumberOfWeeklyTrans: 'UINT8',
    NumberOfDailyTrans: 'UINT8',
    TempSetpointHold: 'TempSetpointHoldAttrValue',
    TempSetpointHoldDuration: 'UINT16',
    ProgramingOperMode: 'BITMAP8',
    RunningState: 'RunningStateAttrValue',
    SetpointChangeSrc: 'SetpointChangeSrcAttrValue',
    SetpointChangeAmount: 'INT16',
    SetpointChangeSrcTimeStamp: 'UTC',
    AcType: 'AcTypeAttrValue',
    AcCapacity: 'UINT16',
    AcRefrigerantType: 'AcRefrigerantTypeAttrValue',
    AcConpressorType: 'AcConpressorTypeAttrValue',
    AcErrorCode: 'BITMAP32',
    AcLouverPosition: 'AcLouverPositionAttrValue',
    AcCollTemp: 'INT16',
    AcCapacityFormat: 'AcCapacityFormatAttrValue'
};

zcl.HvacThermostat.OcupancyAttrValue = new Enum({
    'Unoccupied': 0x00,
    'Occupied': 0x01
});

zcl.HvacThermostat.RemoteSensingAttrValue = new Enum({
    'LocalTemp': 0x01,
    'OutdoorTemp': 0x02,
    'Occupancy': 0x04
});

zcl.HvacThermostat.CtrlSeqeOfOperAttrValue = new Enum({
    'CoolingOnly': 0x00,
    'CoolingWithReheat': 0x01,
    'HeatingOnly': 0x02,
    'HeatingWithReheat': 0x03,
    'CoolingandHeating': 0x04,
    'CoolingAndHeatingWithReheat': 0x05
});

zcl.HvacThermostat.SystemModeAttrValue = new Enum({
    'Off': 0x00,
    'Auto': 0x01,
    'Cool': 0x03,
    'Heat': 0x04,
    'EmergencyHeating': 0x05,
    'Precooling': 0x06,
    'FanOnly': 0x07,
    'Dry':0x08,
    'Sleep':0x09
});

zcl.HvacThermostat.AlarmMaskAttrValue = new Enum({
    'InitializationFail': 0x01,  
    'HardwareFail': 0x02,
    'SelfCalibrationFail': 0x03
});

zcl.HvacThermostat.RunningStateAttrValue = new Enum({
    'Heat1stStageOn': 0x0001,
    'Cool1stStageOn': 0x0002,
    'Fan1stStageOn': 0x0004,
    'Heat2ndStageOn': 0x0008,
    'Cool2ndStageOn': 0x0010,
    'Fan2ndStageOn': 0x0020,
    'Heat3rdStageOn': 0x0040,
    'Cool3rdStageOn': 0x0080,
    'Fan3rdStageOn': 0x0100
});

zcl.HvacThermostat.RunningModeAttrValue = new Enum({
    'Off': 0x00,
    'Cool': 0x03,
    'Heat': 0x04
});

zcl.HvacThermostat.StartOfWeekAttrValue = new Enum({
    'Sunday': 0x00,
    'Monday': 0x01,
    'Tuesday': 0x02,
    'Wednesday': 0x03,
    'Thursday': 0x04,
    'Friday': 0x05,
    'Saturday': 0x06
});

zcl.HvacThermostat.TempSetpointHoldAttrValue = new Enum({
    'Off': 0x00,
    'On': 0x01
});

zcl.HvacThermostat.SetpointChangeSrcAttrValue = new Enum({
    'Manual': 0x00,
    'Schedule': 0x01,
    'External': 0x02
});

zcl.HvacThermostat.AcTypeAttrValue = new Enum({
    'CoolAndFixSpeed': 0x01,
    'HeatPumpAndFixSpeed': 0x02,
    'CoolAndInverter': 0x03,
    'HeatPumpAndInverter': 0x04
});

zcl.HvacThermostat.AcRefrigerantTypeAttrValue = new Enum({
    'R22': 0x01,
    'R410a': 0x02,
    'R407c': 0x03
});

zcl.HvacThermostat.AcConpressorTypeAttrValue = new Enum({
    'T1': 0x01,
    'T2': 0x02,
    'T3': 0x03
});

zcl.HvacThermostat.AcLouverPositionAttrValue = new Enum({
    'FullyClosed': 0x01,
    'FullyOpen': 0x02,
    'QuarterOpen': 0x03,
    'HalfOpen': 0x04,
    '3QuartersOpen': 0x05
});

zcl.HvacThermostat.AcCapacityFormatAttrValue = new Enum({
    'Btuh': 0x00
});

zcl.HvacThermostat.Cmd = new Enum({
    'SetpointRaiseLower': 0x00,
    'SetWeeklySchedule': 0x01,
    'GetWeeklySchedule': 0x02,
    'ClearWeeklySchedule': 0x03,
    'GetRelayStatusLog': 0x04
});

zcl.HvacThermostat.CmdRsp = new Enum({
    'GetWeeklyScheduleRsp': 0x00,
    'GetRelayStatusLogRsp': 0x01
});

zcl.HvacThermostat.ModeValue = new Enum({
    'Heat': 0x00,
    'Cool': 0x01,
    'Both': 0x02
});

/*************************************************************************************************/
/*** HVAC Fan Control Cluster                                                                  ***/
/*************************************************************************************************/
zcl.HvacFanControl.Attr = new Enum({
    // Fan Control Attribute set
    'FanMode': 0x0000,
    'FanModeSequence': 0x0001
});

zcl.HvacFanControl.AttrType = {
    FanMode: 'FanModeAttrValue',              // ENUM8
    FanModeSequence: 'FanModeSeqAttrValue'    // ENUM8
};

zcl.HvacFanControl.FanModeAttrValue = new Enum({
    'Off': 0x00, 
    'Low': 0x01,
    'Medium': 0x02,
    'High': 0x03,
    'On': 0x04,
    'Auto': 0x05,
    'Smart': 0x06
});

zcl.HvacFanControl.FanModeSeqAttrValue = new Enum({
    'LowMedHigh': 0x00, 
    'LowHigh': 0x01,
    'LowMedHighAuto': 0x02,
    'LowHighAuto': 0x03,
    'OnAuto': 0x04 
});

/*************************************************************************************************/
/*** HVAC Dehumidifcation Control Cluster                                                      ***/
/*************************************************************************************************/
zcl.HvacDihumidificationControl.Attr = new Enum({
    // Dehumidifcation Control Information Attribute set
    'RelativeHumidity': 0x0000,
    'DehumidCooling': 0x0001,
    // Dehumidifcation Control Settings Attribute set
    'RHDehumidSetpoint': 0x0010,
    'RelativeHumidityMode': 0x0011,
    'DehumidLockout': 0x0012,
    'DehumidHysteresis': 0x0013,
    'DehumidMaxCool': 0x0014,
    'RelativeHumidDisplay': 0x0015
});

zcl.HvacDihumidificationControl.AttrType = {
    RelativeHumidity: 'UINT8',
    DehumidCooling: 'UINT8',
    RHDehumidSetpoint: 'UINT8',
    RelativeHumidityMode: 'RelativeHumidityModeAttrValue',    // ENUM8
    DehumidLockout: 'DehumidLockoutAttrValue',                // ENUM8
    DehumidHysteresis: 'UINT8',
    DehumidMaxCool: 'UINT8',
    RelativeHumidDisplay: 'RelativeHumidDisplayAttrValue'     // ENUM8
};

zcl.HvacDihumidificationControl.RelativeHumidityModeAttrValue = new Enum({
    'MeasuredLocally': 0x00,
    'UpdatedOverNet': 0x01
});

zcl.HvacDihumidificationControl.DehumidLockoutAttrValue = new Enum({
    'DehimidNotAllowed': 0x00,
    'DehimidAllowed': 0x01
});

zcl.HvacDihumidificationControl.RelativeHumidDisplay = new Enum({
    'NotDisplayed': 0x00,
    'Displayed': 0x01,
});

/*************************************************************************************************/
/*** HVAC Thermostat User Interface Configuration Cluster                                      ***/
/*************************************************************************************************/
zcl.HvacUserInterfaceConfig.Attr = new Enum({
    // Thermostat User Interface Config Attribute set
    'TempDisplayMode': 0x0000,
    'KeypadLockout': 0x0001,
    'ProgrammingVisibility': 0x0002 
});

zcl.HvacUserInterfaceConfig.AttrType = {
    TempDisplayMode: 'TempDisplayModeAttrValue',               // ENUM8
    KeypadLockout: 'KeypadLockoutAttrValue',                   // ENUM8
    ProgrammingVisibility: 'ProgrammingVisibilityAttrValue'    // ENUM8
};

zcl.HvacUserInterfaceConfig.TempDisplayModeAttrValue = new Enum({
    'ModeInC': 0x00,
    'ModeInF': 0x01
});

zcl.HvacUserInterfaceConfig.TempDisplayModeAttrValue = new Enum({
    'NoLockout': 0x00,
    'Level1Lockout': 0x01,
    'Level2Lockout': 0x02,
    'Level3Lockout': 0x03,
    'Level4Lockout': 0x04,
    'Level5Lockout': 0x05
});

zcl.HvacUserInterfaceConfig.ProgrammingVisibilityAttrValue = new Enum({
    'Enable': 0x00,
    'Disabled': 0x01
});

/***                                  LIGHTING SPECIFICATION                                   ***/
/*************************************************************************************************/
/*** Lighting Color Control Cluster                                                            ***/
/*************************************************************************************************/
zcl.LightingColorControl.Attr = new Enum({
    // Color Information Attributes set
    'CurrentHue': 0x0000,
    'CurrentSaturation': 0x0001,
    'RemainingTime': 0x0002,
    'CurrentX': 0x0003,
    'CurrentY': 0x0004,
    'DriftCompensation': 0x0005,
    'CompensationText': 0x0006,
    'ColorTemperature': 0x0007,
    'ColorMode': 0x0008,
    // Defined Primaries Inofrmation Attribute Set
    'NumPrimaries': 0x0010,
    'Primary1X': 0x0011,
    'Primary1Y': 0x0012,
    'Primary1Intensity': 0x0013,
    'Primary2X': 0x0015,
    'Primary2Y': 0x0016,
    'Primary2Intensity': 0x0017,
    'Primary3X': 0x0019,
    'Primary3Y': 0x001a,
    'Primary3Intensity': 0x001b,
    // Additional Defined Primaries Information Attribute set
    'Primary4X': 0x0020,
    'Primary4Y': 0x0021,
    'Primary4Intensity': 0x0022,
    'Primary5X': 0x0024,
    'Primary5Y': 0x0025,
    'Primary5Intensity': 0x0026,
    'Primary6X': 0x0028,
    'Primary6Y': 0x0029,
    'Primary6Intensity': 0x002a,
    // Defined Color Points Settings Attribute set
    'WhitePointX': 0x0030,
    'WhitePointY': 0x0031,
    'ColorPointRX': 0x0032,
    'ColorPointRY': 0x0033,
    'ColorPointRIntensity': 0x0034,
    'ColorPointGX': 0x0036,
    'ColorPointGY': 0x0037,
    'ColorPointGIntensity': 0x0038,
    'ColorPointBX': 0x003a,
    'ColorPointBY': 0x003b,
    'ColorPointBIntensity': 0x003c,
    // TODO
    'EnhancedCurrentHue': 0x4000,
    'EnhancedColorMode': 0x4001,
    'ColorLoopActive': 0x4002,
    'ColorLoopDirection': 0x4003,
    'ColorLoopTime': 0x4004,
    'ColorLoopStartEnhancedHue': 0x4005,
    'ColorLoopStoredEnhancedHue': 0x4006,
    'ColorCapabilities': 0x400A,
});

zcl.LightingColorControl.AttrType = {
    CurrentHue: 'UINT8',
    CurrentSaturation: 'UINT8',
    RemainingTime: 'UINT16',
    CurrentX: 'UINT16',
    CurrentY: 'UINT16',
    DriftCompensation: 'DriftCompensationAttrValue',    // ENUM8
    CompensationText: 'CHAR_STR',
    ColorTemperature: 'UINT16',
    ColorMode: 'ColorModeAttrValue',                    // ENUM8
    NumPrimaries: 'UINT8',
    Primary1X: 'UINT16',
    Primary1Y: 'UINT16',
    Primary1Intensity: 'UINT8',
    Primary2X: 'UINT16',
    Primary2Y: 'UINT16',
    Primary2Intensity: 'UINT8',
    Primary3X: 'UINT16',
    Primary3Y: 'UINT16',
    Primary3Intensity: 'UINT8',
    Primary4X: 'UINT16',
    Primary4Y: 'UINT16',
    Primary4Intensity: 'UINT8',
    Primary5X: 'UINT16',
    Primary5Y: 'UINT16',
    Primary5Intensity: 'UINT8',
    Primary6X: 'UINT16',
    Primary6Y: 'UINT16',
    Primary6Intensity: 'UINT8',
    WhitePointX: 'UINT16',
    WhitePointY: 'UINT16',
    ColorPointRX: 'UINT16',
    ColorPointRY: 'UINT16',
    ColorPointRIntensity: 'UINT8',
    ColorPointGX: 'UINT16',
    ColorPointGY: 'UINT16',
    ColorPointGIntensity: 'UINT8',
    ColorPointBX: 'UINT16',
    ColorPointBY: 'UINT16',
    ColorPointBIntensity: 'UINT8'
};

zcl.LightingColorControl.DriftCompensationAttrValue = new Enum({
    'None': 0x00,
    'OtherUnknown': 0x01,
    'TemperatureMonitoring': 0x02,
    'OpticalLuminMonitorFeedback': 0x03,
    'OpticalColorMonitorFeedback': 0x04
});

zcl.LightingColorControl.ColorModeAttrValue = new Enum({
    'CurrentHueSaturation': 0x00,
    'CurrentXY': 0x01,
    'ColorTemp': 0x02
});

zcl.LightingColorControl.Cmd = new Enum({
    'MoveToHue': 0x00,
    'MoveHue': 0x01,
    'StepHue': 0x02,
    'MoveToSaturation': 0x03,
    'MoveSaturation': 0x04,
    'StepSaturation': 0x05,
    'MoveToHueAndSaturation': 0x06,
    'MoveToColor': 0x07,
    'MoveColor': 0x08,
    'StepColor': 0x09,
    'MoveToColorTemp': 0x0a,
    'EnhancedMoveToHue': 0x40,
    'EnhancedMoveHue': 0x41,
    'EnhancedStepHue': 0x42,
    'EnhancedMoveToHueAndSaturation': 0x43,
    'ColorLoopSet': 0x44,
    'StopMoveStep': 0x47,
});

zcl.LightingColorControl.DirectionValue = new Enum({
    'ShortestDistance': 0x00,
    'LongestDistance': 0x01,
    'Up': 0x02,
    'Down': 0x03
});

zcl.LightingColorControl.MoveModeValue = new Enum({
    'Stop': 0x00,
    'Up': 0x01,
    'Down': 0x03
});

zcl.LightingColorControl.StepModeValue = new Enum({
    'Up': 0x01,
    'Down': 0x03
});

/*************************************************************************************************/
/*** Lighting Ballast Configuration Cluster                                                    ***/
/*************************************************************************************************/
zcl.LightingBallastConfig.Attr = new Enum({
    // Ballast Information Attribute set
    'PhysicalMinLevel': 0x0000,
    'PhysicalMaxLevel': 0x0001,
    'BallastStatus': 0x0002,
    // Ballast Settings Attributes set
    'MinLevel': 0x0010,
    'MaxLevel': 0x0011,
    'PowerOnLevel': 0x0012,
    'PowerOnFadeTime': 0x0013,
    'IntrinsicBallastFactor': 0x0014,
    'BallastFactorAdjustment': 0x0015,
    // Lamp Information Attributes set
    'LampQuantity': 0x0020,
    // Lamp Settings Attributes set
    'LampType': 0x0030,
    'LampManufacturer': 0x0031,
    'LampRatedHours': 0x0032,
    'LampBurnHours': 0x0033,
    'LampAlarmMode': 0x0034,
    'LampBurnHoursTripPoint': 0x0035
});

zcl.LightingBallastConfig.AttrType = {
    PhysicalMinLevel: 'UINT8',
    PhysicalMaxLevel: 'UINT8',
    BallastStatus: 'BallastStatusAddrValue',    // BITMAP8
    MinLevel: 'UINT8',
    MaxLevel: 'UINT8',
    PowerOnLevel: 'UINT8',
    PowerOnFadeTime: 'UINT16',
    IntrinsicBallastFactor: 'UINT8',
    BallastFactorAdjustment: 'UINT8',
    LampQuantity: 'UINT8',
    LampType: 'CHAR_STR',
    LampManufacturer: 'CHAR_STR',
    LampRatedHours: 'UINT24',
    LampBurnHours: 'UINT24',
    LampAlarmMode: 'LampAlarmModeAddrValue',    // BITMAP8
    LampBurnHoursTripPoint: 'UINT24'
};

zcl.LightingBallastConfig.BallastStatusAddrValue = new Enum({
    'NonOperational': 0x01,    // bit 0 is set
    'LampNotInSocket': 0x02    // bit 1 is set
});

zcl.LightingBallastConfig.LampAlarmModeAddrValue = new Enum({
    'Bit0NoAlarm': 0x01,
    'Bit0Alarm': 0x02  
});

/***                           MEASUREMENT AND SENSING SPECIFICATION                           ***/
/*************************************************************************************************/
/*** MS Illuminance Measurement Cluster                                                        ***/
/*************************************************************************************************/
zcl.MsIlluminanceMeasurement.Attr = new Enum({
    // Illuminance Measurement Information Attribute set
    'MeasuredValue': 0x0000,
    'MinMeasuredValue': 0x0001,
    'MaxMeasuredValue': 0x0002,
    'Tolerance': 0x0003,
    'LightSensorType': 0x0004
});

zcl.MsIlluminanceMeasurement.AttrType = {
    MeasuredValue: 'UINT16',
    MinMeasuredValue: 'UINT16',
    MaxMeasuredValue: 'UINT16',
    Tolerance: 'UINT16',
    LightSensorType: 'LightSensorTypeAttrValue'    //ENUM8
};

zcl.MsIlluminanceMeasurement.LightSensorTypeAttrValue = new Enum({
    'Photodiode': 0x00,
    'CMOS': 0x01,
    'Unknown': 0xFF
});

/*************************************************************************************************/
/*** MS Illuminance Level Sensing Cluster                                                      ***/
/*************************************************************************************************/
zcl.MsIlluminanceLevelSensingConfig.Attr = new Enum({
    // Illuminance Level Sensing Information Attribute set
    'LevelStatus': 0x0000,
    'LightSensorType': 0x0001,
    // Illuminance Level Sensing Settings Attribute set
    'IlluminanceTargetLevel': 0x0010
});

zcl.MsIlluminanceLevelSensingConfig.AttrType = {
    LevelStatus: 'LevelStatusAttrValue',            // ENUM8
    LightSensorType: 'LightSensorTypeAttrValue',    // ENUM8
    IlluminanceTargetLevel: 'UINT16'
};

zcl.MsIlluminanceLevelSensingConfig.LevelStatusAttrValue = new Enum({
    'IlluminanceOnTarget': 0x00,
    'IlluminanceBelowTarget': 0x01,
    'IlluminancAboveTarget': 0x02
});

zcl.MsIlluminanceLevelSensingConfig.LightSensorTypeAttrValue = new Enum({
    'Photodiode': 0x00,
    'CMOS': 0x01,
    'Unknown': 0xFF
});

/*************************************************************************************************/
/*** MS Temperature Measurement Cluster                                                        ***/
/*************************************************************************************************/
zcl.MsTemperatureMeasurement.Attr = new Enum({
    // Temperature Measurement Information Attributes set
    'MeasuredValue': 0x0000,
    'MinMeasuredValue': 0x0001,
    'MaxMeasuredValue': 0x0002,
    'Tolerance': 0x0003,
    // Temperature Measurement Settings Attributes set
    'MinPercentChange': 0x0010,
    'MinAbsoluteChange': 0x0011
});

zcl.MsTemperatureMeasurement.AttrType = {
    MeasuredValue: 'INT16',
    MinMeasuredValue: 'INT16',
    MaxMeasuredValue: 'INT16',
    Tolerance: 'UINT16',
    MinPercentChange: 'TODO',
    MinAbsoluteChange: 'TODO'
};

/*************************************************************************************************/
/*** MS Pressure Measurement Cluster                                                           ***/
/*************************************************************************************************/
zcl.MsPressureMeasurement.Attr = new Enum({
    // Pressure Measurement Information Attribute set
    'MeasuredValue': 0x0000,
    'MinMeasuredValue': 0x0001,
    'MaxMeasuredValue': 0x0002,
    'Tolerance': 0x0003
});

zcl.MsPressureMeasurement.AttrType = {
    MeasuredValue: 'INT16',
    MinMeasuredValue: 'INT16',
    MaxMeasuredValue: 'INT16',
    Tolerance: 'UINT16' 
};

/*************************************************************************************************/
/***MS Flow Measurement Cluster                                                                ***/
/*************************************************************************************************/
zcl.MsFlowMeasurement.Attr = new Enum({
    // Flow Measurement Information Attribute set
    'MeasuredValue': 0x0000,
    'MinMeasuredValue': 0x0001,
    'MaxMeasuredValue': 0x0002,
    'Tolerance': 0x0003
});

zcl.MsFlowMeasurement.AttrType = {
    MeasuredValue: 'UINT16',
    MinMeasuredValue: 'UINT16',
    MaxMeasuredValue: 'UINT16',
    Tolerance: 'UINT16'
};

/*************************************************************************************************/
/*** MS Relative Humidity Measurement Cluster                                                  ***/
/*************************************************************************************************/
zcl.MsRelativeHumidity.Attr = new Enum({
  // Relative Humidity Information Attribute set
    'MeasuredValue': 0x0000,
    'MinMeasuredValue': 0x0001,
    'MaxMeasuredValue': 0x0002,
    'Tolerance': 0x0003
});

zcl.MsRelativeHumidity.AttrType = {
    MeasuredValue: 'UINT16',
    MinMeasuredValue: 'UINT16',
    MaxMeasuredValue: 'UINT16',
    Tolerance: 'UINT16'
};

/*************************************************************************************************/
/*** MS Occupancy Sensing Cluster                                                              ***/
/*************************************************************************************************/
zcl.MsOccupancySensing.Attr = new Enum({
    // Occupancy Sensor Configuration Attribute set
    'Occupancy': 0x0000,
    'OccupancySensorType': 0x0001,
    // PIR Configuration Attribute set
    'PIROToUDelay': 0x0010,
    'PIRUToODelay': 0x0011,
    'PIRUToOThreshold': 0x0012,
    // Ultrasonic Configuration Attribute set
    'UltrasonicOToUDelay': 0x0020,
    'UltrasonicUToODelay': 0x0021,
    'UltrasonicUToOThreshold': 0x0022
});

zcl.MsOccupancySensing.AttrType = {
    Occupancy: 'OccupancyAttrValue',                        // BITMAP8
    OccupancySensorType: 'OccupancySensorTypeAttrValue',    // ENUM8
    PIROToUDelay: 'UINT16',
    PIRUToODelay: 'UINT16',
    PIRUToOThreshold: 'UINT8',
    UltrasonicOToUDelay: 'UINT16',
    UltrasonicUToODelay: 'UINT16',
    UltrasonicUToOThreshold: 'UINT8'
};

zcl.MsOccupancySensing.OccupancyAttrValue = new Enum({
    'Occupied,': 0x00,
    'Unoccupied': 0x01
});

zcl.MsOccupancySensing.OccupancySensorTypeAttrValue = new Enum({
    'PIR': 0x00,
    'Ultrasonic': 0x01,
    'PIRAndUltrasonic': 0x02
});

/***                             SECURITY AND SAFETY SPECIFICATION                             ***/
/*************************************************************************************************/
/*** SS IAS Zone Cluster                                                                       ***/
/*************************************************************************************************/
zcl.SsIasZone.Attr = new Enum({
    // Zone Information Attributes set
    'ZoneState': 0x0000,
    'ZoneType': 0x0001,
    'ZoneStatus': 0x0002,
    // Zone Settings Attributes set
    'IasCieAddr': 0x0010,
    'ZoneId': 0x0011,
    'NumZoneSensitivityLevelsSupported': 0x0012,
    'CurrentZoneSensitivityLevel': 0x0013
});

zcl.SsIasZone.AttrType = {
    // Zone Information Attributes set
    ZoneState: 'ZoneStateAttrValue',      // ENUM8
    ZoneType: 'ZoneTypeAttrValue',        // ENUM16
    ZoneStatus: 'ZoneStatusAttrValue',    // BITMAP16
    // Zone Settings Attributes set
    IasCieAddr: 'IEEE_ADDR',
    ZoneId: 'UINT8',
    NumZoneSensitivityLevelsSupported: 'UINT8',
    CurrentZoneSensitivityLevel: 'UINT8'
};

zcl.SsIasZone.ZoneStateAttrValue = new Enum({
    'NotEnrolled': 0x00,
    'Enrolled': 0x01
});

zcl.SsIasZone.ZoneTypeAttrValue = new Enum({
    'StandardCIE': 0x0000,                // [Alarm1, Alarm2] = [System Alarm, -]
    'MotionSensor': 0x000D,               // [Alarm1, Alarm2] = [Intrusion indication, Presence indication]
    'ContactSwitch': 0x0015,              // [Alarm1, Alarm2] = [1st portal Open-Close, 2nd portal Open-Close]
    'FireSensor': 0x0028,                 // [Alarm1, Alarm2] = [Fire indication, -]
    'WaterSensor': 0x002A,                // [Alarm1, Alarm2] = [Water overflow indication, -]
    'GasSensor': 0x002B,                  // [Alarm1, Alarm2] = [CO indication, Cooking indication]
    'PersonalEmergencyDev': 0x002C,       // [Alarm1, Alarm2] = [Fall/Concussion, Emergency button]
    'VibrationMovementSensor': 0x002D,    // [Alarm1, Alarm2] = [Movement indication, Vibration]
    'RemoteControl': 0x010F,              // [Alarm1, Alarm2] = [Panic, Emergency]
    'KeyFob': 0x0115,                     // [Alarm1, Alarm2] = [Panic, Emergency]
    'KeyPad': 0x021D,                     // [Alarm1, Alarm2] = [Panic, Emergency]
    'StandardWarningDev': 0x0225,         // [Alarm1, Alarm2] = [-, -]
    'GlassBreakSensor': 0x0226,           // [Alarm1, Alarm2] = [-, -]
    'SecurityRepeater': 0x0229,           // [Alarm1, Alarm2] = [-, -]
    // Other values < 0x7fff Reserved    
    // 0x8000-0xfffe Reserved for manufacturer specific types
    'InvalidZoneType': 0xFFFF             // [Alarm1, Alarm2] = [-, -]
});

zcl.SsIasZone.ZoneStatusAttrValue = new Enum({
    'Alarm1': 0x0001,
    'Alarm2': 0x0002,
    'Tamper': 0x0004,
    'Battery': 0x0008,
    'SupervisionReports': 0x0010,
    'RestoreReports': 0x0020,
    'Trouble': 0x0040,
    'AC': 0x0080
});

zcl.SsIasZone.Cmd = new Enum({
    'EnrollRsp': 0x00,
    // 'InitNormalOpMode': 0x01,
    // 'InitTestMode': 0x02
});

zcl.SsIasZone.CmdRsp = new Enum({
    'StatusChangeNotification': 0x00,
    'EnrollReq': 0x01
});

zcl.SsIasZone.EnrollRspCodeValue = new Enum({
    'Success': 0x00,
    'NotSupported': 0x01,
    'NoEnrollPermit': 0x02,
    'TooManyZones ': 0x03
});

/*************************************************************************************************/
/*** SS IAS ACE Cluster                                                                        ***/
/*************************************************************************************************/
zcl.SsIasAce.Cmd = new Enum({
    // command IDs received by Server
    'Arm': 0x00,  
    'Bypass': 0x01, 
    'Emergency': 0x02,  
    'Fire': 0x03,  
    'Panic': 0x04,  
    'GetZoneIDMap': 0x05,  
    'GetZoneInfo': 0x06,
    'GetPanelStatus': 0x07,
    'GetBypassedZoneList': 0x08,
    'GetZoneStatus': 0x09
});

zcl.SsIasAce.CmdRsp = new Enum({ 
    // Cmds, generated by Server
    'ArmRsp': 0x00,
    'GetZoneIDMapRsp': 0x01, 
    'GetZoneInfoRsp': 0x02,
    'ZoneStatusChanged': 0x03,
    'PanelStatusChanged': 0x04,
    'GetPanelStatusRsp': 0x05,
    'SetBypassedZoneList': 0x06,
    'BypassRsp': 0x07,
    'GetZoneStatusRsp': 0x08,
});

zcl.SsIasAce.ArmModeValue = new Enum({
    'Disarm': 0x00,
    'ArmDayHomeZonesOnly': 0x01,
    'ArmNightSleepZonesOnly': 0x02,
    'ArmAllZones': 0x03
});

zcl.SsIasAce.ArmNotificationValue = new Enum({
    'AllZonesDisarmed': 0x00,
    'OnlyDayHomeZonesArmed': 0x01,
    'OnlyNightSleepZonesArmed': 0x02,
    'AllZonesArmed': 0x03
});

/*************************************************************************************************/
/*** SS IAS WD Cluster                                                                         ***/
/*************************************************************************************************/
zcl.SsIasWd.Attr = new Enum({
    // Maximum Duration Attribute
    'MaxDuration': 0x0000
});

zcl.SsIasWd.AttrType = {
    MaxDuration: 'UINT16'
};

zcl.SsIasWd.Cmd = new Enum({
    'StartWarning': 0x00,
    'Squawk': 0x01
});

zcl.SsIasWd.WarningModeValue = new Enum({
    'Stop': 0,
    'Burglar': 1,
    'Fire': 2,
    'Emergency': 3
});
zcl.SsIasWd.StartWarningStrobeValue = new Enum({
    'NoStrobe': 0,
    'UseStrobeInParallelToWarning': 1
});

zcl.SsIasWd.SquawkModeValue = new Enum({
    'SystemAlarmedNotificationSound': 0,
    'SystemDisarmedNotificationSound': 1
});
zcl.SsIasWd.SquawkStrobeValue = new Enum({
    'NoStrobe': 0,
    'UseStrobeBlinkInParallelToSquawk': 1
});
zcl.SsIasWd.SquawkLevelValue = new Enum({
    'LowLevelSound': 0,
    'MediumLevelSound': 1,
    'HighLevelSound': 2,
    'VeryHighLevelSound': 3
});

/***                             PROTOCOL INTERFACES SPECIFICATION                             ***/
/*************************************************************************************************/
/*** PI Generic Tunnel Cluster                                                                 ***/
/*************************************************************************************************/
zcl.PiGenericTunnel.Attr = new Enum({
    // Attributes of the Generic Tunnel cluster
    'MaxIncomeTransSize': 0x0001,
    'MaxOutgoTransSize': 0x0002,
    'ProtocolAddr': 0x0003
});

zcl.PiGenericTunnel.AttrType = {
    MaxIncomeTransSize: 'UINT16',
    MaxOutgoTransSize: 'UINT16',
    ProtocolAddr: 'OCTET_STR'
};

zcl.PiGenericTunnel.Cmd = new Enum({
    'MatchProtocolAddr': 0x00
});

zcl.PiGenericTunnel.CmdRsp = new Enum({
    'MatchProtocolAddrRsp': 0x00,
    'AdvertiseProtocolAddr': 0x01
});

/*************************************************************************************************/
/*** PI BACnet Protocol Tunnel Cluster                                                         ***/
/*************************************************************************************************/
zcl.PiBacnetProtocolTunnel.Cmd = new Enum({
    // Command IDs for the BACnet Protocol Tunnel Cluster
    'TransferNPDU': 0x00
});

/*************************************************************************************************/
/*** PI Analog Input (BACnet Regular) Cluster                                                  ***/
/*************************************************************************************************/
zcl.PiAnalogInputBacnetReg.Attr = new Enum({
    'COVIncrement': 0x0016,
    'DeviceType': 0x001F,
    'ObjectId': 0x004B,
    'ObjectName': 0x004D,
    'ObjectType': 0x004F,
    'UpdateInterval': 0x0076,
    'ProfileName': 0x00A8
});

zcl.PiAnalogInputBacnetReg.AttrType = {
    COVIncrement: 'SINGLE_PREC',
    DeviceType: 'CHAR_STR',
    ObjectId: 'BAC_OID',
    ObjectName: 'CHAR_STR',
    ObjectType: 'ENUM16',
    UpdateInterval: 'UINT8',
    ProfileName: 'CHAR_STR'
};

/*************************************************************************************************/
/*** PI Analog Input (BACnet Extended) Cluster                                                 ***/
/*************************************************************************************************/
zcl.PiAnalogInputBacnetExt.Attr = new Enum({
    'AckedTransitions': 0x0000,
    'NotificationClass': 0x0011,
    'Deadband': 0x0019,
    'EventEnable': 0x0023,
    'EventState': 0x0024,
    'HighLimit': 0x002D,
    'LimitEnable': 0x0034,
    'LowLimit': 0x003B,
    'NotifyType': 0x0048,
    'TimeDelay': 0x0071,
    'EventTimeStamps': 0x0082
});

zcl.PiAnalogInputBacnetExt.AttrType = {
    AckedTransitions: 'BITMAP8',
    NotificationClass: 'UINT16',
    Deadband: 'SINGLE_PREC',
    EventEnable: 'BITMAP8',
    EventState: 'ENUM8',
    HighLimit: 'SINGLE_PREC',
    LimitEnable: 'BITMAP8',
    LowLimit: 'SINGLE_PREC',
    NotifyType: 'ENUM8',
    TimeDelay: 'UINT8',
    EventTimeStamps: 'ARRAY'
};

/*************************************************************************************************/
/*** PI Analog Output (BACnet Regular) Cluster                                                 ***/
/*************************************************************************************************/
zcl.PiAnalogOutputBacnetReg.Attr = new Enum({
    'COVIncrement': 0x0016,
    'DeviceType': 0x001F,
    'ObjectIdentifier': 0x004B,
    'ObjectName': 0x004D,
    'ObjectType': 0x004F,
    'ProfileName': 0x00A8
});

zcl.PiAnalogOutputBacnetReg.AttrType = {
    COVIncrement: 'SINGLE_PREC',
    DeviceType: 'CHAR_STR',
    ObjectIdentifier: 'BAC_OID',
    ObjectName: 'CHAR_STR',
    ObjectType: 'ENUM16',
    ProfileName: 'CHAR_STR'
};

/*************************************************************************************************/
/*** PI Analog Output (BACnet Extended) Cluster                                                ***/
/*************************************************************************************************/
zcl.PiAnalogOutputBacnetExt.Attr = new Enum({
    'AckedTransitions': 0x0000,
    'NotificationClass': 0x0011,
    'Deadband': 0x0019,
    'EventEnable': 0x0023,
    'EventState': 0x0024,
    'HighLimit': 0x002D,
    'LimitEnable': 0x0034,
    'LowLimit': 0x003B,
    'NotifyType': 0x0048,
    'TimeDelay': 0x0071,
    'EventTimeStamps': 0x0082
});

zcl.PiAnalogOutputBacnetExt.AttrType = {
    AckedTransitions: 'BITMAP8',
    NotificationClass: 'UINT16',
    Deadband: 'SINGLE_PREC',
    EventEnable: 'BITMAP8',
    EventState: 'ENUM8',
    HighLimit: 'SINGLE_PREC',
    LimitEnable: 'BITMAP8',
    LowLimit: 'SINGLE_PREC',
    NotifyType: 'ENUM8',
    TimeDelay: 'UINT8',
    EventTimeStamps: 'ARRAY'
};

/*************************************************************************************************/
/*** PI Analog Value (BACnet Regular) Cluster                                                  ***/
/*************************************************************************************************/
zcl.PiAnalogValueBacnetReg.Attr = new Enum({
    'COVIncrement': 0x0016,
    'ObjectIdentifier': 0x004B,
    'ObjectName': 0x004D,
    'ObjectType': 0x004F,
    'ProfileName': 0x00A8
});

zcl.PiAnalogValueBacnetReg.AttrType = {
    COVIncrement: 'SINGLE_PREC',
    ObjectIdentifier: 'BAC_OID',
    ObjectName: 'CHAR_STR',
    ObjectType: 'ENUM16',
    ProfileName: 'CHAR_STR'
};

/*************************************************************************************************/
/*** PI Analog Value (BACnet Extended) Cluster                                                 ***/
/*************************************************************************************************/
zcl.PiAnalogValueBacnetExt.Attr = new Enum({
    'AckedTransitions': 0x0000,
    'NotificationClass': 0x0011,
    'Deadband': 0x0019,
    'EventEnable': 0x0023,
    'EventState': 0x0024,
    'HighLimit': 0x002D,
    'LimitEnable': 0x0034,
    'LowLimit': 0x003B,
    'NotifyType': 0x0048,
    'TimeDelay': 0x0071,
    'EventTimeStamps': 0x0082
});

zcl.PiAnalogValueBacnetExt.AttrType = {
    AckedTransitions: 'BITMAP8',
    NotificationClass: 'UINT16',
    Deadband: 'SINGLE_PREC',
    EventEnable: 'BITMAP8',
    EventState: 'ENUM8',
    HighLimit: 'SINGLE_PREC',
    LimitEnable: 'BITMAP8',
    LowLimit: 'SINGLE_PREC',
    NotifyType: 'ENUM8',
    TimeDelay: 'UINT8',
    EventTimeStamps: 'ARRAY'
};

/*************************************************************************************************/
/*** PI Binary Input (BACnet Regular) Cluster                                                  ***/
/*************************************************************************************************/
zcl.PiBinaryInputBacnetReg.Attr = new Enum({
    'ChangeOfStateCount': 0x000F,
    'ChangeOfStateTime': 0x0010,
    'DeviceType': 0x001F,
    'ElapsedActiveTime': 0x0021,
    'ObjectIdentifier': 0x004B,
    'ObjectName': 0x004D,
    'ObjectType': 0x004F,
    'TimeOfATReset': 0x0072,
    'TimeOfSCReset': 0x0073,
    'ProfileName': 0x00A8
});

zcl.PiBinaryInputBacnetReg.AttrType = {
    ChangeOfStateCount: 'UINT32',
    ChangeOfStateTime: 'STRUCT',
    DeviceType: 'CHAR_STR',
    ElapsedActiveTime: 'UINT32',
    ObjectIdentifier: 'BAC_OID',
    ObjectName: 'CHAR_STR',
    ObjectType: 'ENUM16',
    TimeOfATReset: 'STRUCT',
    TimeOfSCReset: 'STRUCT',
    ProfileName: 'CHAR_STR'
};

/*************************************************************************************************/
/*** PI Binary Input (BACnet Extended) Cluster                                                 ***/
/*************************************************************************************************/
zcl.PiBinaryInputBacnetExt.Attr = new Enum({
    'AckedTransitions': 0x0000,
    'AlarmValue': 0x0006,
    'NotificationClass': 0x0011,
    'EventEnable': 0x0023,
    'EventState': 0x0024,
    'NotifyType': 0x0048,
    'TimeDelay': 0x0071,
    'EventTimeStamps': 0x0082
});

zcl.PiBinaryInputBacnetExt.AttrType = {
    AckedTransitions: 'BITMAP8',
    AlarmValue: 'BOOLEAN',
    NotificationClass: 'UINT16',
    EventEnable: 'BITMAP8',
    EventState: 'ENUM8',
    NotifyType: 'ENUM8',
    TimeDelay: 'UINT8',
    EventTimeStamps: 'ARRAY'
};

/*************************************************************************************************/
/*** PI Binary Output (BACnet Regular) Cluster                                                 ***/
/*************************************************************************************************/
zcl.PiBinaryOutputBacnetReg.Attr = new Enum({
    'ChangeOfStateCount': 0x000F,
    'ChangeOfStateTime': 0x0010,
    'DeviceType': 0x001F,
    'ElapsedActiveTime': 0x0021,
    'FeedBackValue': 0x0028,
    'ObjectIdentifier': 0x004B,
    'ObjectName': 0x004D,
    'ObjectType': 0x004F,
    'TimeOfATReset': 0x0072,
    'TimeOfSCReset': 0x0073,
    'ProfileName': 0x00A8
});

zcl.PiBinaryOutputBacnetReg.AttrType = {
    ChangeOfStateCount: 'UINT32',
    ChangeOfStateTime: 'STRUCT',
    DeviceType: 'CHAR_STR',
    ElapsedActiveTime: 'UINT32',
    FeedBackValue: 'ENUM8',
    ObjectIdentifier: 'BAC_OID',
    ObjectName: 'CHAR_STR',
    ObjectType: 'ENUM16',
    TimeOfATReset: 'STRUCT',
    TimeOfSCReset: 'STRUCT',
    ProfileName: 'CHAR_STR'
};

/*************************************************************************************************/
/*** PI Binary Output (BACnet Extended) Cluster                                                ***/
/*************************************************************************************************/
zcl.PiBinaryOutputBacnetExt.Attr = new Enum({
    'AckedTransitions': 0x0000,
    'NotificationClass': 0x0011,
    'EventEnable': 0x0023,
    'EventState': 0x0024,
    'NotifyType': 0x0048,
    'TimeDelay': 0x0071,
    'EventTimeStamps': 0x0082
});

zcl.PiBinaryOutputBacnetExt.AttrType = {
    AckedTransitions: 'BITMAP8',
    NotificationClass: 'UINT16',
    EventEnable: 'BITMAP8',
    EventState: 'ENUM8',
    NotifyType: 'ENUM8',
    TimeDelay: 'UINT8',
    EventTimeStamps: 'ARRAY'
};

/*************************************************************************************************/
/*** PI Binary Value (BACnet Regular) Cluster                                                  ***/
/*************************************************************************************************/
zcl.PiBinaryValueBacnetReg.Attr = new Enum({
    'ChangeOfStateCount': 0x000F,
    'ChangeOfStateTime': 0x0010,
    'ElapsedActiveTime': 0x0021,
    'ObjectIdentifier': 0x004B,
    'ObjectName': 0x004D,
    'ObjectType': 0x004F,
    'TimeOfATReset': 0x0072,
    'TimeOfSCReset': 0x0073,
    'ProfileName': 0x00A8
});

zcl.PiBinaryValueBacnetReg.AttrType = {
    ChangeOfStateCount: 'UINT32',
    ChangeOfStateTime: 'STRUCT',
    ElapsedActiveTime: 'UINT32',
    ObjectIdentifier: 'BAC_OID',
    ObjectName: 'CHAR_STR',
    ObjectType: 'ENUM16',
    TimeOfATReset: 'STRUCT',
    TimeOfSCReset: 'STRUCT',
    ProfileName: 'CHAR_STR'
};

/*************************************************************************************************/
/*** PI Binary Value (BACnet Extended) Cluster                                                 ***/
/*************************************************************************************************/
zcl.PiBinaryValueBacnetExt.Attr = new Enum({
    'AckedTransitions': 0x0000,
    'AlarmValue': 0x0006,
    'NotificationClass': 0x0011,
    'EventEnable': 0x0023,
    'EventState': 0x0024,
    'NotifyType': 0x0048,
    'TimeDelay': 0x0071,
    'EventTimeStamps': 0x0082
});

zcl.PiBinaryValueBacnetExt.AttrType = {
    AckedTransitions: 'BITMAP8',
    AlarmValue: 'BOOLEAN',
    NotificationClass: 'UINT16',
    EventEnable: 'BITMAP8',
    EventState: 'ENUM8',
    NotifyType: 'ENUM8',
    TimeDelay: 'UINT8',
    EventTimeStamps: 'ARRAY'
};

/*************************************************************************************************/
/*** PI Multistate Input (BACnet Regular) Cluster                                              ***/
/*************************************************************************************************/
zcl.PiMultistateInputBacnetReg.Attr = new Enum({
    'DeviceType': 0x001F,
    'ObjectIdentifier': 0x004B,
    'ObjectName': 0x004D,
    'ObjectType': 0x004F,
    'ProfileName': 0x00A8
});

zcl.PiMultistateInputBacnetReg.AttrType = {
    DeviceType: 'CHAR_STR',
    ObjectIdentifier: 'BAC_OID',
    ObjectName: 'CHAR_STR',
    ObjectType: 'ENUM16',
    ProfileName: 'CHAR_STR'
};

/*************************************************************************************************/
/*** Multistate Input (BACnet Extended) Cluster                                                ***/
/*************************************************************************************************/
zcl.PiMultistateInputBacnetExt.Attr = new Enum({
    'AckedTransitions': 0x0000,
    'AlarmValues': 0x0006,
    'NotificationClass': 0x0011,
    'EventEnable': 0x0023,
    'EventState': 0x0024,
    'FaultValues': 0x0025,
    'NotifyType': 0x0048,
    'TimeDelay': 0x0071,
    'EventTimeStamps': 0x0082
});

zcl.PiMultistateInputBacnetExt.AttrType = {
    AckedTransitions: 'BITMAP8',
    AlarmValues: 'UINT16',
    NotificationClass: 'UINT16',
    EventEnable: 'BITMAP8',
    EventState: 'ENUM8',
    FaultValues: 'UINT16',
    NotifyType: 'ENUM8',
    TimeDelay: 'UINT8',
    EventTimeStamps: 'ARRAY'
};

/*************************************************************************************************/
/*** PI Multistate Output (BACnet Regular) Cluster                                             ***/
/*************************************************************************************************/
zcl.PiMultistateOutputBacnetReg.Attr = new Enum({
    'DeviceType': 0x001F,
    'FeedBackValue ': 0x0028,
    'ObjectIdentifier': 0x004B,
    'ObjectName': 0x004D,
    'ObjectType': 0x004F,
    'ProfileName': 0x00A8
});

zcl.PiMultistateOutputBacnetReg.AttrType = {
    DeviceType: 'CHAR_STR',
    FeedBackValue: 'ENUM8',
    ObjectIdentifier: 'BAC_OID',
    ObjectName: 'CHAR_STR',
    ObjectType: 'ENUM16',
    ProfileName: 'CHAR_STR'
};

/*************************************************************************************************/
/*** PI Multistate Output (BACnet Extended) Cluster                                            ***/
/*************************************************************************************************/
zcl.PiMultistateOutputBacnetExt.Attr = new Enum({
    'AckedTransitions': 0x0000,
    'NotificationClass': 0x0011,
    'EventEnable': 0x0023,
    'EventState': 0x0024,
    'NotifyType': 0x0048,
    'TimeDelay': 0x0071,
    'EventTimeStamps': 0x0082
});

zcl.PiMultistateOutputBacnetExt.AttrType = {
    AckedTransitions: 'BITMAP8',
    NotificationClass: 'UINT16',
    EventEnable: 'BITMAP8',
    EventState: 'ENUM8',
    NotifyType: 'ENUM8',
    TimeDelay: 'UINT8',
    EventTimeStamps: 'ARRAY'
};

/*************************************************************************************************/
/*** PI Multistate Value (BACnet Regular) Cluster                                              ***/
/*************************************************************************************************/
zcl.PiMultistateValueBacnetReg.Attr = new Enum({
    'ObjectIdentifier': 0x004B,
    'ObjectName': 0x004D,
    'ObjectType': 0x004F,
    'ProfileName': 0x00A8
});

zcl.PiMultistateValueBacnetReg.AttrType = {
    ObjectIdentifier: 'BAC_OID',
    ObjectName: 'CHAR_STR',
    ObjectType: 'ENUM16',
    ProfileName: 'CHAR_STR'
};

/*************************************************************************************************/
/*** PI Multistate Value (BACnet Extended) Cluster                                             ***/
/*************************************************************************************************/
zcl.PiMultistateValueBacnetExt.Attr = new Enum({
    'AckedTransitions': 0x0000,
    'AlarmValues': 0x0006,
    'NotificationClass': 0x0011,
    'EventEnable': 0x0023,
    'EventState': 0x0024,
    'FaultValues': 0x0025,
    'NotifyType': 0x0048,
    'TimeDelay': 0x0071,
    'EventTimeStamps': 0x0082
});

zcl.PiMultistateValueBacnetExt.AttrType = {
    AckedTransitions: 'BITMAP8',
    AlarmValues: 'UINT16',
    NotificationClass: 'UINT16',
    EventEnable: 'BITMAP8',
    EventState: 'ENUM8',
    FaultValues: 'UINT16',
    NotifyType: 'ENUM8',
    TimeDelay: 'UINT8',
    EventTimeStamps: 'ARRAY'
};

/*************************************************************************************************/
/*** PI 11073 Protocol Tunnel Cluster                                                          ***/
/*************************************************************************************************/
// TODO
zcl.Pi11073ProtocolTunnel.Attr = new Enum({
    'DeviceidList': 0x0000,
    'ManagerTarget': 0x0001,
    'ManagerEndpoint': 0x0002,
    'Connected': 0x0003,
    'Preemptible': 0x0004,
    'IdleTimeout': 0x0005
});

zcl.Pi11073ProtocolTunnel.Cmd = new Enum({
    // TODO zcl_meta
    // 'TransferApdu': 0x00,
    // 'ConnectReq': 0x01,
    // 'DisconnectReq': 0x02,
    // 'ConnectStatusNoti': 0x03
});

zcl.Pi11073ProtocolTunnel.CmdRsp = new Enum({
    
});

zcl.Pi11073ProtocolTunnel.Attrvalue = new Enum({
    /*** Connect status values ***/
    'CONNECT_STATUS_DISCONNECTED': 0x00,
    'CONNECT_STATUS_CONNECTED': 0x01,
    'CONNECT_STATUS_NOT_AUTHORIZED': 0x02,
    'CONNECT_STATUS_RECONNECT_REQ': 0x03,
    'CONNECT_STATUS_ALREADY_CONNECTED': 0x04
});

/***                        Advanced Metering Initiative (SE) Clusters                         ***/
/*************************************************************************************************/
/*** SE Simple Metering Cluster                                                                ***/
/*************************************************************************************************/
zcl.SeSimpleMetering.Attr = new Enum({
    // Simple Metering Cluster - Reading Information Set Attributes 0x00
    'CurrentSummDelivered': 0x0000,
    'CurrentSummReceived': 0x0001,
    'CurrentMaxDemandDelivered': 0x0002,
    'CurrentMaxDemandReceived': 0x0003,
    'DftSumm': 0x0004,
    'DailyFreezeTime': 0x0005,
    'PowerFactor': 0x0006,
    'ReadingSnapshotTime': 0x0007,
    'CurrentMaxDemandDeliverdTime': 0x0008,
    'CurrentMaxDemandReceivedTime': 0x0009,
    'DefaultUpdatePeriod': 0x000A,
    'FastPollUpdatePeriod': 0x000B,
    'CurrentBlockPeriodConsumpDelivered': 0x000C,
    'DailyConsumpTarget': 0x000D,
    'CurrentBlock': 0x000E,
    'ProfileIntervalPeriod': 0x000F,
    'IntervalReadReportingPeriod': 0x0010,
    'PresetReadingTime': 0x0011,
    'VolumePerReport': 0x0012,
    'FlowRestriction': 0x0013,
    'SupplyStatus': 0x0014,
    'CurrentInEnergyCarrierSumm': 0x0015,
    'CurrentOutEnergyCarrierSumm': 0x0016,
    'InletTempreature': 0x0017,
    'OutletTempreature': 0x0018,
    'ControlTempreature': 0x0019,
    'CurrentInEnergyCarrierDemand': 0x001A,
    'CurrentOutEnergyCarrierDemand': 0x001B,
    'CurrentBlockPeriodConsumpReceived': 0x001D,
    'CurrentBlockReceived': 0x001E,
    // Simple Metering Cluster - TOU Information Set Attributes 0x01
    'CurrentTier1SummDelivered': 0x0100,
    'CurrentTier1SummReceived': 0x0101,
    'CurrentTier2SummDelivered': 0x0102,
    'CurrentTier2SummReceived': 0x0103,
    'CurrentTier3SummDelivered': 0x0104,
    'CurrentTier3SummReceived': 0x0105,
    'CurrentTier4SummDelivered': 0x0106,
    'CurrentTier4SummReceived': 0x0107,
    'CurrentTier5SummDelivered': 0x0108,
    'CurrentTier5SummReceived': 0x0109,
    'CurrentTier6SummDelivered': 0x010A,
    'CurrentTier6SummReceived': 0x010B,
    'CurrentTier7SummDelivered': 0x010C,
    'CurrentTier7SummReceived': 0x010D,
    'CurrentTier8SummDelivered': 0x010E,
    'CurrentTier8SummReceived': 0x010F,
    'CurrentTier9SummDelivered': 0x0110,
    'CurrentTier9SummReceived': 0x0111,
    'CurrentTier10SummDelivered': 0x0112,
    'CurrentTier10SummReceived': 0x0113,
    'CurrentTier11SummDelivered': 0x0114,
    'CurrentTier11SummReceived': 0x0115,
    'CurrentTier12SummDelivered': 0x0116,
    'CurrentTier12SummReceived': 0x0117,
    'CurrentTier13SummDelivered': 0x0118,
    'CurrentTier13SummReceived': 0x0119,
    'CurrentTier14SummDelivered': 0x011A,
    'CurrentTier14SummReceived': 0x011B,
    'CurrentTier15SummDelivered': 0x011C,
    'CurrentTier15SummReceived': 0x011D,
    // Simple Metering Cluster - Meter Status Attributes 0x02
    'Status': 0x0200,
    'RemainingBattLife': 0x0201,
    'HoursInOperation': 0x0202,
    'HoursInFault': 0x0203,
    'ExtendedStatus': 0x0204,
    // Simple Metering Cluster - Formatting Attributes 0x03
    'UnitOfMeasure': 0x0300,
    'Multiplier': 0x0301,
    'Divisor': 0x0302,
    'SummaFormatting': 0x0303,
    'DemandFormatting': 0x0304,
    'HistoricalConsumpFormatting': 0x0305,
    'MeteringDeviceType': 0x0306,
    'SiteId': 0x0307,
    'MeterSerialNumber': 0x0308,
    'EnergyCarrierUnitOfMeas': 0x0309,
    'EnergyCarrierSummFormatting': 0x030A,
    'EnergyCarrierDemandFormatting': 0x030B,
    'TemperatureUnitOfMeas': 0x030C,
    'TemperatureFormatting': 0x030D,
    'ModuleSerialNumber': 0x030E,
    'OperatingTariffLevel': 0x030F,
    // Simple Metering Server Cluster - Historical Comsumption Attributes 0x04
    'InstantaneousDemand': 0x0400,
    'CurrentdayConsumpDelivered': 0x0401,
    'CurrentdayConsumpReceived': 0x0402,
    'PreviousdayConsumpDelivered': 0x0403,
    'PreviousdayConsumpReceived': 0x0404,
    'CurPartProfileIntStartTimeDelivered': 0x0405,
    'CurPartProfileIntStartTime_Received': 0x0406,
    'CurPartProfileIntValueDelivered': 0x0407,
    'CurPartProfileIntValueReceived': 0x0408,
    'CurrentDayMaxPressure': 0x0409,
    'CurrentDayMinPressure': 0x040A,
    'PreviousDayMaxPressure': 0x040B,
    'PreviousDayMinPressure': 0x040C,
    'CurrentDayMaxDemand': 0x040D,
    'PreviousDayMaxDemand': 0x040E,
    'CurrentMonthMaxDemand': 0x040F,
    'CurrentYearMaxDemand': 0x0410,
    'CurrentdayMaxEnergyCarrDemand': 0x0411,
    'PreviousdayMaxEnergyCarrDemand': 0x0412,
    'CurMonthMaxEnergyCarrDemand': 0x0413,
    'CurMonthMinEnergyCarrDemand': 0x0414,
    'CurYearMaxEnergyCarrDemand': 0x0415,
    'CurYearMinEnergyCarrDemand': 0x0416,
    // Simple Metering Server Cluster - Load Profile Configuration Attributes 0x05
    'MaxNumberOfPeriodsDelivered': 0x0500,
    // Simple Metering Server Cluster - Supply Limit Attributes 0x06
    'Current_Demand_Delivered': 0x0600,
    'DemandLimit': 0x0601,
    'DemandIntegrationPeriod': 0x0602,
    'NumberOfDemandSubintervals': 0x0603,
    'DemandLimitArmDuration': 0x0604,
    // Simple Metering Server Cluster - Block Information Attributes 0x07
        // TODO
    // Simple Metering Server Cluster - Alarms Attributes 0x08
    'GenericAlarmMask': 0x0800,
    'ElectricityAlarmMask': 0x0801,
    'GenFlowPressureAlarmMask': 0x0802,
    'WaterSpecificAlarmMask': 0x0803,
    'HeatCoolSpecificAlarmMASK': 0x0804,
    'GasSpecificAlarmMask': 0x0805,
    'ManufactureAlarmMask': 0x0806, 
    // Simple Metering Server Cluster - Block Information Set (Received) Attributes 0x09
        // TODO
    // Simple Metering Server Cluster - Billing Attributes 0x0A
    'BillToDate': 0x0A00,
    'BillToDateTimeStamp': 0x0A01,
    'ProjectedBill': 0x0A02,
    'ProjectedBillTimeStamp': 0x0A03,
    // Simple Metering Client Cluster - Notification Attributes 0x00
    'Notification_Control_Flags': 0x0000,
    'Notification_Flags': 0x0001,
    'Price_Notification_Flags': 0x0002,
    'Calendar_Notification_Flags': 0x0003,
    'Pre_Pay_Notification_Flags': 0x0004,
    'Device_Management_Flags': 0x0005,
    // Simple Metering Client Cluster - Mirror Configuration Attributes 0x01
    'ChangeReportingProfile': 0x0100
});

zcl.SeSimpleMetering.Cmd = new Enum({
    // TODO zcl_meta
    // 'GetProfile': 0x0000,
    // 'ReqMirror': 0x0001,
    // 'MirrorRem': 0x0002,
    // 'ReqFastPollMode': 0x0003,
    // 'GetSnapshot': 0x0004,
    // 'TakeSnapshot': 0x0005,
    // 'MirrorReportAttrRsp': 0x0006,
});

zcl.SeSimpleMetering.CmdRsp = new Enum({
    // TODO zcl_meta
    // 'GetProfileRsp': 0x0000,
    // 'ReqMirrorRsp': 0x0001,
    // 'MirrorRemRsp': 0x0002,
    // 'ReqFastPollModeRsp': 0x0003,
    // 'GetSnapshotRsp': 0x0004,
});

/***                                      HOME AUTOMATION                                      ***/
/*************************************************************************************************/
/*** HA Appliance Identification Cluster                                                       ***/
/*************************************************************************************************/
zcl.HaApplianceIdentification.Attr = new Enum({
    'BasicIdentification': 0x0000,
    'CompanyName': 0x0010,
    'CompanyId': 0x0011,
    'BrandName': 0x0012,
    'BrandId':  0x0013,
    'Model': 0x0014,
    'PartNumber': 0x0015,
    'ProductRevision': 0x0016,
    'SoftwareRevision': 0x0017,
    'ProductTypeName': 0x0018,
    'ProductTypeId': 0x0019,
    'CecedSpecificationVersion': 0x001A
});

zcl.HaApplianceIdentification.AttrType = {
    BasicIdentification: 'UINT56',
    CompanyName: 'CHAR_STR',
    CompanyId: 'UINT16',
    BrandName: 'CHAR_STR',
    BrandId:  'UINT16',
    Model: 'OCTET_STR',
    PartNumber: 'OCTET_STR',
    ProductRevision: 'OCTET_STR',
    SoftwareRevision: 'OCTET_STR',
    ProductTypeName: 'OCTET_STR',
    ProductTypeId: 'UINT16',
    CecedSpecificationVersion: 'UINT8'
};

/*************************************************************************************************/
/*** HA Meter Identification Cluster                                                           ***/
/*************************************************************************************************/
zcl.HaMeterIdentification.Attr = new Enum({
    'CompanyName': 0x0000,
    'MeterTypeId': 0x0001,
    'DataQualityId': 0x0004,
    'CustomerName': 0x0005,
    'Model': 0x0006,
    'PartNumber': 0x0007,
    'ProductRevision': 0x0008,
    'SoftwareRevision': 0x000A,
    'UtilityName': 0x000B,
    'Pod': 0x000C,
    'AvailablePower': 0x000D,
    'PowerThreshold': 0x000E
});

zcl.HaMeterIdentification.AttrType = {
    CompanyName: 'CHAR_STR',
    MeterTypeId: 'UINT16',
    DataQualityId: 'UINT16',
    CustomerName: 'CHAR_STR',
    Model: 'CHAR_STR',
    PartNumber: 'CHAR_STR',
    ProductRevision: 'CHAR_STR',
    SoftwareRevision: 'CHAR_STR',
    UtilityName: 'CHAR_STR',
    Pod: 'CHAR_STR',
    AvailablePower: 'INT24',
    PowerThreshold: 'INT24'
};

/*************************************************************************************************/
/*** HA Appliance Events And Alerts Cluster                                                    ***/
/*************************************************************************************************/
zcl.HaApplianceEventsAlerts.Cmd = new Enum({
    'GetAlerts': 0x00    // no payload   
});

zcl.HaApplianceEventsAlerts.CmdRsp = new Enum({
    'GetAlertsRsp': 0x00,
    'AlertsNotification': 0x01,
    'EventNotification': 0x02
});

/*************************************************************************************************/
/*** HA Appliance Statistics Cluster                                                           ***/
/*************************************************************************************************/
zcl.HaApplianceStatistics.Attr = new Enum({
    'LogMaxSize': 0x0000,
    'LogQueueMaxSize': 0x0001
});

zcl.HaApplianceStatistics.AttrType = {
    LogMaxSize: 'UINT32',
    LogQueueMaxSize: 'UINT8'
};

zcl.HaApplianceStatistics.Cmd = new Enum({
    'Log': 0x00,
    'LogQueue': 0x01
});

zcl.HaApplianceStatistics.CmdRsp = new Enum({
    'LogNotification': 0x00,       // M, zclApplianceStatisticsLogNotification_t
    'LogRsp': 0x01,                // M, zclApplianceStatisticsLogRsp_t
    'LogQueueRsp': 0x02,           // M, zclApplianceStatisticsLogQueueRsp_t
    'StatisticsAvailable': 0x03    // M, zclApplianceStatisticsStatisticsAvailable_t 
});

/*************************************************************************************************/
/*** HA Electrical Measurements Cluster                                                        ***/
/*************************************************************************************************/
zcl.HaElectricalMeasurement.Attr = new Enum({
    'MeasurementType': 0x0000,
    'DcVoltage': 0x0100,
    'DcVoltageMin': 0x0101,
    'DcVoltageMax': 0x0102,
    'DcCurrent': 0x0103,
    'DcCurrentMin': 0x0104,
    'DcCurrentMax': 0x0105,
    'DcPower': 0x0106,
    'DcPowerMin': 0x0107,
    'DcPowerMax': 0x0108,
    'DcVoltageMultiplier': 0x0200,
    'DcVoltageDivisor': 0x0201,
    'DcCurrentMultiplier': 0x0202,
    'DcCurrentDivisor': 0x0203,
    'DcPowerMultiplier': 0x0204,
    'DcPowerDivisor': 0x0205,
    'AcFrequency': 0x0300,
    'AcFrequencyMin': 0x0301,
    'AcFrequencyMax': 0x0302,
    'NeutralCurrent': 0x0303,
    'TotalActivePower': 0x0304,
    'TotalReactivePower': 0x0305,
    'TotalApparentPower': 0x0306,
    'Meas1stHarmonicCurrent': 0x0307,
    'Meas3rdHarmonicCurrent': 0x0308,
    'Meas5thHarmonicCurrent': 0x0309,
    'Meas7thHarmonicCurrent': 0x030A,
    'Meas9thHarmonicCurrent': 0x030B,
    'Meas11thHarmonicCurrent': 0x030C,
    'MeasPhase1stHarmonicCurrent': 0x030D,
    'MeasPhase3rdHarmonicCurrent': 0x030E,
    'MeasPhase5thHarmonicCurrent': 0x030F,
    'MeasPhase7thHarmonicCurrent': 0x0310,
    'MeasPhase9thHarmonicCurrent': 0x0311,
    'MeasPhase11thHarmonicCurrent': 0x0312,
    'AcFrequencyMultiplier': 0x0400,
    'AcFrequencyDivisor': 0x0401,
    'PowerMultiplier': 0x0402,
    'PowerDivisor': 0x0403,
    'HarmonicCurrentMultiplier': 0x0404,
    'PhaseHarmonicCurrentMultiplier': 0x0405,
    'InstantaneousVoltage': 0x0500,
    'InstantaneousLineCurrent': 0x0501,
    'InstantaneousActiveCurrent': 0x0502,
    'InstantaneousReactiveCurrent': 0x0503,
    'InstantaneousPower': 0x0504,
    'RmsVoltage': 0x0505,
    'RmsVoltageMin': 0x0506,
    'RmsVoltageMax': 0x0507,
    'RmsCurrent': 0x0508,
    'RmsCurrentMin': 0x0509,
    'RmsCurrentMax': 0x050A,
    'ActivePower': 0x050B,
    'ActivePowerMin': 0x050C,
    'ActivePowerMax': 0x050D,
    'ReactivePower': 0x050E,
    'ApparentPower': 0x050F,
    'PowerFactor': 0x0510,
    'AverageRmsVoltageMeasPeriod': 0x0511,
    'AverageRmsOverVoltageCounter': 0x0512,
    'AverageRmsUnderVoltageCounter': 0x0513,
    'RmsExtremeOverVoltagePeriod': 0x0514,
    'RmsExtremeUnderVoltagePeriod': 0x0515,
    'RmsVoltageSagPeriod': 0x0516,
    'RmsVoltageSwellPeriod': 0x0517,
    'AcVoltageMultiplier': 0x0600,
    'AcVoltageDivisor': 0x0601,
    'AcCurrentMultiplier': 0x0602,
    'AcCurrentDivisor': 0x0603,
    'AcPowerMultiplier': 0x0604,
    'AcPowerDivisor': 0x0605,
    'DcOverloadAlarmsMask': 0x0700,
    'DcVoltageOverload': 0x0701,
    'DcCurrentOverload': 0x0702,
    'AcAlarmsMask': 0x0800,
    'AcVoltageOverload': 0x0801,
    'AcCurrentOverload': 0x0802,
    'AcActivePowerOverload': 0x0803,
    'AcReactivePowerOverload': 0x0804,
    'AverageRmsOverVoltage': 0x0805,
    'AverageRmsUnderVoltage': 0x0806,
    'RmsExtremeOverVoltage': 0x0807,
    'RmsExtremeUnderVoltage': 0x0808,
    'RmsVoltageSag': 0x0809,
    'RmsVoltageSwell': 0x080A,
    'LineCurrentPhB': 0x0901,
    'ActiveCurrentPhB': 0x0902,
    'ReactiveCurrentPhB': 0x0903,
    'RmsVoltagePhB': 0x0905,
    'RmsVoltageMinPhB': 0x0906,
    'RmsVoltageMaxPhB': 0x0907,
    'RmsCurrentPhB': 0x0908,
    'RmsCurrentMinPhB': 0x0909,
    'RmsCurrentMaxPhB': 0x090A,
    'ActivePowerPhB': 0x090B,
    'ActivePowerMinPhB': 0x090C,
    'ActivePowerMaxPhB': 0x090D,
    'ReactivePowerPhB': 0x090E,
    'ApparentPowerPhB': 0x090F,
    'PowerFactorPhB': 0x0910,
    'AverageRmsVoltageMeasurePeriodPhB': 0x0911,
    'AverageRmsOverVoltageCounterPhB': 0x0912,
    'AverageUnderVoltageCounterPhB': 0x0913,
    'RmsExtremeOverVoltagePeriodPhB': 0x0914,
    'RmsExtremeUnderVoltagePeriodPhB': 0x0915,
    'RmsVoltageSagPeriodPhB': 0x0916,
    'RmsVoltageSwellPeriodPhB': 0x0917,
    'LineCurrentPhC': 0x0A01,
    'ActiveCurrentPhC': 0x0A02,
    'ReactiveCurrentPhC': 0x0A03,
    'RmsVoltagePhC': 0x0A05,
    'RmsVoltageMinPhC': 0x0A06,
    'RmsVoltageMaxPhC': 0x0A07,
    'RmsCurrentPhC': 0x0A08,
    'RmsCurrentMinPhC': 0x0A09,
    'RmsCurrentMaxPhC': 0x0A0A,
    'ActivePowerPhC': 0x0A0B,
    'ActivePowerMinPhC': 0x0A0C,
    'ActivePowerMaxPhC': 0x0A0D,
    'ReactivePowerPhC': 0x0A0E,
    'ApparentPowerPhC': 0x0A0F,
    'PowerFactorPhC': 0x0A10,
    'AverageRmsVoltageMeasPeriodPhC': 0x0A11,
    'AverageRmsOverVoltageCounterPhC': 0x0A12,
    'AverageUnderVoltageCounterPhC': 0x0A13,
    'RmsExtremeOverVoltagePeriodPhC': 0x0A14,
    'RmsExtremeUnderVoltagePeriodPhC': 0x0A15,
    'RmsVoltageSagPeriodPhC': 0x0A16,
    'RmsVoltageSwellPeriodPh_C': 0x0A17
});

zcl.HaElectricalMeasurement.AttrType = {
    MeasurementType: 'BITMAP32',
    DcVoltage: 'INT16',
    DcVoltageMin: 'INT16',
    DcVoltageMax: 'INT16',
    DcCurrent: 'INT16',
    DcCurrentMin: 'INT16',
    DcCurrentMax: 'INT16',
    DcPower: 'INT16',
    DcPowerMin: 'INT16',
    DcPowerMax: 'INT16',
    DcVoltageMultiplier: 'UINT16',
    DcVoltageDivisor: 'UINT16',
    DcCurrentMultiplier: 'UINT16',
    DcCurrentDivisor: 'UINT16',
    DcPowerMultiplier: 'UINT16',
    DcPowerDivisor: 'UINT16',
    AcFrequency: 'UINT16',
    AcFrequencyMin: 'UINT16',
    AcFrequencyMax: 'UINT16',
    NeutralCurrent: 'UINT16',
    TotalActivePower: 'INT32',
    TotalReactivePower: 'INT32',
    TotalApparentPower: 'UINT32',
    Meas1stHarmonicCurrent: 'INT16',
    Meas3rdHarmonicCurrent: 'INT16',
    Meas5thHarmonicCurrent: 'INT16',
    Meas7thHarmonicCurrent: 'INT16',
    Meas9thHarmonicCurrent: 'INT16',
    Meas11thHarmonicCurrent: 'INT16',
    MeasPhase1stHarmonicCurrent: 'INT16',
    MeasPhase3rdHarmonicCurrent: 'INT16',
    MeasPhase5thHarmonicCurrent: 'INT16',
    MeasPhase7thHarmonicCurrent: 'INT16',
    MeasPhase9thHarmonicCurrent: 'INT16',
    MeasPhase11thHarmonicCurrent: 'INT16',
    AcFrequencyMultiplier: 'UINT16',
    AcFrequencyDivisor: 'UINT16',
    PowerMultiplier: 'UINT32',
    PowerDivisor: 'UINT32',
    HarmonicCurrentMultiplier: 'INT8',
    PhaseHarmonicCurrentMultiplier: 'INT8',
    InstantaneousVoltage: 'INT16',
    InstantaneousLineCurrent: 'UINT16',
    InstantaneousActiveCurrent: 'INT16',
    InstantaneousReactiveCurrent: 'INT16',
    InstantaneousPower: 'INT16',
    RmsVoltage: 'UINT16',
    RmsVoltageMin: 'UINT16',
    RmsVoltageMax: 'UINT16',
    RmsCurrent: 'UINT16',
    RmsCurrentMin: 'UINT16',
    RmsCurrentMax: 'UINT16',
    ActivePower: 'INT16',
    ActivePowerMin: 'INT16',
    ActivePowerMax: 'INT16',
    ReactivePower: 'INT16',
    ApparentPower: 'UINT16',
    PowerFactor: 'INT8',
    AverageRmsVoltageMeasPeriod: 'UINT16',
    AverageRmsOverVoltageCounter: 'UINT16',
    AverageRmsUnderVoltageCounter: 'UINT16',
    RmsExtremeOverVoltagePeriod: 'UINT16',
    RmsExtremeUnderVoltagePeriod: 'UINT16',
    RmsVoltageSagPeriod: 'UINT16',
    RmsVoltageSwellPeriod: 'UINT16',
    AcVoltageMultiplier: 'UINT16',
    AcVoltageDivisor: 'UINT16',
    AcCurrentMultiplier: 'UINT16',
    AcCurrentDivisor: 'UINT16',
    AcPowerMultiplier: 'UINT16',
    AcPowerDivisor: 'UINT16',
    DcOverloadAlarmsMask: 'BITMAP8',
    DcVoltageOverload: 'INT16',
    DcCurrentOverload: 'INT16',
    AcAlarmsMask: 'BITMAP16',
    AcVoltageOverload: 'INT16',
    AcCurrentOverload: 'INT16',
    AcActivePowerOverload: 'INT16',
    AcReactivePowerOverload: 'INT16',
    AverageRmsOverVoltage: 'INT16',
    AverageRmsUnderVoltage: 'INT16',
    RmsExtremeOverVoltage: 'INT16',
    RmsExtremeUnderVoltage: 'INT16',
    RmsVoltageSag: 'INT16',
    RmsVoltageSwell: 'INT16',
    LineCurrentPhB: 'UINT16',
    ActiveCurrentPhB: 'INT16',
    ReactiveCurrentPhB: 'INT16',
    RmsVoltagePhB: 'UINT16',
    RmsVoltageMinPhB: 'UINT16',
    RmsVoltageMaxPhB: 'UINT16',
    RmsCurrentPhB: 'UINT16',
    RmsCurrentMinPhB: 'UINT16',
    RmsCurrentMaxPhB: 'UINT16',
    ActivePowerPhB: 'INT16',
    ActivePowerMinPhB: 'INT16',
    ActivePowerMaxPhB: 'INT16',
    ReactivePowerPhB: 'INT16',
    ApparentPowerPhB: 'UINT16',
    PowerFactorPhB: 'INT8',
    AverageRmsVoltageMeasurePeriodPhB: 'UINT16',
    AverageRmsOverVoltageCounterPhB: 'UINT16',
    AverageUnderVoltageCounterPhB: 'UINT16',
    RmsExtremeOverVoltagePeriodPhB: 'UINT16',
    RmsExtremeUnderVoltagePeriodPhB: 'UINT16',
    RmsVoltageSagPeriodPhB: 'UINT16',
    RmsVoltageSwellPeriodPhB: 'UINT16',
    LineCurrentPhC: 'UINT16',
    ActiveCurrentPhC: 'INT16',
    ReactiveCurrentPhC: 'INT16',
    RmsVoltagePhC: 'UINT16',
    RmsVoltageMinPhC: 'UINT16',
    RmsVoltageMaxPhC: 'UINT16',
    RmsCurrentPhC: 'UINT16',
    RmsCurrentMinPhC: 'UINT16',
    RmsCurrentMaxPhC: 'UINT16',
    ActivePowerPhC: 'INT16',
    ActivePowerMinPhC: 'INT16',
    ActivePowerMaxPhC: 'INT16',
    ReactivePowerPhC: 'INT16',
    ApparentPowerPhC: 'UINT16',
    PowerFactorPhC: 'INT8',
    AverageRmsVoltageMeasPeriodPhC: 'UINT16',
    AverageRmsOverVoltageCounterPhC: 'UINT16',
    AverageUnderVoltageCounterPhC: 'UINT16',
    RmsExtremeOverVoltagePeriodPhC: 'UINT16',
    RmsExtremeUnderVoltagePeriodPhC: 'UINT16',
    RmsVoltageSagPeriodPhC: 'UINT16',
    RmsVoltageSwellPeriodPh_C: 'UINT16'
};

zcl.HaElectricalMeasurement.Cmd = new Enum({
    'GetProfileInfo': 0x00,             // O, no payload
    'GetMeasurementProfile': 0x01       // O, zclElectricalMeasurementGetMeasurementProfile_t
});

zcl.HaElectricalMeasurement.CmdRsp = new Enum({
    'GetProfileInfoRsp': 0x00,          // O, zclElectricalMeasurementGetProfileInfoRsp_t
    'GetMeasurementProfileRsp': 0x01    // O, zclElectricalMeasurementGetMeasurementProfileRsp_t
});

/*************************************************************************************************/
/*** HA Diagnostic Cluster                                                                     ***/
/*************************************************************************************************/
zcl.HaDiagnostic.Attr = new Enum({
    'NumberOfResets': 0x0000,
    'PersistentMemoryWrites': 0x0001,
    'MacRxBcast': 0x0100,
    'MacTxBcast': 0x0101,
    'MacRxUcast': 0x0102,
    'MacTxUcast': 0x0103,
    'MacTxUcastRetry': 0x0104,
    'MacTxUcastFail': 0x0105,
    'APSRxBcast': 0x0106,
    'APSTxBcast': 0x0107,
    'APSRxUcast': 0x0108,
    'APSTxUcastSuccess': 0x0109,
    'APSTxUcastRetry': 0x010A,
    'APSTxUcastFail': 0x010B,
    'RouteDiscInitiated': 0x010C,
    'NeighborAdded': 0x010D,
    'NeighborRemoved': 0x010E,
    'NeighborStale': 0x010F,
    'JoinIndication': 0x0110,
    'ChildMoved': 0x0111,
    'NwkFcFailure': 0x0112,
    'ApsFcFailure': 0x0113,
    'ApsUnauthorizedKey': 0x0114,
    'NwkDecryptFailures': 0x0115,
    'ApsDecryptFailures': 0x0116,
    'PacketBufferAllocateFailures': 0x0117,
    'RelayedUcast': 0x0118,
    'PhyToMacQueueLimitReached': 0x0119,
    'PacketValidateDropCount': 0x011A,
    'AverageMacRetryPerApsMessageSent': 0x011B,
    'LastMessageLqi': 0x011C,
    'LastMessageRssi': 0x011D
});

zcl.HaDiagnostic.AttrType = {
    NumberOfResets: 'UINT16',
    PersistentMemoryWrites: 'UINT16',
    MacRxBcast: 'UINT32',
    MacTxBcast: 'UINT32',
    MacRxUcast: 'UINT32',
    MacTxUcast: 'UINT32',
    MacTxUcastRetry: 'UINT16',
    MacTxUcastFail: 'UINT16',
    APSRxBcast: 'UINT16',
    APSTxBcast: 'UINT16',
    APSRxUcast: 'UINT16',
    APSTxUcastSuccess: 'UINT16',
    APSTxUcastRetry: 'UINT16',
    APSTxUcastFail: 'UINT16',
    RouteDiscInitiated: 'UINT16',
    NeighborAdded: 'UINT16',
    NeighborRemoved: 'UINT16',
    NeighborStale: 'UINT16',
    JoinIndication: 'UINT16',
    ChildMoved: 'UINT16',
    NwkFcFailure: 'UINT16',
    ApsFcFailure: 'UINT16',
    ApsUnauthorizedKey: 'UINT16',
    NwkDecryptFailures: 'UINT16',
    ApsDecryptFailures: 'UINT16',
    PacketBufferAllocateFailures: 'UINT16',
    RelayedUcast: 'UINT16',
    PhyToMacQueueLimitReached: 'UINT16',
    PacketValidateDropCount: 'UINT16',
    AverageMacRetryPerApsMessageSent: 'UINT16',
    LastMessageLqi: 'UINT8',
    LastMessageRssi: 'INT8'
};
