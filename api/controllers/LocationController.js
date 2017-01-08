/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  _config: {
    actions: true,
    shortcuts: false,
    rest: false
  },

  list: function (req, res) {
    let method = req.method;
    let userId = Number.parseInt(req.param('userId'));
    let since = Number.parseInt(req.param('since'));
    let count = Number.parseInt(req.param('count'));
    if (method !== 'GET') {
      let errorResult = ConstantService.errorResult;
      errorResult.message = ConstantService.getMust;
      return res.json(errorResult);
    } else if (Number.isNaN(userId)) {
      let errorResult = ConstantService.errorResult;
      errorResult.message = ConstantService.paramError;
      return res.json(errorResult);
    }

    if (Number.isNaN(since) || (since < 0)) {
      since = 0;
    }

    if (Number.isNaN(count) || (count <= 0) || (count > 100)) {
      count = 100;
    }

    return Location.find({
      where: {userId: userId},
      skip: since,
      limit: count,
      sort: 'time DESC'
    }).exec(function (err, records) {
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
  }
};

