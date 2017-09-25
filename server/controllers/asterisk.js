import * as asteriskServices from '../services/asteriskServies';

export const sendSMS = async function (req, res, next) {

    const data = req.body;
    try {
        await asteriskServices.sendSMS(data);
    } catch (err) {
        console.log(err);
        return next({
            status: 500,
            message: err
        });
    }

    res.send('done');
};