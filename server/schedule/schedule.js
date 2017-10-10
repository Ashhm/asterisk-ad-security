import schedule from 'node-schedule';
import * as ldapServices from '../services/ldapServices';
import * as asteriskServices from '../services/asteriskServies';
import pwdGenerator from '../services/pwdGenerator';

import {scheduleConfig} from '../config/services.json';
import {ldapConfig} from '../config/services.json';

//format config cause schedule accept only digits and null
Object.keys(scheduleConfig).forEach(key => {
  scheduleConfig[key] = typeof scheduleConfig[key] === 'number' ?
      scheduleConfig[key] : null;
});

const job = schedule.scheduleJob(scheduleConfig, async function () {
  const {username, password} = ldapConfig;

  //creating connection with ldap and fetching username/mobile number
  await ldapServices.clientAuth({username, password});
  const result = await ldapServices.searchGroupMembers();

  //reducing array of users
  //dropping users w/o mobile number!!!
  const data = result.reduce((users, current) => {
    return users.concat(current.mobile ?
      {
        text: `Добрый день, ${current.cn}. Ваш новый пароль для входа ${pwdGenerator()}`,
        number: current.mobile
      } : [])
  }, []);

  await asteriskServices.sendSMS(data);
});

export default job;