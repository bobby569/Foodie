import React, { Component } from 'react';
import RecipeTable, { columns } from './search/RecipeTable.js';

const newColumn = [
	...columns,
	{
		title: 'Likes',
		dataIndex: 'likeCounts',
		key: 'likeCounts',
		sorter: (a, b) => ~~b.likeCounts - ~~a.likeCounts
	},
	{
		title: 'Views',
		dataIndex: 'viewCounts',
		key: 'viewCounts',
		sorter: (a, b) => ~~b.viewCounts - ~~a.viewCounts
	}
];

export default class Saved extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null
		};
	}

	componentDidMount() {
		Meteor.callPromise('users.getSavedRecipe', Meteor.userId()).then(data => {
			this.setState({ data });
			this.forceUpdate();
		});
	}

	render() {
		const { data } = this.state;
		if (!data) return <div>Loading</div>;

		return <RecipeTable data={data} customColumns={newColumn} />;
	}
}
