import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const ProfileSchema = new SimpleSchema({
	ingredients: {
		type: Array,
		defaultValue: []
	},
	'ingredients.$': {
		type: String,
		optional: true
	},
	savedRecipes: {
		type: Array,
		defaultValue: []
	},
	'savedRecipes.$': {
		type: String,
		optional: true
	},
	likedRecipes: {
		type: Array,
		defaultValue: []
	},
	'likedRecipes.$': {
		type: String,
		optional: true
	},
	avatar: {
		type: String,
		defaultValue:
			'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
	}
});

const UserSchema = new SimpleSchema({
	createdAt: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	},
	emails: {
		type: Array,
		// For accounts-password, either emails or username is required, but not both. It is OK to make this
		// optional here because the accounts-password package does its own validation.
		// Third-party login packages may not require either. Adjust this schema as necessary for your usage.
		optional: true
	},
	'emails.$': {
		type: Object
	},
	'emails.$.address': {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	'emails.$.verified': {
		type: Boolean
	},
	profile: {
		type: ProfileSchema,
		defaultValue: {}
	},
	// Make sure this services field is in your schema if you're using any of the accounts packages
	services: {
		type: Object,
		optional: true,
		blackbox: true
	}
});

Meteor.users.schema = UserSchema;
Meteor.users.attachSchema(UserSchema);

Meteor.users.allow({
	update: (userId, doc) => {
		return userId === doc._id;
	},
	remove: (userId, doc) => {
		return userId === doc._id;
	}
});
