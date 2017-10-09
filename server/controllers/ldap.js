import * as ldapServices from '../services/ldapServices';

export const getGroupMembers = async (req, res, next) => {

  let result = null;

  try {
    result = await ldapServices.searchGroupMembers();
    console.log(result);
  } catch ({message}) {
    return next({
      status: 500,
      message
    });
  }

  res.send(result);
};

export const setUserPassword = async (req, res, next) => {

};

