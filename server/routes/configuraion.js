import express from 'express';
import Router from 'express-router';
import configController from '../controllers/configuration';

const router = express.Router();

router.get('/', configController.readFile);
router.put('/',configController.writeFile);

export default router;