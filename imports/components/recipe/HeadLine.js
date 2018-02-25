import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

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
					<Tag color="gold">{Math.round(calories)} calories</Tag>
				</div>
			</div>
		);
	}
}

HeadLine.propTypes = {
	data: PropTypes.object.isRequired
};

export default HeadLine;
