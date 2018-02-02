import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const userSchema = new SimpleSchema({
	profile: {
		type: Object,
		optional: true
	},
	'profile.$.ingredients': {
		type: Array,
		optional: true
	},
	'profile.$.savedRecipes': {
		type: Array,
		optional: true
	},
	'profile.$.likedRecipes': {
		type: Array,
		optional: true
	},
	'profile.$.avatar': {
		type: String,
		optional: true
	}
});

Meteor.users.schema = userSchema;
