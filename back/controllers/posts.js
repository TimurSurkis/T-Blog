import { Op } from 'sequelize';
import Post from '../models/post.js';
import Reaction from '../models/reaction.js';
import User from '../models/user.js';

export const fetchPosts = async (req, res, next) => {
	const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;
	const limit = 20;

	try {
		const posts = await Post.findAll({
			order: [['id', 'DESC']],
			limit: limit + 1,
			where: {
				...(cursor && { id: { [Op.lt]: cursor } }),
			},
		});

		const hasMore = posts.length > limit;
		const data = hasMore ? posts.slice(0, limit) : posts;
		const nextCursor = posts[posts.length - 1];
		res.json({ success: true, data, hasMore, nextCursor });
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export const fetchPostReactions = async (req, res, next) => {
	const postId = req.params.postId;

	try {
		const post = await Post.findByPk(postId);
		const postReactions = await post.getReactions();

		return res.json({
			success: true,
			data: { postReactions, postId: postId },
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export const fetchPostComments = async (req, res, next) => {
	const postId = req.params.postId;
	const limit = 20;
	const cursor = req.query.cursor ? parseInt(req.query.cursor) : null;

	try {
		const post = await Post.findByPk(postId);
		const comments = await post.getPostComments({
			include: [{ model: User, attributes: ['id', 'name'] }],
			order: [['id', 'DESC']],
			limit: limit + 1,
			where: {
				...(cursor && { id: { [Op.lt]: cursor } }),
			},
		});

		const hasMore = comments.length > limit;
		const data = hasMore ? comments.slice(0, limit) : comments;
		const nextCursor = hasMore ? data[data.length - 1] : null;

		return res.json({ success: true, data, nextCursor, hasMore });
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export const createPost = async (req, res, next) => {
	const title = req.body.postTitle;
	const text = req.body.postText;
	const author = req.body.postAuthor;

	if (req.user) {
		const postData = {
			title,
			text,
			author,
			createdAt: Date.now(),
			hearts: 0,
			dislikes: 0,
		};
		try {
			await req.user.createPost(postData);
			res.json({ success: true, data: postData });
		} catch (err) {
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			});
		}
	} else {
		res.status(401).json({ success: false, message: 'User unauthorized' });
	}
};

export const setReaction = async (req, res, next) => {
	const reactionType = req.params.reactionType;
	const postId = Number(req.params.postId);
	const userId = req.user.id;

	const post = await Post.findOne({ where: { id: postId } });

	const reaction = await Reaction.findOne({
		where: {
			postId,
			userId,
		},
	});
	if (reaction) {
		const newReaction = await reaction.destroy();
		console.log(reaction);
		if (reaction.reactionType === reactionType) {
			const oldReactionQty = post[`${reactionType}s`];
			await post.update({
				[`${reactionType}s`]: oldReactionQty - 1,
			});

			const reactions = await post.getReactions();
			return res.json({
				success: true,
				data: {
					postId,
					reactions,
					hearts: post.hearts,
					dislikes: post.dislikes,
				},
			});
		}
	}

	try {
		await post.createReaction({
			postId,
			userId,
			reactionType,
		});
		const postReactions = await post.getReactions();
		const postHearts = postReactions.filter(
			(reaction) => reaction.reactionType == 'heart',
		);
		const postDislikes = postReactions.filter(
			(reaction) => reaction.reactionType == 'dislike',
		);
		await post.update({
			hearts: postHearts.length,
			dislikes: postDislikes.length,
		});

		const reactions = await post.getReactions();
		res.json({
			success: true,
			data: {
				postId,
				hearts: postHearts.length,
				dislikes: postDislikes.length,
				reactions,
			},
		});
	} catch (err) {
		console.error(err);
	}
};
