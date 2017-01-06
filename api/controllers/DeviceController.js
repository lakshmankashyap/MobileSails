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
    return Device.find({}).exec(function (err, records) {
      if (err) {
        return res.serverError(err);
      }
      //sails.log('Wow, there are %d users named Finn.  Check it out:', usersNamedFinn.length, usersNamedFinn);
      return res.json(records);
    });
  }
};

