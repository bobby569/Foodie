import React, { Component } from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';
import { message, Card } from 'antd';
import ReactDOM from 'react-dom';

class Profile extends TrackerReact(Component) {
	constructor(props) {
		super(props);
		this.state = {
			tags: [],
			showModal: false
		};
	}

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

		// check if input is empty or if tag already exists in the list
		let tempArr = this.state.tags.map(tag => tag.toLowerCase());

		this.state.tags.push(tagField);
		this.forceUpdate();

		ReactDOM.findDOMNode(this.refs.tagField).value = '';
		ReactDOM.findDOMNode(this.refs.tagField).focus();
	}

	handleRemoveTag(e) {
		e.preventDefault();

		const tagValue = $(e.target).text();
		const tagIndex = this.state.tags.indexOf(tagValue);

		// do nothing if tag doesn't exist or if there is only one tag left ???
		// if (tagIndex === -1 || this.state.tags.length === 1)
		//   return;

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

	deleteUser() {
		//Meteor.users.remove({ _id: Meteor.userId() });
	}

	close() {
		this.setState({ showModal: false });
	}

	open() {
		this.setState({ showModal: true });
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
							onClick={this.open.bind(this)}
						>
							Delete Account
						</Button>
					</div>
					<div className="static-modal">
						<Modal show={this.state.showModal} onHide={this.close.bind(this)}>
							static-modal
							<Modal.Header>
								<Modal.Title>Warning</Modal.Title>
							</Modal.Header>
							<Modal.Body>Are you sure you want to delete?</Modal.Body>
							<Modal.Footer>
								<Button onClick={this.close.bind(this)}>Close</Button>
								<Button bsStyle="danger" onClick={this.deleteUser.bind(this)}>
									Delete
								</Button>
							</Modal.Footer>
						</Modal>
					</div>
				</Card>
				<Card className="ingredients">
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
