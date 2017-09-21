import * as ldapServices from '../services/ldapServices';

const authController = {
    async signin(req, res, next) {
        const data= req.body;

        console.log(data);
        let result;
        try {
            result = await ldapServices.clientAuth(data);
            //console.log(result)
        } catch (err) {
            console.log(err);
            res.send(`error ${err}`);
        }

        res.send(result);
    }
};

export default authController;