import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

class TagGroup extends Component {
	render() {
		const { tags, onDismiss } = this.props;
		return (
			<div className="modalTagsContainer">
				{tags.map(tag => (
					<span key={tag} onClick={() => onDismiss(tag)}>
						{tag} <Icon type="close" />
					</span>
				))}
			</div>
		);
	}
}

TagGroup.propTypes = {
	tags: PropTypes.array.isRequired,
	onDismiss: PropTypes.func.isRequired
};

export default TagGroup;
