import schedule from 'node-schedule';
import * as ldapServices from '../services/ldapServices';
import * as asteriskController from '../controllers/asterisk';

import {scheduleConfig} from '../config/config.json';


const job = schedule.scheduleJob(scheduleConfig, async function() {
    console.log(`time is now ${Date.now()}`);
    let result = await ldapServices.searchGroupMembers('SENDSMS');

    result = result.filter(user => {
        if (user.mobile) return user;
    }).map(user => {
        return {
            username: user.cn,
            number: user.mobile
        }
        });

    console.log(result)
});

export default job;