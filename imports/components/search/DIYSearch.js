import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Button } from 'antd';
import { API, URI_LEN } from '../util/constant';
import ErrorBlock from '../util/ErrorBlock';
import RecipeTable from './RecipeTable';
import TagGroup from '../profile/TagGroup';

class DIYSearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			err: null,
			index: 0,
			recipes: []
		};
	}

	componentDidMount() {
		this.getRecipe();
	}

	getRecipe(index = 0) {
		const { ingredients } = Meteor.user().profile;
		const query = ingredients.join('%20');
		const url = `${API}&q=${query}&from=${index}&to=${index + 5}`;
		axios
			.get(url)
			.then(res => this.setRecipe(res.data.hits))
			.catch(err => this.setState({ err }));
	}

	setRecipe(hits) {
		const { recipes, index } = this.state;
		let newRecipe = hits.map(item => item.recipe);
		_.each(newRecipe, item => _.extend(item, { id: item.uri.substr(URI_LEN) }));
		this.setState({ recipes: [...recipes, ...newRecipe], index: index + 5 });
	}

	render() {
		const { err, index, recipes } = this.state;
		if (!Meteor.userId()) return <ErrorBlock />;

		return (
			<div>
				{/*<TagGroup />*/}
				{err ? <ErrorBlock /> : <RecipeTable data={recipes} />}
				{!err && (
					<div className="div-center">
						<Button onClick={() => this.getRecipe(index + 5)}>More</Button>
					</div>
				)}
			</div>
		);
	}
}

export default DIYSearch;
