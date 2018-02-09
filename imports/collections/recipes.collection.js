import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const RecipeSchema = new SimpleSchema({
	viewCounts: {
		type: Number,
		defaultValue: 0
	},
	likeCounts: {
		type: Number,
		defaultValue: 0
	},
	api_id: {
		type: Number
	}
});

Recipes = new Mongo.Collection('recipes');

Recipes.schema = RecipeSchema;
Recipes.attachSchema(RecipeSchema);
