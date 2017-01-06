let amqp = require('amqplib');
const prefix = 'mqtt-subscription-';
const suffix = 'qos0';

function getOnlineUsers() {
  return new Promise((resolve, reject) => {
    DeviceService.getOnlineUsers({}, (err, results) => {
      return err ? reject(err) : resolve(results);
    });
  });
}

function fetchOne(userId, deviceId) {
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
                return ch.consume(q, msg => {
                  if (msg !== null) {
                    console.log(msg.content.toString());
                    ch.ack(msg);
                    resolve({
                      userId: userId,
                      deviceId: deviceId,
                      msg: msg
                    });
                  }
                });
              });
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

function fetchAll(users) {
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    if (user.deviceId !== "352584065447226") {
      continue;
    }

    fetchOne(user.userId, "Androidrrrrt")
      .then(result => {
        console.log(result);
      }).catch(err => {
        console.error(err);
    });
  }
}

function receive() {
  getOnlineUsers()
    .then(data => {
      if (Array.isArray(data) && (data.length > 0)) {
        fetchAll(data);
      } else {
        console.log('no user is online');
      }
    })
    .catch(err => {
      console.error(err);
    });
}

module.exports = {
  receive: receive
};
