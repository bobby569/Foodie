import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { createContainer } from 'react-meteor-data';
import { message } from 'antd';

class Profile extends TrackerReact(Component) {
	handleUpload(files) {
		const file = files[0];
		file.owner = Meteor.userId();
		Avatars.insert(file, (err, fileObj) => {
			if (err) return message.error('Please upload image file only');

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

	render() {
		const {user} = this.props;
		if (!user) return null;

		return(
			<Dropzone onDrop={this.handleUpload.bind(this)} className="avatar">
				{user.profile && (
					<img className="avatar avatar-uploader" src={user.profile.avatar} alt="avatar" />
				)}
			</Dropzone>
		)
	}
}

export default createContainer(route => {
	return {
		user: Meteor.user()
	};
}, Profile);
