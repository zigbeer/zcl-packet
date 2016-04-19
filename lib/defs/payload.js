read: [{attrId}, ...]
readRsp: [{attrId, status, dataType, attrVal}, ... ](success) or [{attrId, status}, ... ](fail)
write: [{attrId, dataType, attrVal}, ...]
writeUndiv: [{attrId, dataType, attrVal}, ...]
writeRsp: [{status, attrId}, ...]
writeNoRsp: [{attrId, dataType, attrVal}, ...]
configReport: [{direction, attrId, dataType, minRepIntval, maxRepIntval, repChange}](direction:0) or [{direction, attrId, timeout}](direction:1)

