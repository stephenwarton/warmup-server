module.exports = {
	user(user) {
		const validEmail = typeof user.email == 'string' &&
						user.email.trim() != '';
		const validPassword = typeof user.password == 'string' &&
						user.password.trim() != '';
		return validEmail && validPassword;
	},
	review(review) {
		const validTitle = typeof review.title == 'string' && review.title.trim() != '';
		const validDescription = typeof review.description == 'string' && review.description.trim() != '';
		return validTitle && validDescription;
	}
};
