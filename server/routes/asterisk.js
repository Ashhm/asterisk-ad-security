import express from 'express';
import Router from 'express-router';
import * as asteriskController from '../controllers/asterisk';

const router = express.Router();

router.post('/sendsms', asteriskController.sendSMS);

export default router;