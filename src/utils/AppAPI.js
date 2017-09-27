import request from 'superagent';

import {serverApi} from '../etc/config.json';

const {url} = serverApi;

export const signin = (data) => {
  return request.post(`${url}/auth/signin`)
    .send(data);
};

export const signout = () => {
  return request.posp(`${url}/auth/signout`)
    .send({});
};

export const getConfiguration = (name) => {
  return request.get(`${url}/config/get`);
};