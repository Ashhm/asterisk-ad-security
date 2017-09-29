import osms from 'openvox-sms';

import {asteriskConfig} from '../config/servicess.json';

const {host, port, username, password, span} = asteriskConfig;

const sms = new osms({
    host,
    port,
    username,
    password
});

//listeners
sms.on('connect', () => {
    sms.keepConnected();
});

sms.on('close', evt => {
    console.log('close', evt);
});

sms.on('end', evt => {
    console.log('end', evt);
});

sms.on('error', err => {
    console.log(err);
});

export const sendSMS = (data) => {
    //adding SIM card slot for sending SMS
    data.span = span;
    return new Promise((resolve, reject) => {
        if (!sms.isConnected()) {
            sms.sendSMS(data, (err, response) => {
                if (err)
                    console.log(err);

                sms.close(() => {
                    console.log('close after sms');

                    if (sms.isConnected()) {
                        console.log('connected');
                    } else {
                        console.log('not connected');
                    }
                });

            })
        }
    })
};