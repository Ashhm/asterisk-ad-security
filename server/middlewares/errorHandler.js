export default function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    //destruction with default values
    let {status = 500, message = `Server error`} = err;

    return res
        .status(status)
        .send({message});
};