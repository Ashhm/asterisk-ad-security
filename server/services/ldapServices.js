import ldap from 'ldapjs';
import asyncMap from 'async/map';
import asyncEach from 'async/each';

import {ldapConfig} from '../config/services.json';

let client = null;

//need to check connection setup
function connectionHandler() {
  const {url} = ldapConfig;

  return new Promise((resolve, reject) => {
    if (client) {
      if (client.connected) {
        resolve('Connection established');
      } else {
        client.unbind(err => {
          if (err)
            reject(err);
        });
      }
    }

    client = ldap.createClient({url}, err => {
      reject(err);
    });

    client.on('connect', () => {
      resolve('Connection established');
    });
  })
}

//changing pass function
function modifyPassword(user, done) {
  const encodePassword = password => {
    const newPass = [].__proto__.reduce.call(password, (acum, letter) => {
      return acum += String.fromCharCode(letter & 0xFF, (letter >>> 8) & 0xFF);
    }, '');
    return newPass;
  };

  return new Promise((resolve, reject) => {
    if(!client.connected) {
      reject(new Error('Connection lost!'));
    }
    client.modify(user.container,
      new ldap.Change({
        operation: 'replace',
        modification: {
          unicodePwd: encodePassword(user.password)
        }
      })
      , err => {
        if (err) {
          reject(err);
        }
        else {
          resolve();
          done();
        }
      });
  });
}

//binding client to specific username/password
//for schedule - take credentials from config
export async function clientAuth(data) {
  let connectionErr = null;
  //first of all need to check connection!
  try {
    await connectionHandler();
  } catch (err) {
    connectionErr = err;
  }

  const {username, password} = data;
  return new Promise((resolve, reject) => {
    if(!username||!password) {
      reject(new Error('Missing authentication data!'));
    }
    if (connectionErr)
      reject(connectionErr);

    client.bind(username, password, err => {
      if (err) {
        reject(err);
      }
      resolve({username});
    });
  })
}

export function searchUser(containerName, done) {

  const options = {
    scope: 'sub',
    attributes: ['cn', 'mobile']
  };

  return new Promise((resolve, reject) => {
    if(!client.connected) {
      reject(new Error('Connection lost!'));
    }
    client.search(containerName, options, (err, res) => {
      if (err)
        reject(err);

      const data = [];

      //listening events! on 'end' - resolve with result
      res.on('searchEntry', (entry) => {
        data.push(entry.object);
      });
      res.on('error', (err) => {
        reject(err);
      });
      res.on('end', () => {
        resolve(...data);
        done(null, ...data);//for async mapping
      });
    })
  })
}

//excluded attributes and scope from config
export function searchGroupMembers() {
  const {baseDN, groupDN} = ldapConfig;

  const options = {
    filter: (`cn=${groupDN}`),
    scope: 'sub',
    attributes: 'member'
  };

  return new Promise((resolve, reject) => {
    if(!client.connected) {
      reject(new Error('Connection lost!'));
    }
    client.search(baseDN, options, (err, res) => {
      if (err)
        reject(err);
      const data = [];

      //listening events! on 'end' - resolve with result
      res.on('searchEntry', ({object}) => {
        data.push(object['member']);
      });
      res.on('error', (err) => {
        reject(err);
      });
      res.on('end', () => {
        if (!data || data.length < 1)
          reject(
            new Error(`${groupName} is Empty or don\`t exist!`)
          );

        //async mapping of result array to get a modified user containers
        asyncMap(...data, searchUser, (err, result) => {
          if (err)
            reject(err);

          resolve(result);
        })
      })
    })
  })

}

//changing password also require async operation. asyncEach fires on!
export function changePassword (userList) {
  const options = {
    scope: 'sub',
    attributes: 'member'
  };

  return new Promise((resolve, reject) => {
    if(!client.connected) {
      reject(new Error('Connection lost!'));
    }
    asyncEach(userList, modifyPassword, (err, result) => {
      if(err)
        reject(err);
      resolve(result);
    });
  });
}