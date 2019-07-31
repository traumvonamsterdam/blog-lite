import express from 'express'
const router = express.Router();

router.use('/articles', require('./articles'));

export default router