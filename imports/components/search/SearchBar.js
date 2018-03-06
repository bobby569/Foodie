import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const { Search } = Input;

class SearchBar extends Component {
	render() {
		return (
			<div className="search">
				<Search
					placeholder="Search supported by Edamam"
					onSearch={val => this.props.onSearch(val.trim())}
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
