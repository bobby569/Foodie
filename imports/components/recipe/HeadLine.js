import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import RecipeStatus from './RecipeStatus';

class HeadLine extends Component {
	render() {
		const {
			id,
			views,
			likes,
			data: { label, image, source, healthLabels, dietLabels, calories }
		} = this.props;

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
				<RecipeStatus id={id} views={views} likes={likes} />
			</div>
		);
	}
}

HeadLine.propTypes = {
	data: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	views: PropTypes.number.isRequired,
	likes: PropTypes.array.isRequired
};

export default HeadLine;
