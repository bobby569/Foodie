import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

class TagGroup extends Component {
	render() {
		const { tags, onRemove } = this.props;
		return (
			<div className="modalTagsContainer">
				{tags.map(tag => (
					<span onClick={onRemove} key={tag}>
						{tag} <Icon type="close" />
					</span>
				))}
			</div>
		);
	}
}

TagGroup.propTypes = {
	tags: PropTypes.array.isRequired,
	onRemove: PropTypes.func.isRequired
};

export default TagGroup;
