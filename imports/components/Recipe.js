import React, { Component } from 'react';
import axios from 'axios';

export default class Class extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: 0,
			data: null
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.setState({ id });
		// axios.get('url').then(({ data }) => {
		// 	this.setState({ data });
		// });
	}

	render() {
<<<<<<< HEAD
		return <div>Here are the saved recipes</div>;
=======
		// if (!data) return null;

		return <div>{this.props.match.params.id}</div>;
>>>>>>> 85cc6ec... add detail recipe code template
	}
}
