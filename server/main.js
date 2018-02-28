import { Meteor } from 'meteor/meteor';
import '../imports/startup/service-config';
import '../imports/components/upload/upload';
import '../imports/startup/server';
import '../imports/collections';
import '../imports/api';

Meteor.startup(() => {
	/**
	 * Set up Email in dev mode
	 */
	if (Meteor.isDevelopment)
		process.env.MAIL_URL = Meteor.settings.private.MAIL_URL;

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
