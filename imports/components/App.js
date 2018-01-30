import 'antd/dist/antd.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

export default class App extends Component {
	render() {
		return (
			<div>
				<Button type="primary">primary</Button>
			</div>
		);
	}
}
