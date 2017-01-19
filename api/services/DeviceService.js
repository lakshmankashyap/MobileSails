
function getUsersWithExtend(done) {
  let date = new Date();
  let time = date.getTime() + ConfigService.timeZone; // 8-hour time zone
  time -= ConfigService.pushPeriod;
  date.setTime(time);
  Location.find({ time: { '>=': date }}).exec(function (err, records) {
    if (err) {
      return done(err);
    }

    let results = [];
    let found = false;
    for (let i = 0; i < records.length; i++) {
      let record = records[i];
      if (!record.extend) {
        continue;
      }

      found = false;
      for (let j = 0; j < results.length; j++) {
        let result = results[j];
        if ((record.userId == result.userId) && (record.extend == result.extend)) {
          found = true;
          break;
        }
      }

      if (!found) {
        results.push({
          userId: record.userId,
          deviceId: record.deviceId,
          extend: record.extend
        });
      }
    }

    return done(null, results);
  });
}

function getUsers(done) {
  let date = new Date();
  let time = date.getTime() + ConfigService.timeZone; // 8-hour time zone
  time -= ConfigService.pushPeriod;
  date.setTime(time);
  Location.find({ time: { '>=': date }}).exec(function (err, records) {
    if (err) {
      return done(err);
    }

    let results = [];
    let found = false;
    for (let i = 0; i < records.length; i++) {
      let record = records[i];
      found = false;
      for (let j = 0; j < results.length; j++) {
        let result = results[j];
        if (record.userId == result.userId) {
          found = true;
          break;
        }
      }

      if (!found) {
        results.push({
          userId: record.userId,
          deviceId: record.deviceId,
          extend: record.extend
        });
      }
    }

    return done(null, results);
  });
}

function getOnlineUsers(isUsingExtend, done) {
  if (isUsingExtend) {
    getUsersWithExtend(done);
  } else {
    getUsers(done);
  }
}


module.exports = {
  getOnlineUsers : getOnlineUsers
};
