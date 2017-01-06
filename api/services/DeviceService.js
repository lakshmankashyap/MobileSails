
module.exports = {
  getOnlineUsers : function (options, done) {
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
            deviceId: record.deviceId
          });
        }
      }

      return done(null, results);
    });
  }
};
