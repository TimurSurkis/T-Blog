import Express from 'express';
import { createPost, fetchPosts } from '../controllers/posts.js';

const router = Express.Router();

router.post('/createPost', createPost);

router.get('/fetchPosts', fetchPosts);

export default router;
