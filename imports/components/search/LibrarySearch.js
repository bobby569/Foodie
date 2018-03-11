import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { Button } from 'antd';
import { API, URI_LEN } from '../util/constant';
import ErrorBlock from '../util/ErrorBlock';
import FilterGroup from './FilterGroup';
import RecipeTable from './RecipeTable';
import SearchBar from './SearchBar';
import { Meteor } from 'meteor/meteor';

class LibrarySearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			err: null,
			index: 0,
			recipes: [],
			searchTerm: '',
			diet: '',
			health: ''
		};
	}

	setRecipe(hits) {
		const { recipes, index } = this.state;
		let newRecipe = hits.map(item => item.recipe);
		_.each(newRecipe, item =>
			_.extend(item, { api_id: item.uri.substr(URI_LEN) })
		);
		this.setState({
			recipes: Array.from(new Set([...recipes, ...newRecipe])),
			index: index + 5,
			err: null
		});
	}

	getRecipe(searchTerm, index = 0) {
		const { diet, health } = this.state;
		let url = `${API}&q=${searchTerm}`;
		if (diet.length > 5) url += `&diet=${diet}`;
		if (health.length > 5) url += `&health=${health}`;
		url += `&from=${index}&to=${index + 5}`;
		axios
			.get(url)
			.then(res => this.setRecipe(res.data.hits))
			.catch(err => this.setState({ err }));
	}

	onSearchSubmit(searchTerm) {
		this.setState({ searchTerm });
		this.getRecipe(searchTerm);
	}

	render() {
		const { err, index, recipes, searchTerm } = this.state;

		return (
			<div>
				<SearchBar onSearch={this.onSearchSubmit.bind(this)} />
				<FilterGroup
					onDietChange={diet => this.setState({ diet })}
					onHealthChange={health => this.setState({ health })}
				/>
				{err ? <ErrorBlock /> : <RecipeTable data={recipes} />}
				{!err &&
					recipes.length > 0 && (
						<div className="div-center">
							<Button
								className="more"
								onClick={() => this.getRecipe(searchTerm, index + 5)}
							>
								More
							</Button>
						</div>
					)}
			</div>
		);
	}
}

export default LibrarySearch;
