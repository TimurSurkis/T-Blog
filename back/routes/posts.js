import Express from 'express';
import {
	createPost,
	fetchPostReactions,
	fetchPosts,
	setReaction,
} from '../controllers/posts.js';

const router = Express.Router();

router.post('/createPost', createPost);

router.get('/fetchPosts', fetchPosts);

router.get('/setReaction/:reactionType&:postId', setReaction);

router.get('/fetchPostReactions/:postId', fetchPostReactions);

export default router;
