import * as ldapServices from '../services/ldapServices';


//authentication through ldap server
const authController = {
  async signin(req, res, next) {
    const data = req.body;
    //for some reasons AD accept clear data

    let result = null;
    try {
      result = await ldapServices.clientAuth(data);
    } catch (err) {
      return next({
        status: 500,
        message: err.message
      });
    }

    res.send(result);
  }
};

export default authController;