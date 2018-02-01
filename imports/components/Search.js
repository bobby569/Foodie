import React, { Component } from 'react';
import DirectButton from './search/DirectButton';
import DIYSearch from './search/DIYSearch';
import LibrarySearch from './search/LibrarySearch';

class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: 'lib'
		};
	}

	render() {
		const { name } = this.state;
		return (
			<div>
				<DirectButton name={name} renderPage={name => this.setState({ name })} />
				{name === 'lib' ? <LibrarySearch /> : <DIYSearch />}
			</div>
		);
	}
}

export default Search;
