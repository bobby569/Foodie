Meteor.methods({
	'users.saveRecipe': (userId, recipeId) => {
		Meteor.users.update(
			{ _id: userId },
			{
				$addToSet: {
					'profile.savedRecipes': recipeId
				}
			}
		);
	},
	'users.getSavedRecipe': userId => {
		const user = Meteor.users.findOne(
			{
				_id: userId
			},
			{
				'profile.savedRecipes': 1
			}
		);
		const saved = user.profile.savedRecipes;
		const recipeArr = [];
		saved.forEach(api_id => {
			let recipe = Recipes.findOne({ api_id });
			let api_data = JSON.parse(recipe.api_data);
			recipeArr.push(api_data);
		});
		return recipeArr;
	}
});
