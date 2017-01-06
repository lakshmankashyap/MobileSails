/**
 * MessageController
 *
 * @description :: Server-side logic for managing rabbitmqs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let timer = require('timers');

let errorResult = {
  code: -1,
  statusCode: 200,
  message: 'param is error'
};

let successResult = {
  code: 0,
  statusCode: 200,
  message: null
};

function push(req, res) {
  let userId = req.param('userId');
  let body = req.body;
  let method = req.method;
  if (method !== 'POST') {
    errorResult.message = 'POST method is must';
    return res.json(errorResult);
  } else if (!userId) {
    errorResult.message = 'userId is error';
    return res.json(errorResult);
  } else if (!body) {
    errorResult.message = 'body is error';
    return res.json(errorResult);
  }

  let data;
  try {
    data = JSON.stringify(body);
  } catch (err) {
    errorResult.message = err;
    return res.json(errorResult);
  }

  if (!data) {
    errorResult.message = 'body is error';
    return res.json(errorResult);
  }

  return PushService.send(userId, data)
    .then(ok => {
      console.log("\<push\>success userId: " + userId + ", data: " + data);
      return res.json(successResult);
    })
    .catch(err => {
      console.log("\<push\>" + err);
      errorResult.message = 'failure to push a message';
      return res.json(errorResult);
    });
}

timer.setTimeout(() => {
  try {
    PullService.receive();
  } catch (err) {
    console.error(err);
  }
}, 10000);

module.exports = {
  _config: {
    actions: true,
    shortcuts: false,
    rest: false
  },

  // message/push?userId={userId}
  push: push
};

