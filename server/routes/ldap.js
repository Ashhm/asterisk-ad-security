import express from 'express';
import Router from 'express-router';
import * as ldapController from '../controllers/ldap';

const router = express.Router();

//this router should return all expected users
router.get('/users', ldapController.getGroupMembers);

export default router;