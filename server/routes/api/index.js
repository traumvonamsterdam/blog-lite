import express from 'express'
import articlesRouter from './articles'
const router = express.Router();

router.use('/articles', articlesRouter);

export default router