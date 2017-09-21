import express from 'express';
import Router from 'express-router';

import authController from '../controllers/auth';

const router = express.Router();

router.post('/signin', authController.signin);

export default router;