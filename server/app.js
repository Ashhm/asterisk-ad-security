import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';
import errorHandler from './middlewares/errorHandler';

import ldapRoute from './routes/ldap';
import authRoute from './routes/auth';
//import serviceRoute from './routes/asterisk';
import configRoute from './routes/configuration';

//import schedule from './schedule/schedule';

import {serverConfig} from './config/config.json';

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));
app.use(cors({
  origin: '*'
}));

app.use('/auth', authRoute);
app.use('/ldap', ldapRoute);
//app.use('/service', serviceRoute);
app.use('/config', configRoute);

//error handler
app.use(errorHandler);

const port = serverConfig.port || 3000;

const server = app.listen(port, err => {
  if (err)
    throw err;

  console.log(`Server is runing on: ${port}`);
});