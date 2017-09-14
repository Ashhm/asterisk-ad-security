/*################################################
* ################################################
* ####this service created for setup connection###
* ####and bind user credentials for access######*/

import ldap from 'ldapjs';

import {ldapConfig} from '../config/config.json';

let {host, port, user, password} = ldapConfig;

const client = ldap.createClient({
    url: `ldap://${host}:${port}`
});

//here i used bind for BIND METHOD of client!
//for context ive used client, bound user/pwd
const func = client.bind.bind(client, user, password);

export const getUsers = () => {
    return func(err => {
        console.log(err);
        const opts = {
            filter: '(cn=test)',
            scope: 'sub',
            attributes: ['cn', 'name', 'mobile']
        };

        //search - first parameter is AD container where to search!
        client.search('OU=OFFICE,DC=oilkiev,DC=local', opts, function (err, res) {
                if (err) console.log(err);

                res.on('searchEntry', function (entry) {
                    console.log('entry: ' + JSON.stringify(entry.object));
                });
                res.on('searchReference', function (referral) {
                    console.log('referral: ' + referral.uris.join());
                });
                res.on('error', function (err) {
                    console.error('error: ' + err.message);
                });
                res.on('end', function (result) {
                    console.log('status: ' + result.status);
                });
            }
        )
    });
};


