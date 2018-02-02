import { Meteor } from 'meteor/meteor';
import '../imports/startup/service-config';
import '../imports/components/upload/upload';
import '../imports/collections';

Meteor.startup(() => {
	/**
	 * Set up account services
	 */
	const { oauth } = Meteor.settings.private;
	const facebookConfig = oauth.facebook;
	const googleConfig = oauth.google;

	console.log('---------- Account Service Configuration ----------');

	if (facebookConfig) {
		console.log('Got settings for facebook', facebookConfig);
		configureFacebook(facebookConfig);
	}

	if (googleConfig) {
		console.log('Got settings for google', googleConfig);
		configureGoogle(googleConfig);
	}

	console.log('---------- Server Up ----------');

	ROOT_DIR_PATH = process.env.PWD;
	console.log(`Root path: ${ROOT_DIR_PATH}`);
});
