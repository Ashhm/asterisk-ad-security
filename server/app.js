import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import ldapRoute from './routes/ldap';

import {serverConfig} from './config/config.json';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));

app.use('/ldap', ldapRoute);

const port = serverConfig.port || 3000;

const server = app.listen(port, err => {
    if (err)
        throw err;

    console.log(`Server is runing on: ${port}`);
});