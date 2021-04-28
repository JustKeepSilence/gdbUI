// GENERATED CODE -- DO NOT EDIT!

'use strict';
var gdb_pb = require('./gdb_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_AddUserInfo(arg) {
  if (!(arg instanceof gdb_pb.AddUserInfo)) {
    throw new Error('Expected argument of type model.AddUserInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_AddUserInfo(buffer_arg) {
  return gdb_pb.AddUserInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_AddedCalcItemInfo(arg) {
  if (!(arg instanceof gdb_pb.AddedCalcItemInfo)) {
    throw new Error('Expected argument of type model.AddedCalcItemInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_AddedCalcItemInfo(buffer_arg) {
  return gdb_pb.AddedCalcItemInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_AddedGroupColumnsInfo(arg) {
  if (!(arg instanceof gdb_pb.AddedGroupColumnsInfo)) {
    throw new Error('Expected argument of type model.AddedGroupColumnsInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_AddedGroupColumnsInfo(buffer_arg) {
  return gdb_pb.AddedGroupColumnsInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_AddedGroupInfos(arg) {
  if (!(arg instanceof gdb_pb.AddedGroupInfos)) {
    throw new Error('Expected argument of type model.AddedGroupInfos');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_AddedGroupInfos(buffer_arg) {
  return gdb_pb.AddedGroupInfos.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_AddedItemsInfo(arg) {
  if (!(arg instanceof gdb_pb.AddedItemsInfo)) {
    throw new Error('Expected argument of type model.AddedItemsInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_AddedItemsInfo(buffer_arg) {
  return gdb_pb.AddedItemsInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_AuthInfo(arg) {
  if (!(arg instanceof gdb_pb.AuthInfo)) {
    throw new Error('Expected argument of type model.AuthInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_AuthInfo(buffer_arg) {
  return gdb_pb.AuthInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_BatchWriteHistoricalString(arg) {
  if (!(arg instanceof gdb_pb.BatchWriteHistoricalString)) {
    throw new Error('Expected argument of type model.BatchWriteHistoricalString');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_BatchWriteHistoricalString(buffer_arg) {
  return gdb_pb.BatchWriteHistoricalString.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_BatchWriteString(arg) {
  if (!(arg instanceof gdb_pb.BatchWriteString)) {
    throw new Error('Expected argument of type model.BatchWriteString');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_BatchWriteString(buffer_arg) {
  return gdb_pb.BatchWriteString.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_CalcId(arg) {
  if (!(arg instanceof gdb_pb.CalcId)) {
    throw new Error('Expected argument of type model.CalcId');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_CalcId(buffer_arg) {
  return gdb_pb.CalcId.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_CalcItemsInfo(arg) {
  if (!(arg instanceof gdb_pb.CalcItemsInfo)) {
    throw new Error('Expected argument of type model.CalcItemsInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_CalcItemsInfo(buffer_arg) {
  return gdb_pb.CalcItemsInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_CalculationResult(arg) {
  if (!(arg instanceof gdb_pb.CalculationResult)) {
    throw new Error('Expected argument of type model.CalculationResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_CalculationResult(buffer_arg) {
  return gdb_pb.CalculationResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_CalculationResults(arg) {
  if (!(arg instanceof gdb_pb.CalculationResults)) {
    throw new Error('Expected argument of type model.CalculationResults');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_CalculationResults(buffer_arg) {
  return gdb_pb.CalculationResults.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_CheckItemsInfo(arg) {
  if (!(arg instanceof gdb_pb.CheckItemsInfo)) {
    throw new Error('Expected argument of type model.CheckItemsInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_CheckItemsInfo(buffer_arg) {
  return gdb_pb.CheckItemsInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_Cols(arg) {
  if (!(arg instanceof gdb_pb.Cols)) {
    throw new Error('Expected argument of type model.Cols');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_Cols(buffer_arg) {
  return gdb_pb.Cols.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_DeletedGroupColumnNamesInfo(arg) {
  if (!(arg instanceof gdb_pb.DeletedGroupColumnNamesInfo)) {
    throw new Error('Expected argument of type model.DeletedGroupColumnNamesInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_DeletedGroupColumnNamesInfo(buffer_arg) {
  return gdb_pb.DeletedGroupColumnNamesInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_DeletedItemsInfo(arg) {
  if (!(arg instanceof gdb_pb.DeletedItemsInfo)) {
    throw new Error('Expected argument of type model.DeletedItemsInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_DeletedItemsInfo(buffer_arg) {
  return gdb_pb.DeletedItemsInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_FileContents(arg) {
  if (!(arg instanceof gdb_pb.FileContents)) {
    throw new Error('Expected argument of type model.FileContents');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_FileContents(buffer_arg) {
  return gdb_pb.FileContents.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_FileInfo(arg) {
  if (!(arg instanceof gdb_pb.FileInfo)) {
    throw new Error('Expected argument of type model.FileInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_FileInfo(buffer_arg) {
  return gdb_pb.FileInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_GdbHistoricalData(arg) {
  if (!(arg instanceof gdb_pb.GdbHistoricalData)) {
    throw new Error('Expected argument of type model.GdbHistoricalData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_GdbHistoricalData(buffer_arg) {
  return gdb_pb.GdbHistoricalData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_GdbInfoData(arg) {
  if (!(arg instanceof gdb_pb.GdbInfoData)) {
    throw new Error('Expected argument of type model.GdbInfoData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_GdbInfoData(buffer_arg) {
  return gdb_pb.GdbInfoData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_GdbItems(arg) {
  if (!(arg instanceof gdb_pb.GdbItems)) {
    throw new Error('Expected argument of type model.GdbItems');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_GdbItems(buffer_arg) {
  return gdb_pb.GdbItems.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_GdbItemsWithCount(arg) {
  if (!(arg instanceof gdb_pb.GdbItemsWithCount)) {
    throw new Error('Expected argument of type model.GdbItemsWithCount');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_GdbItemsWithCount(buffer_arg) {
  return gdb_pb.GdbItemsWithCount.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_GdbRealTimeData(arg) {
  if (!(arg instanceof gdb_pb.GdbRealTimeData)) {
    throw new Error('Expected argument of type model.GdbRealTimeData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_GdbRealTimeData(buffer_arg) {
  return gdb_pb.GdbRealTimeData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_GroupNamesInfo(arg) {
  if (!(arg instanceof gdb_pb.GroupNamesInfo)) {
    throw new Error('Expected argument of type model.GroupNamesInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_GroupNamesInfo(buffer_arg) {
  return gdb_pb.GroupNamesInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_GroupPropertyInfo(arg) {
  if (!(arg instanceof gdb_pb.GroupPropertyInfo)) {
    throw new Error('Expected argument of type model.GroupPropertyInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_GroupPropertyInfo(buffer_arg) {
  return gdb_pb.GroupPropertyInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_HistoryFileInfo(arg) {
  if (!(arg instanceof gdb_pb.HistoryFileInfo)) {
    throw new Error('Expected argument of type model.HistoryFileInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_HistoryFileInfo(buffer_arg) {
  return gdb_pb.HistoryFileInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_ItemsInfo(arg) {
  if (!(arg instanceof gdb_pb.ItemsInfo)) {
    throw new Error('Expected argument of type model.ItemsInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_ItemsInfo(buffer_arg) {
  return gdb_pb.ItemsInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_LogsInfo(arg) {
  if (!(arg instanceof gdb_pb.LogsInfo)) {
    throw new Error('Expected argument of type model.LogsInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_LogsInfo(buffer_arg) {
  return gdb_pb.LogsInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_QueryCalcItemsInfo(arg) {
  if (!(arg instanceof gdb_pb.QueryCalcItemsInfo)) {
    throw new Error('Expected argument of type model.QueryCalcItemsInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_QueryCalcItemsInfo(buffer_arg) {
  return gdb_pb.QueryCalcItemsInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_QueryGroupPropertyInfo(arg) {
  if (!(arg instanceof gdb_pb.QueryGroupPropertyInfo)) {
    throw new Error('Expected argument of type model.QueryGroupPropertyInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_QueryGroupPropertyInfo(buffer_arg) {
  return gdb_pb.QueryGroupPropertyInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_QueryHistoricalDataString(arg) {
  if (!(arg instanceof gdb_pb.QueryHistoricalDataString)) {
    throw new Error('Expected argument of type model.QueryHistoricalDataString');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_QueryHistoricalDataString(buffer_arg) {
  return gdb_pb.QueryHistoricalDataString.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_QueryHistoricalDataWithTimeStampString(arg) {
  if (!(arg instanceof gdb_pb.QueryHistoricalDataWithTimeStampString)) {
    throw new Error('Expected argument of type model.QueryHistoricalDataWithTimeStampString');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_QueryHistoricalDataWithTimeStampString(buffer_arg) {
  return gdb_pb.QueryHistoricalDataWithTimeStampString.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_QueryLogsInfo(arg) {
  if (!(arg instanceof gdb_pb.QueryLogsInfo)) {
    throw new Error('Expected argument of type model.QueryLogsInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_QueryLogsInfo(buffer_arg) {
  return gdb_pb.QueryLogsInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_QueryRealTimeDataString(arg) {
  if (!(arg instanceof gdb_pb.QueryRealTimeDataString)) {
    throw new Error('Expected argument of type model.QueryRealTimeDataString');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_QueryRealTimeDataString(buffer_arg) {
  return gdb_pb.QueryRealTimeDataString.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_QuerySpeedHistoryDataString(arg) {
  if (!(arg instanceof gdb_pb.QuerySpeedHistoryDataString)) {
    throw new Error('Expected argument of type model.QuerySpeedHistoryDataString');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_QuerySpeedHistoryDataString(buffer_arg) {
  return gdb_pb.QuerySpeedHistoryDataString.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_Rows(arg) {
  if (!(arg instanceof gdb_pb.Rows)) {
    throw new Error('Expected argument of type model.Rows');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_Rows(buffer_arg) {
  return gdb_pb.Rows.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_UpdatedCalcInfo(arg) {
  if (!(arg instanceof gdb_pb.UpdatedCalcInfo)) {
    throw new Error('Expected argument of type model.UpdatedCalcInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_UpdatedCalcInfo(buffer_arg) {
  return gdb_pb.UpdatedCalcInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_UpdatedGroupColumnNamesInfo(arg) {
  if (!(arg instanceof gdb_pb.UpdatedGroupColumnNamesInfo)) {
    throw new Error('Expected argument of type model.UpdatedGroupColumnNamesInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_UpdatedGroupColumnNamesInfo(buffer_arg) {
  return gdb_pb.UpdatedGroupColumnNamesInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_UpdatedGroupNamesInfo(arg) {
  if (!(arg instanceof gdb_pb.UpdatedGroupNamesInfo)) {
    throw new Error('Expected argument of type model.UpdatedGroupNamesInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_UpdatedGroupNamesInfo(buffer_arg) {
  return gdb_pb.UpdatedGroupNamesInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_UpdatedUserInfo(arg) {
  if (!(arg instanceof gdb_pb.UpdatedUserInfo)) {
    throw new Error('Expected argument of type model.UpdatedUserInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_UpdatedUserInfo(buffer_arg) {
  return gdb_pb.UpdatedUserInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_UploadedFileInfo(arg) {
  if (!(arg instanceof gdb_pb.UploadedFileInfo)) {
    throw new Error('Expected argument of type model.UploadedFileInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_UploadedFileInfo(buffer_arg) {
  return gdb_pb.UploadedFileInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_UserInfo(arg) {
  if (!(arg instanceof gdb_pb.UserInfo)) {
    throw new Error('Expected argument of type model.UserInfo');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_UserInfo(buffer_arg) {
  return gdb_pb.UserInfo.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_UserInfos(arg) {
  if (!(arg instanceof gdb_pb.UserInfos)) {
    throw new Error('Expected argument of type model.UserInfos');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_UserInfos(buffer_arg) {
  return gdb_pb.UserInfos.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_UserName(arg) {
  if (!(arg instanceof gdb_pb.UserName)) {
    throw new Error('Expected argument of type model.UserName');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_UserName(buffer_arg) {
  return gdb_pb.UserName.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_model_UserToken(arg) {
  if (!(arg instanceof gdb_pb.UserToken)) {
    throw new Error('Expected argument of type model.UserToken');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_model_UserToken(buffer_arg) {
  return gdb_pb.UserToken.deserializeBinary(new Uint8Array(buffer_arg));
}


var GroupService = exports['model.Group'] = {
  addGroups: {
    path: '/model.Group/AddGroups',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.AddedGroupInfos,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_AddedGroupInfos,
    requestDeserialize: deserialize_model_AddedGroupInfos,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  deleteGroups: {
    path: '/model.Group/DeleteGroups',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.GroupNamesInfo,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_GroupNamesInfo,
    requestDeserialize: deserialize_model_GroupNamesInfo,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  getGroups: {
    path: '/model.Group/GetGroups',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: gdb_pb.GroupNamesInfo,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_model_GroupNamesInfo,
    responseDeserialize: deserialize_model_GroupNamesInfo,
  },
  getGroupProperty: {
    path: '/model.Group/GetGroupProperty',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.QueryGroupPropertyInfo,
    responseType: gdb_pb.GroupPropertyInfo,
    requestSerialize: serialize_model_QueryGroupPropertyInfo,
    requestDeserialize: deserialize_model_QueryGroupPropertyInfo,
    responseSerialize: serialize_model_GroupPropertyInfo,
    responseDeserialize: deserialize_model_GroupPropertyInfo,
  },
  updateGroupNames: {
    path: '/model.Group/UpdateGroupNames',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.UpdatedGroupNamesInfo,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_UpdatedGroupNamesInfo,
    requestDeserialize: deserialize_model_UpdatedGroupNamesInfo,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  updateGroupColumnNames: {
    path: '/model.Group/UpdateGroupColumnNames',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.UpdatedGroupColumnNamesInfo,
    responseType: gdb_pb.Cols,
    requestSerialize: serialize_model_UpdatedGroupColumnNamesInfo,
    requestDeserialize: deserialize_model_UpdatedGroupColumnNamesInfo,
    responseSerialize: serialize_model_Cols,
    responseDeserialize: deserialize_model_Cols,
  },
  deleteGroupColumns: {
    path: '/model.Group/DeleteGroupColumns',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.DeletedGroupColumnNamesInfo,
    responseType: gdb_pb.Cols,
    requestSerialize: serialize_model_DeletedGroupColumnNamesInfo,
    requestDeserialize: deserialize_model_DeletedGroupColumnNamesInfo,
    responseSerialize: serialize_model_Cols,
    responseDeserialize: deserialize_model_Cols,
  },
  addGroupColumns: {
    path: '/model.Group/AddGroupColumns',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.AddedGroupColumnsInfo,
    responseType: gdb_pb.Cols,
    requestSerialize: serialize_model_AddedGroupColumnsInfo,
    requestDeserialize: deserialize_model_AddedGroupColumnsInfo,
    responseSerialize: serialize_model_Cols,
    responseDeserialize: deserialize_model_Cols,
  },
  cleanGroupItems: {
    path: '/model.Group/CleanGroupItems',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.GroupNamesInfo,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_GroupNamesInfo,
    requestDeserialize: deserialize_model_GroupNamesInfo,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
};

var ItemService = exports['model.Item'] = {
  addItems: {
    path: '/model.Item/AddItems',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.AddedItemsInfo,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_AddedItemsInfo,
    requestDeserialize: deserialize_model_AddedItemsInfo,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  deleteItems: {
    path: '/model.Item/DeleteItems',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.DeletedItemsInfo,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_DeletedItemsInfo,
    requestDeserialize: deserialize_model_DeletedItemsInfo,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  getItems: {
    path: '/model.Item/GetItems',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.ItemsInfo,
    responseType: gdb_pb.GdbItems,
    requestSerialize: serialize_model_ItemsInfo,
    requestDeserialize: deserialize_model_ItemsInfo,
    responseSerialize: serialize_model_GdbItems,
    responseDeserialize: deserialize_model_GdbItems,
  },
  getItemsWithCount: {
    path: '/model.Item/GetItemsWithCount',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.ItemsInfo,
    responseType: gdb_pb.GdbItemsWithCount,
    requestSerialize: serialize_model_ItemsInfo,
    requestDeserialize: deserialize_model_ItemsInfo,
    responseSerialize: serialize_model_GdbItemsWithCount,
    responseDeserialize: deserialize_model_GdbItemsWithCount,
  },
  updateItems: {
    path: '/model.Item/UpdateItems',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.ItemsInfo,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_ItemsInfo,
    requestDeserialize: deserialize_model_ItemsInfo,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  checkItems: {
    path: '/model.Item/CheckItems',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.CheckItemsInfo,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_model_CheckItemsInfo,
    requestDeserialize: deserialize_model_CheckItemsInfo,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

var DataService = exports['model.Data'] = {
  batchWrite: {
    path: '/model.Data/BatchWrite',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.BatchWriteString,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_BatchWriteString,
    requestDeserialize: deserialize_model_BatchWriteString,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  batchWriteWithStream: {
    path: '/model.Data/BatchWriteWithStream',
    requestStream: true,
    responseStream: false,
    requestType: gdb_pb.BatchWriteString,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_BatchWriteString,
    requestDeserialize: deserialize_model_BatchWriteString,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  batchWriteHistoricalData: {
    path: '/model.Data/BatchWriteHistoricalData',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.BatchWriteHistoricalString,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_model_BatchWriteHistoricalString,
    requestDeserialize: deserialize_model_BatchWriteHistoricalString,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  batchWriteHistoricalDataWithStream: {
    path: '/model.Data/BatchWriteHistoricalDataWithStream',
    requestStream: true,
    responseStream: false,
    requestType: gdb_pb.BatchWriteHistoricalString,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_model_BatchWriteHistoricalString,
    requestDeserialize: deserialize_model_BatchWriteHistoricalString,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  getRealTimeData: {
    path: '/model.Data/GetRealTimeData',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.QueryRealTimeDataString,
    responseType: gdb_pb.GdbRealTimeData,
    requestSerialize: serialize_model_QueryRealTimeDataString,
    requestDeserialize: deserialize_model_QueryRealTimeDataString,
    responseSerialize: serialize_model_GdbRealTimeData,
    responseDeserialize: deserialize_model_GdbRealTimeData,
  },
  getHistoricalData: {
    path: '/model.Data/GetHistoricalData',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.QueryHistoricalDataString,
    responseType: gdb_pb.GdbHistoricalData,
    requestSerialize: serialize_model_QueryHistoricalDataString,
    requestDeserialize: deserialize_model_QueryHistoricalDataString,
    responseSerialize: serialize_model_GdbHistoricalData,
    responseDeserialize: deserialize_model_GdbHistoricalData,
  },
  getHistoricalDataWithStamp: {
    path: '/model.Data/GetHistoricalDataWithStamp',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.QueryHistoricalDataWithTimeStampString,
    responseType: gdb_pb.GdbHistoricalData,
    requestSerialize: serialize_model_QueryHistoricalDataWithTimeStampString,
    requestDeserialize: deserialize_model_QueryHistoricalDataWithTimeStampString,
    responseSerialize: serialize_model_GdbHistoricalData,
    responseDeserialize: deserialize_model_GdbHistoricalData,
  },
  getDbInfo: {
    path: '/model.Data/GetDbInfo',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: gdb_pb.GdbInfoData,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_model_GdbInfoData,
    responseDeserialize: deserialize_model_GdbInfoData,
  },
  getDbInfoHistory: {
    path: '/model.Data/GetDbInfoHistory',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.QuerySpeedHistoryDataString,
    responseType: gdb_pb.GdbHistoricalData,
    requestSerialize: serialize_model_QuerySpeedHistoryDataString,
    requestDeserialize: deserialize_model_QuerySpeedHistoryDataString,
    responseSerialize: serialize_model_GdbHistoricalData,
    responseDeserialize: deserialize_model_GdbHistoricalData,
  },
};

var PageService = exports['model.Page'] = {
  userLogin: {
    path: '/model.Page/UserLogin',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.AuthInfo,
    responseType: gdb_pb.UserToken,
    requestSerialize: serialize_model_AuthInfo,
    requestDeserialize: deserialize_model_AuthInfo,
    responseSerialize: serialize_model_UserToken,
    responseDeserialize: deserialize_model_UserToken,
  },
  userLogOut: {
    path: '/model.Page/UserLogOut',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.UserName,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_model_UserName,
    requestDeserialize: deserialize_model_UserName,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  getUserInfo: {
    path: '/model.Page/GetUserInfo',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.UserName,
    responseType: gdb_pb.UserInfo,
    requestSerialize: serialize_model_UserName,
    requestDeserialize: deserialize_model_UserName,
    responseSerialize: serialize_model_UserInfo,
    responseDeserialize: deserialize_model_UserInfo,
  },
  getUsers: {
    path: '/model.Page/GetUsers',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: gdb_pb.UserInfos,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_model_UserInfos,
    responseDeserialize: deserialize_model_UserInfos,
  },
  addUsers: {
    path: '/model.Page/AddUsers',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.AddUserInfo,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_AddUserInfo,
    requestDeserialize: deserialize_model_AddUserInfo,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  deleteUsers: {
    path: '/model.Page/DeleteUsers',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.UserName,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_UserName,
    requestDeserialize: deserialize_model_UserName,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  updateUsers: {
    path: '/model.Page/UpdateUsers',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.UpdatedUserInfo,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_UpdatedUserInfo,
    requestDeserialize: deserialize_model_UpdatedUserInfo,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  uploadFile: {
    path: '/model.Page/UploadFile',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.UploadedFileInfo,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_model_UploadedFileInfo,
    requestDeserialize: deserialize_model_UploadedFileInfo,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  uploadFileWithStream: {
    path: '/model.Page/UploadFileWithStream',
    requestStream: true,
    responseStream: false,
    requestType: gdb_pb.UploadedFileInfo,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_model_UploadedFileInfo,
    requestDeserialize: deserialize_model_UploadedFileInfo,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  addItemsByExcel: {
    path: '/model.Page/AddItemsByExcel',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.FileInfo,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_FileInfo,
    requestDeserialize: deserialize_model_FileInfo,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  importHistoryByExcel: {
    path: '/model.Page/ImportHistoryByExcel',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.HistoryFileInfo,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_model_HistoryFileInfo,
    requestDeserialize: deserialize_model_HistoryFileInfo,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  getLogs: {
    path: '/model.Page/GetLogs',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.QueryLogsInfo,
    responseType: gdb_pb.LogsInfo,
    requestSerialize: serialize_model_QueryLogsInfo,
    requestDeserialize: deserialize_model_QueryLogsInfo,
    responseSerialize: serialize_model_LogsInfo,
    responseDeserialize: deserialize_model_LogsInfo,
  },
  downloadFile: {
    path: '/model.Page/DownloadFile',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.FileInfo,
    responseType: gdb_pb.FileContents,
    requestSerialize: serialize_model_FileInfo,
    requestDeserialize: deserialize_model_FileInfo,
    responseSerialize: serialize_model_FileContents,
    responseDeserialize: deserialize_model_FileContents,
  },
};

var CalcService = exports['model.Calc'] = {
  addCalcItem: {
    path: '/model.Calc/AddCalcItem',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.AddedCalcItemInfo,
    responseType: gdb_pb.CalculationResult,
    requestSerialize: serialize_model_AddedCalcItemInfo,
    requestDeserialize: deserialize_model_AddedCalcItemInfo,
    responseSerialize: serialize_model_CalculationResult,
    responseDeserialize: deserialize_model_CalculationResult,
  },
  addCalcItemWithStream: {
    path: '/model.Calc/AddCalcItemWithStream',
    requestStream: true,
    responseStream: false,
    requestType: gdb_pb.AddedCalcItemInfo,
    responseType: gdb_pb.CalculationResults,
    requestSerialize: serialize_model_AddedCalcItemInfo,
    requestDeserialize: deserialize_model_AddedCalcItemInfo,
    responseSerialize: serialize_model_CalculationResults,
    responseDeserialize: deserialize_model_CalculationResults,
  },
  getCalcItems: {
    path: '/model.Calc/GetCalcItems',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.QueryCalcItemsInfo,
    responseType: gdb_pb.CalcItemsInfo,
    requestSerialize: serialize_model_QueryCalcItemsInfo,
    requestDeserialize: deserialize_model_QueryCalcItemsInfo,
    responseSerialize: serialize_model_CalcItemsInfo,
    responseDeserialize: deserialize_model_CalcItemsInfo,
  },
  updateCalcItem: {
    path: '/model.Calc/UpdateCalcItem',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.UpdatedCalcInfo,
    responseType: gdb_pb.CalculationResult,
    requestSerialize: serialize_model_UpdatedCalcInfo,
    requestDeserialize: deserialize_model_UpdatedCalcInfo,
    responseSerialize: serialize_model_CalculationResult,
    responseDeserialize: deserialize_model_CalculationResult,
  },
  startCalcItem: {
    path: '/model.Calc/StartCalcItem',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.CalcId,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_CalcId,
    requestDeserialize: deserialize_model_CalcId,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  stopCalcItem: {
    path: '/model.Calc/StopCalcItem',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.CalcId,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_CalcId,
    requestDeserialize: deserialize_model_CalcId,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
  deleteCalcItem: {
    path: '/model.Calc/DeleteCalcItem',
    requestStream: false,
    responseStream: false,
    requestType: gdb_pb.CalcId,
    responseType: gdb_pb.Rows,
    requestSerialize: serialize_model_CalcId,
    requestDeserialize: deserialize_model_CalcId,
    responseSerialize: serialize_model_Rows,
    responseDeserialize: deserialize_model_Rows,
  },
};

