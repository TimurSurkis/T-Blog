const filterPosts = (posts, firstCondition, secondCondition, equalsOrNot) => {
	if (equalsOrNot) {
		return posts.filter((post) => post[firstCondition] === secondCondition);
	}
	return posts.filter((post) => post[firstCondition] !== secondCondition);
};

export default filterPosts;
