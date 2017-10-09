import request from 'superagent';

import {serverApi} from '../etc/config.json';

const {url} = serverApi;

export const signin = (data) => {
  return request.post(`${url}/auth/signin`)
    .send(data);
};

export const signout = () => {
  return request.post(`${url}/auth/signout`)
    .send({});
};

export const getConfiguration = () => {
  return request.get(`${url}/config`);
};

export const saveConfiguration = (data) => {
  return request.put(`${url}/config`).send(data);
};

export const getLdapUsers = () => {
  console.log('request');
  return request.get(`${url}/ldap/users`);
};