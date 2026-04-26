import Express from 'express';
import {
	createPost,
	fetchPostComments,
	fetchPostReactions,
	fetchPosts,
	setReaction,
} from '../controllers/posts.js';

const router = Express.Router();

router.post('/createPost', createPost);

router.get('/fetchPosts', fetchPosts);

router.get('/setReaction/:reactionType&:postId', setReaction);

router.get('/fetchPostReactions/:postId', fetchPostReactions);

router.get('/fetchPostComments/:postId/comments', fetchPostComments);

export default router;
