import express from 'express';
import Router from 'express-router';
import config from '../config/config.json';

const router = express.Router();

router.get('/get', (req, res, next) => {
  res.send(
    req.query.name ? config[req.query.name] : config
  )
});

export default router;