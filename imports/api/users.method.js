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
	}
});
