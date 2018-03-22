import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';
import { message, Card, Row, Col } from 'antd';
import AddTags from './profile/AddTags';
import Avatar from './profile/Avatar';
import EmailAction from './profile/EmailAction';
import TagGroup from './profile/TagGroup';

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
	}

	// componentDidMount() {
	// 	const { user } = this.props;
	// 	if (!user) return;
	// 	this.setState({ tags: user.profile.ingredients });
	// }

	componentWillReceiveProps(nextProps) {
		this.setState({ tags: nextProps.user.profile.ingredients });
	}

	handleEnter(e) {
		this.setState({ inputValue: e.target.value });
	}

	handleAdd() {
		const { tags, inputValue } = this.state;
		const val = inputValue.trim().toLowerCase();
		//if (val === '') return message.error("Ingredient can't be empty!");
		//if (tags.includes(val)) return message.error('Ingredient already exist!');

		tags.push(val);
		this.setState({ inputValue: '', tags });

		Meteor.users.update(Meteor.userId(), {
			$set: {
				'profile.ingredients': tags
			}
		});
	}

	handleRemove(tag) {
		const { tags } = this.state;
		const newTags = tags.filter(item => item !== tag);
		this.setState({ tags: newTags });

		// Meteor.users.update(Meteor.userId(), {
		// 	$set: {
		// 		'profile.ingredients': newTags
		// 	}
		// });
	}

	render() {
		const { user } = this.props;
		if (!user) return <h2>Loading</h2>;

		const email = user.emails[0].address;
		const { tags, inputValue } = this.state;

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
							{tags && (
								<TagGroup
									tags={tags}
									onDismiss={tag => this.handleRemove(tag)}
								/>
							)}
							<AddTags
								value={inputValue}
								onEnter={this.handleEnter}
								onAdd={this.handleAdd}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default createContainer(route => ({ user: Meteor.user() }), Profile);
