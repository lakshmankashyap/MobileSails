/**
 * MessageController
 *
 * @description :: Server-side logic for managing rabbitmqs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let timer = require('timers');
const tag = "\<MessageController\>";

function push(req, res) {
  let userId = Number.parseInt(req.param('userId'));
  let body = req.body;
  let method = req.method;
  let errorResult = ConstantService.errorResult;
  let successResult = ConstantService.successResult;
  if (method !== 'POST') {
    errorResult.message = ConstantService.postMust;
    return res.json(errorResult);
  } else if (Number.isNaN(userId)) {
    errorResult.message = ConstantService.paramError;
    return res.json(errorResult);
  } else if (!body) {
    errorResult.message = ConstantService.bodyError;
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
    errorResult.message = ConstantService.bodyError;
    return res.json(errorResult);
  }

  return PushService.send(userId, data)
    .then(ok => {
      console.log(tag, "success userId: " + userId + ", data: " + data);
      successResult.data = null;
      return res.json(successResult);
    })
    .catch(err => {
      console.log(tag, err);
      errorResult.message = 'failure to push a message';
      return res.json(errorResult);
    });
}

// function pull(interval) {
//   let timeOut = setTimeout(() => {
//     clearTimeout(timeOut);
//     try {
//       PullService.receive();
//     } catch (err) {
//       console.error(err);
//     }
//   }, 10000);
// }

//pull();

function umengPush(req, res) {
  let userId = Number.parseInt(req.param('userId'));
  let body = req.body;
  let method = req.method;
  let errorResult = ConstantService.errorResult;
  let successResult = ConstantService.successResult;
  if (method !== 'POST') {
    errorResult.message = ConstantService.postMust;
    return res.json(errorResult);
  } else if (Number.isNaN(userId)) {
    errorResult.message = ConstantService.paramError;
    return res.json(errorResult);
  } else if (!body) {
    errorResult.message = ConstantService.bodyError;
    return res.json(errorResult);
  }

  return UmengService.send(userId, body)
    .then(ok => {
      console.log(tag, "success userId: " + userId + ", data: " + body);
      successResult.data = null;
      return res.json(successResult);
    })
    .catch(err => {
      console.log(tag, err);
      errorResult.message = 'failure to push a message';
      return res.json(errorResult);
    });
}

function hwPush(req, res) {
  // let userId = Number.parseInt(req.param('userId'));
  // let body = req.body;
  // let method = req.method;
  // let errorResult = ConstantService.errorResult;
  // let successResult = ConstantService.successResult;
  // if (method !== 'POST') {
  //   errorResult.message = ConstantService.postMust;
  //   return res.json(errorResult);
  // } else if (Number.isNaN(userId)) {
  //   errorResult.message = ConstantService.paramError;
  //   return res.json(errorResult);
  // } else if (!body) {
  //   errorResult.message = ConstantService.bodyError;
  //   return res.json(errorResult);
  // }

  return HwService.send()
    .then(ok => {
      // console.log(tag, "success userId: " + userId + ", data: " + body);
      // successResult.data = null;
      return res.json("push is successful");
    })
    .catch(err => {
      // console.log(tag, err);
      // errorResult.message = 'failure to push a message';
      return res.json("fail");
    });
}

module.exports = {
  _config: {
    actions: true,
    shortcuts: false,
    rest: false
  },

  // message/push?userId={userId}
  push: push,
  umengPush: umengPush,
  hwPush: hwPush
};

