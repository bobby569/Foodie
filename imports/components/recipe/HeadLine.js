import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import RecipeStatus from './RecipeStatus';

class HeadLine extends Component {
	render() {
		const {
			id,
			views,
			data: { label, image, source, healthLabels, dietLabels, calories }
		} = this.props;

		return (
			<div className="upper">
				<div className="label">{label}</div>
				<img src={image} alt="Image" />
				<div className="source">By {source}</div>
				<div className="tags">
					{healthLabels &&
						healthLabels.length > 0 &&
						healthLabels.map(item => (
							<Tag key={item} color="volcano">
								{item}
							</Tag>
						))}
					{dietLabels &&
						dietLabels.length > 0 &&
						dietLabels.map(item => (
							<Tag key={item} color="orange">
								{item}
							</Tag>
						))}
					<Tag color="gold">{~~calories} calories</Tag>
				</div>
				<RecipeStatus id={id} views={views} />
			</div>
		);
	}
}

HeadLine.propTypes = {
	data: PropTypes.object.isRequired,
	id: PropTypes.string.isRequired,
	views: PropTypes.number.isRequired
};

export default HeadLine;
