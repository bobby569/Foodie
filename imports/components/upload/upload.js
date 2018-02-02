const createThumb = (fileObj, readStream, writeStream) => {
	gm(readStream, fileObj.name())
		.resize('256', '256')
		.stream()
		.pipe(writeStream);
};

Avatars = new FS.Collection('avatars', {
	stores: [
		new FS.Store.FileSystem('thumbs', {
			transformWrite: createThumb,
			path: '~/Desktop/thumbAvatars'
		}),
		new FS.Store.FileSystem('avatars')
	],
	filter: {
		allow: {
			contentTypes: ['image/*'] //allow only images in this FS.Collection
		}
	}
});

if (Meteor.isServer) {
	// Allow rules for security. Should look familiar!
	// Without these, no file writes would be allowed
	Avatars.allow({
		insert() {
			// add custom authentication code here
			return true;
		},
		update() {
			// add custom authentication code here
			return true;
		},
		remove() {
			// add custom authentication code here
			return true;
		},
		download(userId, fileObj) {
			return true;
		}
	});
}
