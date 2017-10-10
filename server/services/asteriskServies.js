import osms from 'openvox-sms';

import {asteriskConfig} from '../config/services.json';

//connection handler. some why new OSMS options need !!!secret!!! option
//instead password
function connectionHandler() {
  const {host, port, username, password} = asteriskConfig;

  const sms = new osms({
    host,
    port,
    username,
    secret: password
  });

  return new Promise((resolve, reject) => {
    sms.on('connect', () => {
      resolve(sms);
    });
    sms.on('error', err => {
      reject(err);
    });
  });
}

export const sendSMS = (data) => {
  const {span} = asteriskConfig;
  data.span = span;
  return new Promise(async (resolve, reject) => {
    let client = null;

    try {
      client = await connectionHandler();
    } catch (err) {
      reject(err);
    }

    if (!client)
      reject(new Error('Asterisk client is null!'));

    if (!client.isConnected())
      reject(new Error('Asterisk client is exist but not connected!'));

    client.sendSMS(data, (err, res) => {
      if (err) {
        reject(err);
      }
      client.close(()=> {
        resolve('SMS has been send');
      });
    });
  })
};
