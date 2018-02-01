import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'antd';
import ErrorBlock from './ErrorBlock';
import RecipeTable from './RecipeTable';
import SearchBar from './SearchBar';

class LibrarySearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			err: null,
			result: null,
			searchTerm: ''
		};
	}

	componentDidMount() {
		this.getRecipe(this.state.searchTerm);
	}

	setSearchTopStories(result) {
		const { hits, page } = result;
		const oldHits = page !== 0 ? this.state.result.hits : [];
		const updatedHits = [...oldHits, ...hits];
		this.setState({ result: { hits: updatedHits, page } });
	}

	getRecipe(searchTerm, page = 0) {
		// url for testing
		const url = `https://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${page}`;
		axios
			.get(url)
			.then(res => this.setSearchTopStories(res.data))
			.catch(err => this.setState({ err }));
	}

	onSearchSubmit(searchTerm) {
		this.setState({ searchTerm });
		this.getRecipe(searchTerm);
	}

	render() {
		const { err, result, searchTerm } = this.state;
		const page = result ? result.page : 0;

		return (
			<div>
				<SearchBar onSearch={this.onSearchSubmit.bind(this)} />
				{err ? <ErrorBlock /> : result && <RecipeTable data={result.hits} />}
				{!err && (
					<div className="div-center">
						<Button onClick={() => this.getRecipe(searchTerm, page + 1)}>More</Button>
					</div>
				)}
			</div>
		);
	}
}

export default LibrarySearch;
