import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const RecipeSchema = new SimpleSchema({
	viewCounts: {
		type: Number,
		defaultValue: 1
	},
	likeCounts: {
		type: Number,
		defaultValue: 0
	},
	api_id: {
		type: String
	},
	api_data: {
		type: String
	}
});

Recipes = new Mongo.Collection('recipes');

Recipes.schema = RecipeSchema;
Recipes.attachSchema(RecipeSchema);
