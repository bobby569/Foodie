import { Meteor } from 'meteor/meteor';
import '../imports/startup/service-config.js';
import '../imports/components/upload/upload.js';
import '../imports/collections/index.js';
// import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
	/**
   * Set up account services
   */
	var facebookConfig = Meteor.settings.private.oauth.facebook;
	var googleConfig = Meteor.settings.private.oauth.google;

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
