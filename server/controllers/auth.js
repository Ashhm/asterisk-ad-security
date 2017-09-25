import * as ldapServices from '../services/ldapServices';


//authentication through ldap server
const authController = {
    async signin(req, res, next) {
        const data = req.body;

        if (!(data.password&&data.username))
            return next({
                status: 400,
                message: 'Bad credentials'
            });

        let result;
        try {
            result = await ldapServices.clientAuth(data);
        } catch (err) {
            return next({
                status: 500,
                message: err
            });
        }

        res.send(result);
    }
};

export default authController;