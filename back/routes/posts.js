import Express from 'express';
import { createPost } from '../controllers/posts.js';

const router = Express.Router();

router.post('/createPost', createPost);

export default router;