/**
 * Device.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  //connection: 'sqlserver',
  tableName: 'MOBILE_DEVICE',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      autoIncrement: true,
      columnName: 'ID'
    },

    deviceId: {
      type: 'string',
      required: true,
      columnName: 'DEVICE_ID'
    },

    macAddress: {
      type: 'string',
      required: true,
      columnName: 'MAC_ADDRESS'
    },

    activeTime: {
      type: 'datetime',
      required: true,
      columnName: 'ACTIVE_TIME'
    },

    activeCode: {
      type: 'string',
      required: true,
      columnName: 'ACTIVE_CODE'
    },

    activeState: {
      type: 'string',
      required: true,
      columnName: 'ACTIVE_STATE'
    },

    deviceState: {
      type: 'string',
      required: true,
      columnName: 'DEVICE_STATE'
    }
  }
};

