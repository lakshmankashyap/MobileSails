let md5 = require('md5');
let http = require('http');

const hostName = 'msg.umeng.com';
const port = 80;
const postMethod = 'POST';
const sendUrl = 'http://msg.umeng.com/api/send';
const appKey = '587c394ec8957640d8000aaf';
const appMasterSecret = 'd6jdf0fjrdy05aspgmuwobsulnw4auez';

function getUser(userId) {
  return new Promise((resolve, reject) => {
    DeviceService.getOnlineDevices(userId, (err, results) => {
      if (err) {
        return reject(err);
      } else {
        let deviceTokens = [];
        for (let i = 0; i < results.length; i++) {
          let result = results[i];
          if ((result.userId == userId) && result.extend) {
            try {
              let extend = JSON.parse(result.extend);
              if (extend.hasOwnProperty("deviceToken") && extend.deviceToken) {
                deviceTokens.push(extend.deviceToken);
              }
            } catch (err) {
              console.error(err);
            }
          }
        }

        if (deviceTokens.length > 0) {
          return resolve(deviceTokens.join());
        } else {
          return reject('userId: ' + userId + ' is not found!');
        }
      }
    });
  });
}

function publish(userId, deviceTokens, message) {
  return new Promise((resolve, reject) => {
    // type
    if (!message.hasOwnProperty('type')) {
      return reject('this message has no type');
    }

    let name;
    for (let item of ConstantService.messages) {
      if (item.type == message.type) {
        name = item.name;
        break;
      }
    }

    if (!name) {
      return reject('the type of this message is error');
    }

    // content array
    if (!message.hasOwnProperty('content')
      || (!message.content instanceof Array)
      || (message.content.length <= 0)) {
      return reject('this message has no content');
    }

    console.dir(message);

    let params = {
      'appkey': appKey,
      'timestamp': new Date().getTime(),
      'device_tokens': deviceTokens,
      'type': 'unicast',
      'payload': {
        'body': {
          'ticker': '新消息',
          'title': name,
          'text': JSON.stringify(message),
          'after_open': 'go_app'
        },
        'display_type': 'notification'
      },
      'production_mode': 'true'
    };
    let postBody = JSON.stringify(params);
    let sign = md5(postMethod + sendUrl + postBody + appMasterSecret);

    let options = {
      hostname: hostName,
      port: port,
      path: '/api/send?sign=' + sign,
      method: postMethod,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Content-Length': Buffer.byteLength(postBody)
      }
    };

    let req = http.request(options, res => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      let statusCode = res.statusCode;
      let body;
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
        body = chunk;
      });
      res.on('end', () => {
        console.log('No more data in response.');
        if (statusCode != 200) {
          reject("statusCode: " + statusCode + ", body: " + body);
        } else {
          resolve("ok");
        }
      });
    });

    req.on('error', e => {
      console.error(`problem with request: ${e.message}`);
      reject(e);
    });

    // write data to request body
    req.write(postBody);
    req.end();
  });
}

function send(userId, message) {
  return new Promise((resolve, reject) => {
    getUser(userId)
      .then(data => {
        return publish(userId, data, message);
      })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  send: send
};
