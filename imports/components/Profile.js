import React, { Component } from 'react';
import { Layout, Menu, Avatar } from 'antd';
import { Image } from 'react-bootstrap';
import Dropzone from 'react-dropzone';

export default class Profile extends Component {
	register(event) {
		event.preventDefault();
	}
	handleUpload() {}

	render() {
		let user = this.props.user;
		return (
			<div>
				<Dropzone onDrop={this.handleUpload.bind(this)} className="dropzone">
					<div className="avatar" />
				</Dropzone>
			</div>
		);
	}
}
