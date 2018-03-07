Comments.config({
	generateUsername: user => {
		return user.emails[0].address;
	}
});
