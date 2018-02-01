import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const { Search } = Input;

class SearchBar extends Component {
	render() {
		return (
			<div className="search">
				<Search placeholder="Search" onSearch={val => console.log(val)} enterButton />
			</div>
		);
	}
}

export default SearchBar;
