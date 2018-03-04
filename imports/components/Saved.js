import React, { Component } from 'react';
import { Table, Tag } from 'antd';
import RecipeTable from './search/RecipeTable.js';

export default class Saved extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null
		};
		this.getRecipeData();
	}

	getRecipeData() {
		Meteor.callPromise('users.getSavedRecipe', Meteor.userId()).then(data => {
			this.setState({ data });
			this.forceUpdate();
		});
	}

	render() {
		const { data } = this.state;
		if (!data) return <div> Loading </div>;

		return (
			<div className="table">
				<RecipeTable data={data} />
			</div>
		);
	}
}
