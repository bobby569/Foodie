import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Card, Modal } from 'antd';
const { confirm } = Modal;

class EmailAction extends Component {
	showConfirm() {
		confirm({
			title: 'Do you want to delete this account?',
			content:
				'When clicked the OK button, you will be redirected to the home page',
			okText: 'Yes',
			okType: 'danger',
			onOk() {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						Meteor.users.remove({ _id: Meteor.userId() });
						resolve();
					}, 1000);
				});
			}
		});
	}

	render() {
		const { email } = this.props;
		return (
			<div>
				<Card title="Email" className="email" bordered={false}>
					<p>{email}</p>
				</Card>
				<Button type="submit" bsStyle="danger" onClick={this.showConfirm}>
					Delete Account
				</Button>
			</div>
		);
	}
}

EmailAction.propTypes = {
	email: PropTypes.string.isRequired
};

export default EmailAction;
