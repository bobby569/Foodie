import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Table } from 'antd';
import ErrorBlock from './ErrorBlock';
import SearchBar from './SearchBar';

class LibrarySearch extends Component {
	constructor(props) {
		super(props);

		this.state = {
			err: null,
			result: null,
			searchTerm: ''
		};

		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
	}

	componentDidMount() {
		this.fetchSearchTopStories(this.state.searchTerm);
	}

	setSearchTopStories(result) {
		const { hits, page } = result;
		const oldHits = page !== 0 ? this.state.result.hits : [];
		const updatedHits = [...oldHits, ...hits];
		this.setState({ result: { hits: updatedHits, page } });
	}

	fetchSearchTopStories(searchTerm, page = 0) {
		const url = '';
		axios
			.get(url)
			.then(res => this.setSearchTopStories(res.data))
			.catch(err => this.setState({ err }));
	}

	onSearchChange(e) {
		this.setState({ searchTerm: e.target.value });
	}

	onSearchSubmit(e) {
		e.preventDefault();
		const { searchTerm } = this.state;
		this.fetchSearchTopStories(searchTerm);
	}

	render() {
		const { err, result, searchTerm } = this.state;
		const page = result ? result.page : 0;

		return (
			<div>
				<SearchBar />
				{err ? <ErrorBlock /> : result && <Table />}
				{!err && (
					<div className="div-center">
						<Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
							More
						</Button>
					</div>
				)}
			</div>
		);
	}
}

export default LibrarySearch;
