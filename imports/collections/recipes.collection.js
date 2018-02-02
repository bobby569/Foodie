import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const recipeSchema = new SimpleSchema({
	viewCounts: {
		type: Number,
		defaultValue: 0,
		optional: true
	},
	likeCounts: {
		type: Number,
		defaultValue: 0,
		optional: true
	},
	api_id: {
		type: Number,
		optional: false
	}
});

Recipes = new Mongo.Collection('recipes');

Recipes.schema = recipeSchema;
