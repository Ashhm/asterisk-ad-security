import ldap from 'ldapjs';
import asyncMap from 'async/map';

import {ldapConfig} from '../config/config.json';

const {url, username, password, baseDN} = ldapConfig;

let client = ldap.createClient({url}, err => {
  if (err) {
    throw err;
  }
});


//authentication function return Promise witch allow
//us to use asyn/await
export function clientAuth(data) {
  const {username, password} = data;

  //fixed connect bug
  if(!client.connected) {
    client.unbind(err => {
      if(err)
        return err;
    });
    client = ldap.createClient({url}, err=> {
      if(err)
        return err;
    })
  }

  return new Promise((resolve, reject) => {
    client.bind(username, password, err => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

export function searchUser(containerName, done) {
  const options = {
    scope: 'sub',
    attributes: ['cn', 'mobile']
  };
  return new Promise((resolve, reject) => {
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

export function searchGroupMembers(groupName) {
  const options = {
    filter: (`cn=${groupName}`),
    scope: 'sub',
    attributes: 'member'
  };

  return new Promise((resolve, reject) => {
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