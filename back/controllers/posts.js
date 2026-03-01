import Post from '../models/post.js';

export const fetchPosts = async (req, res, next) => {
	try {
		const posts = await Post.findAll();
		console.log('Fetched posts: ', posts);
		res.json({ success: true, posts });
	} catch (err) {
		res.status(500).json({
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
		};
		try {
			await req.user.createPost(postData);
			res.json({ success: true, post: postData });
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
