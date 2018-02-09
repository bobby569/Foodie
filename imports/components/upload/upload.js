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
		maxSize: 1048576, // in bytes
		allow: {
			contentTypes: ['image/*'], //allow only images in this FS.Collection
			extensions: ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG']
		}
	}
});

if (Meteor.isServer) {
	// Allow rules for security. Should look familiar!
	// Without these, no file writes would be allowed
	Avatars.allow({
		insert(userId) {
			return !!userId;
		},
		update(userId, doc) {
			return !!userId;
		},
		remove(userId, doc) {
			return userId === doc.owner;
		},
		download(userId, fileObj) {
			return true;
		}
	});
}
