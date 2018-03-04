import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Icon, Button, message } from 'antd';

class HeadLine extends Component {
	saveRecipe() {
		const recipeId = this.props.id;
		Meteor.call('users.saveRecipe', Meteor.userId(), recipeId, (err, res) => {
			if (err) {
				message.error(err);
			} else {
				message.success('Recipe saved successfully!');
			}
		});
	}

	likeRecipe() {
		const recipeId = this.props.id;
		Meteor.call('recipes.addLike', recipeId, (err, res) => {
			console.log(res);
			if (err) {
				message.error(err);
			} else {
				message.success('Liked!');
			}
		});
	}

	cancelLike() {
		const recipeId = this.props.id;
		Meteor.call('recipes.cancelLike', recipeId, (err, res) => {
			if (err) {
				message.error(err);
			} else {
				message.success('Unliked!');
			}
		});
	}

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
					<Button
						className="like"
						onClick={this.likeRecipe.bind(this)}
						ghost={true}
					>
						<Icon type="heart-o" className="heart" />
					</Button>
					<Button
						className="save"
						onClick={this.saveRecipe.bind(this)}
						ghost={true}
					>
						<Icon type="save" />
					</Button>
					<Icon type="eye" className="view" />
					{this.props.views} views
				</div>
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
