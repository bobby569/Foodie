import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const { Search } = Input;

class SearchBar extends Component {
	onSearch(val) {
		if (!val || !val.trim()) return;
		this.props.onSearch(val.trim());
	}

	render() {
		return (
			<div className="search">
				<Search
					placeholder="Search supported by Edamam"
					onSearch={val => this.onSearch(val)}
					enterButton
				/>
			</div>
		);
	}
}

SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired
};

export default SearchBar;
