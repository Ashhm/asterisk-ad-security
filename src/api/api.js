import request from 'superagent';

import {serverApi} from '../etc/config.json';

export const signin = (data) => {
    return request.post(`${serverApi.url}/auth/signin`).send(data);
};