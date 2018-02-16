import { Session } from 'meteor/session';
import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';
import { message, Card, Row, Col } from 'antd';
import Avatar from './profile/Avatar';
import EmailAction from './profile/EmailAction';
import AddTags from './profile/AddTags';
import TagGroup from './profile/TagGroup';

// API used to detect whether input is food
const WORD_API = 'https://www.wordsapi.com/docs';

const confirm = Modal.confirm;

function showConfirm() {
	confirm({
		title: 'Do you want to delete this account?',
		content:
			'When clicked the OK button, you will be redirected to the home page',
		onOk() {
			return new Promise((resolve, reject) => {
				Meteor.users.remove({ _id: Meteor.userId() });
				setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
			}).catch(() => console.log('Oops errors!'));
		},
		onCancel() {}
	});
}

class Profile extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		this.state = {
			tags: null,
			inputValue: ''
		};

		this.handleEnter = this.handleEnter.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	handleEnter(e) {
		this.setState({ inputValue: e.target.value });
	}

	handleIngredients(user) {
		if (!this.state.tags) this.setState({ tags: user.profile.ingredients });
	}

	handleAdd() {
		let { tags, inputValue } = this.state;
		const val = inputValue.trim().toLowerCase();
		if (val === '') {
			return message.error("Ingredient field can't be null!");
		}
		if (tags.includes(val)) {
			return message.error('Ingredient already in the list!');
		}
		tags = [...tags, val];
		this.setState({ inputValue: '', tags });
	}

	handleRemove(tag) {
		const { tags } = this.state;
		const newTags = tags.filter(item => item !== tag);
		this.setState({ tags: newTags });
	}

	//save tags to the database
	handleSave() {
		Meteor.users.update(Meteor.userId(), {
			$set: {
				'profile.ingredients': this.state.tags
			}
		});
		message.success('Saved successfully!');
	}

	render() {
		const { user } = this.props;
		if (!user) return <h2>Loading</h2>;
		else this.handleIngredients(user);

		const email = user.emails[0].address;
		const { tags, inputValue } = this.state;
		// TODO: tags should use be obtained directly from db instead of component state
		return (
			<div className="user-profile">
				<Row gutter={{ xs: 10, lg: 5 }}>
					<Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 6 }}>
						<Card className="profile">
							<Avatar user={user} />
							<EmailAction email={email} />
						</Card>
					</Col>
					<Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 18 }}>
						<Card className="ingredients">
							<h5>Start adding ingredients to your list!</h5>
							{tags ? (
								<TagGroup
									tags={tags}
									onDismiss={tag => this.handleRemove(tag)}
								/>
							) : (
								<p>Loading</p>
							)}
							<AddTags
								value={inputValue}
								onEnter={this.handleEnter}
								onAdd={this.handleAdd}
								onSave={this.handleSave}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default createContainer(route => {
	return {
		user: Meteor.user()
	};
}, Profile);
