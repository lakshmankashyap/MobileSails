/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * get all devices
 * @param req
 * @param res
 * @returns {*}
 */
function getAllDevices(req, res) {
  let errorResult = ConstantService.errorResult;
  let successResult = ConstantService.successResult;

  if (req.method !== 'GET') {
    errorResult.message = ConstantService.getMust;
    return res.json(errorResult);
  }

  return Device.find({}).exec(function (err, records) {
    if (err) {
      sails.log.err(err);
      errorResult.message = err.message ? err.message : ConstantService.resultError;
      return res.json(errorResult);
    }

    successResult.data = records;
    return res.json(successResult);
  });
}

/**
 * create a new device
 * @param req
 * @param res
 * @returns {*}
 */
function createNewDevice(req, res) {
  let errorResult = ConstantService.errorResult;
  let successResult = ConstantService.successResult;
  let method = req.method;
  let body = req.body;

  if (method !== 'PUT') {
    errorResult.message = ConstantService.putMust;
    return res.json(errorResult);
  } else if (!body || !body.macAddress || !body.activeTime || !Number.isFinite(body.activeTime)) {
    errorResult.message = ConstantService.bodyError;
    return res.json(errorResult);
  }

  let device = {
    deviceId: body.macAddress,
    macAddress: body.macAddress,
    activeTime: new Date(body.activeTime),
    activeCode: ConstantService.activeCode,
    activeState: body.activeState ? body.activeState : ConstantService.activeState,
    deviceState: body.deviceState ? body.deviceState : ConstantService.deviceState
  };

  return Device.findOrCreate({macAddress: body.macAddress}, device).exec(function (err, newDevice) {
    if (err) {
      errorResult.message = err.message ? err.message : ConstantService.resultError;
      return res.json(errorResult);
    }

    successResult.data = null;
    return res.json(successResult);
  });
}

/**
 * update an existing device
 * @param req
 * @param res
 * @returns {*}
 */
function updateDevice(req, res) {
  let errorResult = ConstantService.errorResult;
  let successResult = ConstantService.successResult;
  let id = Number.parseInt(req.param('id'));
  let method = req.method;
  let body = req.body;

  if (method !== 'POST') {
    errorResult.message = ConstantService.postMust;
    return res.json(errorResult);
  } else if (Number.isNaN(id)) {
    errorResult.message = ConstantService.paramError;
    return res.json(errorResult);
  } else if (!body || !body.macAddress
    || !body.activeTime || !Number.isFinite(body.activeTime)) {
    errorResult.message = ConstantService.bodyError;
    return res.json(errorResult);
  }

  let device = {
    macAddress: body.macAddress,
    activeTime: new Date(body.activeTime)
  };

  if (body.activeState) {
    device.activeState = body.activeState;
  }

  if (body.deviceState) {
    device.deviceState = body.deviceState;
  }

  return Device.update({id: id}, device).exec(function (err, updated) {
    if (err) {
      errorResult.message = err.message ? err.message : ConstantService.resultError;
      return res.json(errorResult);
    }

    successResult.data = null;
    return res.json(successResult);
  });
}

/**
 * delete a device
 * @param req
 * @param res
 * @returns {*}
 */
function deleteDevice(req, res) {
  let errorResult = ConstantService.errorResult;
  let successResult = ConstantService.successResult;
  let id = Number.parseInt(req.param('id'));
  let method = req.method;

  if (method !== 'DELETE') {
    errorResult.message = ConstantService.deleteMust;
    return res.json(errorResult);
  } else if (Number.isNaN(id)) {
    errorResult.message = ConstantService.paramError;
    return res.json(errorResult);
  }

  return Device.destroy({id: id}).exec(function (err) {
    if (err) {
      errorResult.message = err.message ? err.message : ConstantService.resultError;
      return res.json(errorResult);
    }

    successResult.data = null;
    return res.json(successResult);
  });
}

module.exports = {
  _config: {
    actions: true,
    shortcuts: false,
    rest: false
  },

  // GET: device/all
  all: getAllDevices,
  // PUT: device/new
  new: createNewDevice,
  // POST: device/update
  update: updateDevice,
  // DELETE: device/delete
  delete: deleteDevice
};

