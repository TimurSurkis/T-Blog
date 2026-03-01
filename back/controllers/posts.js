export const createPost = async (req, res, next) => {
	const title = req.body.postTitle;
	const text = req.body.postText;
	const author = req.body.postAuthor;

	if (req.user) {
		try {
			await req.user.createPost({
				title,
				text,
				author,
			});
			res.json({ success: true });
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
