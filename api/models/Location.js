/**
 * Location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  //connection: 'sqlserver',
  tableName: 'MOBILE_LOCATION',
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName: 'ID'
    },

    locationType : {
      type: 'string',
      required: true,
      columnName: 'LOCATION_TYPE'
    },

    longitude : {
      type: 'float',
      required: true,
      columnName: 'LONGITUDE'
    },

    latitude : {
      type: 'float',
      required: true,
      columnName: 'LATITUDE'
    },

    radius : {
      type: 'float',
      required: true,
      columnName: 'RADIUS'
    },

    altitude : {
      type: 'float',
      columnName: 'ALTITUDE'
    },

    direction : {
      type: 'float',
      required: true,
      columnName: 'DIRECTION'
    },

    speed : {
      type: 'float',
      columnName: 'SPEED'
    },

    operators : {
      type: 'string',
      columnName: 'OPERATORS'
    },

    country : {
      type: 'string',
      columnName: 'COUNTRY'
    },

    province : {
      type: 'string',
      columnName: 'PROVINCE'
    },

    city : {
      type: 'string',
      columnName: 'CITY'
    },

    district : {
      type: 'string',
      columnName: 'DISTRICT'
    },

    street : {
      type: 'string',
      columnName: 'STREET'
    },

    streetNumber : {
      type: 'integer',
      columnName: 'STREET_NUMBER'
    },

    floors : {
      type: 'integer',
      columnName: 'FLOORS'
    },

    time : {
      type: 'date',
      required: true,
      columnName: 'TIME'
    },

    userId : {
      type: 'string',
      required: true,
      columnName: 'USER_ID'
    },

    deviceId: {
      type: 'string',
      required: true,
      columnName: 'DEVICE_ID'
    },

    extend : {
      type: 'string',
      columnName: 'EXTEND'
    },
  }
};

