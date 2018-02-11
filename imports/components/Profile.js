import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { FormControl, Button } from 'react-bootstrap';
import { createContainer } from 'react-meteor-data';
import { message, Card, Icon } from 'antd';

import Avatar from './profile/Avatar';
import EmailAction from './profile/EmailAction';
import TagGroup from './profile/TagGroup';
// API used to detect whether input in food
const WORD_API = 'https://www.wordsapi.com/docs';

class Profile extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		this.state = {
			tags: []
		};

		this.handleAddTag = this.handleAddTag.bind(this);
		this.handleRemoveTag = this.handleRemoveTag.bind(this);
		this.handleSaveTag = this.handleSaveTag.bind(this);
	}

	handleAddTag(e) {
		e.preventDefault();
		const tagField = ReactDOM.findDOMNode(this.refs.tagField).value.trim();

		if (tagField === '') {
			return message.error("Ingredient field can't be null!");
		}
		// check if input is empty or if tag already exists in the list
		let tempArr = this.state.tags.map(tag => tag.toLowerCase());

		this.state.tags.push(tagField);
		this.forceUpdate();

		ReactDOM.findDOMNode(this.refs.tagField).value = '';
		ReactDOM.findDOMNode(this.refs.tagField).focus();
	}

	handleRemoveTag(e) {
		// e.preventDefault();

		const tagValue = $(e.target).text();
		const tagIndex = this.state.tags.indexOf(tagValue);

		this.state.tags.splice(tagIndex, 1);
		this.forceUpdate();
	}

	//save tags to the database
	handleSaveTag(obj) {
		Meteor.users.update(Meteor.userId(), {
			$set: {
				'profile.ingredients': this.state.tags
			}
		});
		message.success('Saved!');
	}

	render() {
		const { user } = this.props;
		if (!user) return <h2>Loading</h2>;

		const email = user.emails[0].address;
		const { ingredients } = user.profile;
		this.state.tags = ingredients;
		return (
			<div>
				<Card className="profile">
					<Avatar user={user} />
					<EmailAction email={email} />
				</Card>
				<Card className="ingredients" ref="ingredients">
					<h5>Start adding ingredients to your list!</h5>
					<FormControl
						className="input"
						id="tag-input"
						type="text"
						placeholder="Enter tags here"
						ref="tagField"
					/>
					<Button className="tag addtag" onClick={this.handleAddTag}>
						Add
					</Button>
					<Button className="tag savetag" onClick={this.handleSaveTag}>
						Save
					</Button>
					<TagGroup tags={this.state.tags} onRemove={this.handleRemoveTag} />
				</Card>
			</div>
		);
	}
}

export default createContainer(route => {
	return {
		user: Meteor.user()
	};
}, Profile);
