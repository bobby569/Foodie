import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';
import { message, Card, Modal, Alert } from 'antd';
import ReactDOM from 'react-dom';

const confirm = Modal.confirm;

function showConfirm() {
	confirm({
		title: 'Do you want to delete this account?',
		content:
			'When clicked the OK button, you will be redirected to the home page',
		onOk() {
			return new Promise((resolve, reject) => {
				console.log('delete');
				Meteor.users.remove({ _id: Meteor.userId() });
				setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
			}).catch(() => console.log('Oops errors!'));
			window.location.replace('/');
		},
		onCancel() {}
	});
}

class Profile extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		this.state = {
			tags: [],
			tagFieldIsNull: false
		};
	}

	componentDidMount() {}

	componentWillUnMount() {}

	handleUpload(files) {
		const file = files[0];
		file.owner = Meteor.userId();
		Avatars.insert(file, (err, fileObj) => {
			if (err) return message.error(err);

			setTimeout(() => {
				Meteor.users.update(
					{ _id: Meteor.userId() },
					{
						$set: { 'profile.avatar': `/cfs/files/avatars/${fileObj._id}` }
					}
				);
			}, 1000);
		});
	}

	renderImagePreview() {
		const { user } = this.props;
		if (!user) return null;

		return (
			<Dropzone onDrop={this.handleUpload.bind(this)} className="avatar">
				{user.profile && (
					<img
						className="avatar avatar-uploader"
						src={user.profile.avatar}
						alt="avatar"
					/>
				)}
			</Dropzone>
		);
	}

	//tags
	renderTags() {
		return this.state.tags.map(tag => (
			<span onClick={this.handleRemoveTag.bind(this)} key={tag}>
				{tag}
			</span>
		));
	}

	handleAddTag(e) {
		e.preventDefault();
		const tagField = ReactDOM.findDOMNode(this.refs.tagField).value.trim();

		if (tagField === '') {
			console.log('error');
			this.state.tagFieldIsNull = true;
			const element = ReactDOM.findDOMNode(this.refs.ingredients);
			const alert = new Alert({
				message: 'Error',
				type: 'error',
				showIcon: true
			});
			console.log(alert);
			element.appendChild(alert);
		}
		if (!this.state.tagFieldIsNull) {
			// check if input is empty or if tag already exists in the list
			let tempArr = this.state.tags.map(tag => tag.toLowerCase());

			this.state.tags.push(tagField);
			this.forceUpdate();

			ReactDOM.findDOMNode(this.refs.tagField).value = '';
			ReactDOM.findDOMNode(this.refs.tagField).focus();
		}
	}

	handleRemoveTag(e) {
		e.preventDefault();

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
	}

	render() {
		let user = this.props.user;
		if (!user) {
			return <div>Loading</div>;
		}
		let email = user.emails[0].address;
		let ingredients = user.profile.ingredients;
		this.state.tags = ingredients;
		return (
			<div>
				<Card className="profile">
					{this.renderImagePreview()}
					<Card
						title="Email"
						className="email"
						bordered={false}
						style={{ marginTop: 10 }}
					>
						<p>{email}</p>
					</Card>
					<div className="delete-class">
						<Button
							className="delete"
							type="submit"
							bsStyle="danger"
							onClick={showConfirm}
						>
							Delete Account
						</Button>
					</div>
				</Card>
				<Card className="ingredients" ref="ingredients">
					<p>
						Add a few ingredients to your list! (You can click to remove
						ingredients)
					</p>
					<div className="modalTagsContainer">{this.renderTags()}</div>
					<FormControl
						className="input"
						id="tag-input"
						type="text"
						placeholder="Enter tags here"
						ref="tagField"
					/>
					<Button className="addtag" onClick={this.handleAddTag.bind(this)}>
						Add
					</Button>
					<Button className="savetag" onClick={this.handleSaveTag.bind(this)}>
						Save
					</Button>
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
