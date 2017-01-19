let amqp = require('amqplib');
const prefix = 'mqtt-subscription-';
const suffix = 'qos0';
//const q = 'mqtt-subscription-352584065447226qos0';

function getOnlineUser(userId) {
  return new Promise((resolve, reject) => {
    DeviceService.getOnlineUsers(false, (err, results) => {
      if (err) {
        return reject(err);
      } else {
        for (let i = 0; i < results.length; i++) {
          let result = results[i];
          if ((result.userId == userId) && result.deviceId) {
            return resolve(result.deviceId);
          }
        }

        return reject('userId: ' + userId + ' is not found!');
      }
    });
  });
}

function publish(userId, deviceId, content) {
  return new Promise((resolve, reject) => {
    amqp.connect(ConfigService.rabbitmqUrl)
      .then(conn => {
        conn.on("error", err => {
          return reject(err);
        });

        let q = prefix + deviceId + suffix;
        return conn.createChannel()
          .then(function (ch) {
            return ch.checkQueue(q)
              .then(function (ok) {
                return ch.sendToQueue(q, new Buffer(content));
              })
              .then(function (ok) {
                return ch.close();
              })
              .then(conn.close.bind(conn));
          })
          .then(() => {
            resolve('success');
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}

function send(userId, content) {
  return new Promise((resolve, reject) => {
    getOnlineUser(userId)
      .then(data => {
        return publish(userId, data, content);
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
