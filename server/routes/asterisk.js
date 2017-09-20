import express, {Router} from 'express';
import * as asteriskController from '../controllers/asterisk';

const router = express.Router();

router.post('/sendsms', asteriskController.sendSMS);

export default router;