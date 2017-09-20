import * as ldapServices from '../services/ldapServices';

import {ldapConfig} from '../config/config.json';

export const getGroupMembers = async (req, res, next) => {

    let result;

    try {
        result = await ldapServices.searchGroupMembers('SENDSMS');
    } catch (err) {
        console.log(err);//todo: add error handler
    }

    res.send(result);
};

export const setUserPassword = async (req, res, next) => {

};

