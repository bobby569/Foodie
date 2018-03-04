import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Icon } from 'antd';

class HeadLine extends Component {
	render() {
		const {
			label,
			image,
			calories,
			healthLabels,
			dietLabels,
			source
		} = this.props.data;

		return (
			<div className="upper">
				<div className="label">{label}</div>
				<img src={image} alt="Image" />
				<div className="source">By {source}</div>
				<div className="tags">
					{healthLabels.map(item => (
						<Tag key={item} color="volcano">
							{item}
						</Tag>
					))}
					{dietLabels.map(item => (
						<Tag key={item} color="orange">
							{item}
						</Tag>
					))}
					<Tag color="gold">{~~calories} calories</Tag>
				</div>
				<div className="likes">
					<Icon type="heart-o" className="heart" />
					<Icon type="save" className="save" />
					<Icon type="eye" className="view" />
					100 views
				</div>
			</div>
		);
	}
}

HeadLine.propTypes = {
	data: PropTypes.object.isRequired
};

export default HeadLine;
