import osms from 'openvox-sms';

import {asteriskConfig} from '../config/config.json';

const {host, port, username, password, span} = asteriskConfig;

const sms = osms({
    host,
    port,
    username,
    password
});

//listeners
sms.on('connect', err => {
    console.log(err);
});

sms.on('close', function (e) {
    console.log('close', e);
});

sms.on('end', function (e) {
    console.log('end', e);
});

sms.on('error', function (err) {
    console.log('error', err);
});

export const sendSMS = (data) => {
    //adding SIM card slot for sending SMS
    data.span = span;

    return new Promise(function (resolve, reject) {
        if (!sms.isConnected())
            reject(new Error(`Asterisk interface isn\`t connected`));

        sms.sendSMS(data, (err, response) => {
            if (err)
                reject(err);

            sms.close(function () {
                console.log('close after sms');

                if (sms.isConnected()) {
                    console.log('connected');
                } else {
                    console.log('not connected');
                }
                //process.exit(0);
            });

        })
    })  
};