import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { message } from 'antd';

class Avatar extends Component {
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

	render() {
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
}

Avatar.propTypes = {
	user: PropTypes.object.isRequired
};

export default Avatar;
