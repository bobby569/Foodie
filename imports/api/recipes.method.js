import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { API, URI_BASE_RETR } from '../components/util/constant.js';

Meteor.methods({
	'recipes.detailData': api_id => {
		check(api_id, String);

		const res = Recipes.find({ api_id }).fetch();
		if (res.length === 0) {
			const url = `${API}&r=${URI_BASE_RETR}${api_id}`;
			const res = HTTP.get(url);
			const api_data = JSON.stringify(res.data[0]);
			Recipes.insert({
				api_id,
				api_data
			});

			return Recipes.findOne({ api_id });
		} else {
			Recipes.update(
				{ api_id },
				{
					$inc: {
						viewCounts: 5
					}
				}
			);

			return Recipes.findOne({ api_id });
		}
	},
	'recipes.addLike': (userId, api_id) => {
		check(api_id, String);
		check(userId, String);

		Recipes.update(
			{ api_id },
			{
				$inc: {
					likeCounts: 1
				},
				$addToSet: {
					likes: userId
				}
			}
		);

		Meteor.users.update(
			{ _id: userId },
			{
				$addToSet: {
					'profile.likedRecipes': api_id
				}
			}
		);
	},
	'recipes.cancelLike': (userId, api_id) => {
		check(api_id, String);
		check(userId, String);

		Recipes.update(
			{ api_id },
			{
				$inc: {
					likeCounts: -1
				},
				$pull: {
					likes: userId
				}
			}
		);

		Meteor.users.update(
			{ _id: userId },
			{
				$pull: {
					'profile.likedRecipes': api_id
				}
			}
		);
	}
});
