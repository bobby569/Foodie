import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

class DirectButton extends Component {
	constructor(props) {
		super(props);

		this.renderPage = this.renderPage.bind(this);
	}

	renderPage(e) {
		const { name } = e.target;
		this.props.renderPage(name);
	}

	render() {
		const { name } = this.props;
		return (
			<div className="div-center">
				<Button.Group>
					<Button
						name="lib"
						type="primary"
						ghost={name !== 'lib'}
						onClick={this.renderPage}
					>
						<Icon type="bulb" />Recipe Library
					</Button>
					<Button
						className="diy"
						name="diy"
						type="primary"
						ghost={name !== 'diy'}
						onClick={this.renderPage}
					>
						By My Recipe<Icon type="user" />
					</Button>
				</Button.Group>
			</div>
		);
	}
}

DirectButton.propTypes = {
	name: PropTypes.string.isRequired,
	renderPage: PropTypes.func.isRequired
};

export default DirectButton;
