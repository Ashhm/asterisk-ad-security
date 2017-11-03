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

  const users = result.map(current => {
    return {
      name: current.cn,
      container: current.dn,
      mobile: current.mobile,
      password: pwdGenerator()
    };
  });
  //reducing array of users
  //dropping users w/o mobile number!!!
  const data = users.reduce((messages, current) => {
    return messages.concat(current.mobile ?
      {
        text: `Добрый день, ${current.name}. Ваш новый пароль для входа ${current.password}`,
        number: current.mobile
      } : [])
  }, []);

  //if! password change return with error no sms change should fire
  try {
    await ldapServices.changePassword(users);
    await asteriskServices.sendSMS(data);
  } catch (err) {
    console.error(err);
  }

});

export default job;