import * as ldapService from '../services/ldapConnect';

export const getUsers = async (req, res, next) => {
    let users;

    //trying to get active connection with authorization
    try {
        users = await ldapService.getUsers();
        console.log(users);
        res.send(users);
    } catch (err) {
        console.log(err);
    }
}