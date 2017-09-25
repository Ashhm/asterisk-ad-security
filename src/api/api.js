import request from 'superagent';

import {serverApi} from '../etc/config.json';

export const signin = (data) => {
    return request.post(`${serverApi.url}/auth/signin`)
        .send(data);
};

export const getConfiguration = (name) => {
    return request.get(`${serverApi.url}/config/get`)
        .query({name});
};