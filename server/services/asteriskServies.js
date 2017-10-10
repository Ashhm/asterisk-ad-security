import osms from 'openvox-sms';
import asyncForEach from 'async/each';

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

    const sendSMS = (data) => {
      data.span = span;
      client.sendSMS(data);
      return;
    };

    asyncForEach(data, sendSMS, err => {
      if (err)
        console.log(err);
      console.log(`smsSend`)
      resolve();
    });

  });
};

