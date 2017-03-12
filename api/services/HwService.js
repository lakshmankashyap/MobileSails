//let md5 = require('md5');
let https = require('https');
let urlencode = require('urlencode');

function getAccessToken() {
  function parseBody(body) {
    let token = "";
    try {
      let data = JSON.parse(body);
      if (data && data.hasOwnProperty('access_token')) {
        token = data['access_token'];
      }
    } catch(err) {
      console.error(err);
    }

    return token;
  }

  return new Promise((resolve, reject) => {
    let postBody = `grant_type=client_credentials&client_id=10840871&client_secret=2cf16a6690f221fff3fa0723adc09605`;
    let options = {
      hostname: "login.vmall.com",
      path: '/oauth2/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postBody)
      }
    };

    let req = https.request(options, res => {
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
        if (statusCode != 200) {
          reject("statusCode: " + statusCode + ", body: " + body);
        } else {
          resolve(parseBody(body));
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

function getDeviceToken(accessToken) {
  return new Promise((resolve, reject) => {
    resolve({
      accessToken: accessToken,
      deviceToken: '0863272035630137300000290000CN01'
    });
  });
}

function publish(tokens) {
  return new Promise((resolve, reject) => {
    if (!tokens || !tokens.hasOwnProperty('accessToken') || !tokens.hasOwnProperty('deviceToken')) {
      return reject('token is error');
    }

    // `CFjOg9UVFlUhjsF%2f8jJFYaPSvUqtKQVT4iBvbXm8kZydhTpzFhCvrcPYIYndGhZ13vPZVpg6AWjd%2fg4MoApLfg%3d%3d`
    let access_token = urlencode(tokens['accessToken']);
    // '0863272035630137300000290000CN01'
    let deviceToken = tokens['deviceToken'];
    let nsp_ts = Math.floor(new Date().getTime() / 1000);
    // &access_token=&deviceToken=&nsp_ts=
    let postBody = 'push_type=1&message=wake up&priority=0&cacheMode=1&msgType=1&nsp_svc=openpush.message.single_send'
      + `&access_token=${access_token}&deviceToken=${deviceToken}&nsp_ts=${nsp_ts}`;
    let options = {
      hostname: "api.vmall.com",
      //port: 80,
      path: '/rest.php',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postBody)
      }
    };

    let req = https.request(options, res => {
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

function send() {
  return new Promise((resolve, reject) => {
    getAccessToken()
      .then(data => {
        return getDeviceToken(data);
      })
      .then(data => {
        return publish(data);
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
