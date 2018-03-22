Meteor.methods({
	'users.saveRecipe': (userId, recipeId) => {
		Meteor.users.update(
			{ _id: userId },
			{
				$push: {
					'profile.savedRecipes': recipeId
				}
			}
		);
	},
	'users.getSavedRecipe': userId => {
		const user = Meteor.users.findOne(
			{ _id: userId },
			{
				'profile.savedRecipes': 1
			}
		);
		const saved = user.profile.savedRecipes;
		return saved.map(api_id => {
			const recipe = Recipes.findOne({ api_id });
			if (!recipe) return null;
			const { viewCounts, likeCounts } = recipe;
			return { ...JSON.parse(recipe.api_data), api_id, viewCounts, likeCounts };
		});
	}
});
