/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  _config: {
    actions: true,
    shortcuts: false,
    rest: false
  },

  all: function (req, res) {
    if (req.method !== 'GET') {
      let errorResult = ConstantService.errorResult;
      errorResult.message = ConstantService.getMust;
      return res.json(errorResult);
    }

    return Device.find({}).exec(function (err, records) {
      if (err) {
        sails.log.err(err);
        let errorResult = ConstantService.errorResult;
        errorResult.message = err.message;
        return res.json(errorResult);
      }

      let successResult = ConstantService.successResult;
      successResult.data = records;
      return res.json(successResult);
    });
  },

  new: function (req, res) {
    let method = req.method;
    let body = req.body;
    if (method !== 'PUT') {
      let errorResult = ConstantService.errorResult;
      errorResult.message = ConstantService.putMust;
      return res.json(errorResult);
    } else if (!body || !body.macAddress
      || !body.activeTime || !Number.isFinite(body.activeTime)) {
      let errorResult = ConstantService.errorResult;
      errorResult.message = ConstantService.bodyError;
      return res.json(errorResult);
    }

    let device = {
      deviceId: body.macAddress,
      macAddress: body.macAddress,
      activeTime: new Date(body.activeTime),
      activeCode: ConstantService.activeCode,
      activeState: ConstantService.activeState,
      deviceState: ConstantService.deviceState
    };

    return Device.findOrCreate({macAddress: body.macAddress}, device).exec(function (err, newDevice) {
      if (err) {
        let errorResult = ConstantService.errorResult;
        errorResult.message = err.message;
        return res.json(errorResult);
      }

      let successResult = ConstantService.successResult;
      successResult.data = null;
      return res.json(successResult);
    });
  }
};

