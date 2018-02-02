import React, { Component } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { Image } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';

class Profile extends TrackerReact(Component) {
	constructor(props) {
		super(props);
	}

	// componentWillMount() {
	// 	setTimeout(() => {
	// 		let user = Meteor.user();
	// 		console.log(user);
	// 		this.setState({ user });
	// 	}, 1000);
	// }

	register(event) {
		event.preventDefault();
	}

	handleUpload(files) {
		//this function is called whenever a file was dropped in your dropzone
		console.log('test');
		files.forEach(file => {
			file.owner = Meteor.userId(); //before upload also save the owner of that file
			Avatars.insert(file, function(err, fileObj) {
				if (err) {
					console.log(err); //in case there is an error, log it to the console
				} else {
					//the image upload is done successfully.
					//you can use this callback to add the id of your file into another collection
					//for this you can use fileObj._id to get the id of the file
					setTimeout(function() {
						Meteor.users.update(
							{ _id: Meteor.userId() },
							{
								$set: { 'profile.avatar': `/cfs/files/avatars/${fileObj._id}` }
							}
						);
					}, 1000);
				}
			});
		});
	}

	renderImagePreview() {
		if (!this.props.user) {
			return null;
		}
		return (
			<Dropzone onDrop={this.handleUpload.bind(this)} className="avatar">
				{this.props.user.profile && (
					<img className="avatar" src={this.props.user.profile.avatar} />
				)}
			</Dropzone>
		);
	}

	render() {
		return <div>{this.renderImagePreview()}</div>;
	}
}

export default createContainer(route => {
	return {
		user: Meteor.user()
	};
}, Profile);
