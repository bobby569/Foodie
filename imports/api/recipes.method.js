import { check } from 'meteor/check';
import { HTTP } from 'meteor/http';
import { API, URI_BASE_RETR } from '../components/util/constant.js';

Meteor.methods({
	'recipes.detailData': api_id => {
		check(api_id, String);

		const res = Recipes.find({ api_id }).fetch();
		if (res.length === 0) {
			const url = `${API}&r=${URI_BASE_RETR}${api_id}`;
			HTTP.get(url, (err, res) => {
				if (!err) {
					const tmp = JSON.stringify(res.data[0]);
					Recipes.insert({
						api_id,
						api_data: tmp
					});

					return Recipes.findOne({ api_id });
				}
			});
		} else {
			Recipes.update(
				{ api_id },
				{
					$inc: {
						viewCounts: 1
					}
				}
			);

			return Recipes.findOne({ api_id });
		}
	},
	'recipes.addLike': id => {
		check(id, String);

		Recipes.update(
			{ _id: id },
			{
				$inc: {
					likeCounts: 1
				}
			}
		);
	},
	'recipes.cancelLike': id => {
		check(id, String);

		Recipes.update(
			{ _id: id },
			{
				$inc: {
					likeCounts: -1
				}
			}
		);
	}
});
