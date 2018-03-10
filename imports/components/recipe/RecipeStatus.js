import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, message } from 'antd';
import { Meteor } from 'meteor/meteor';

class RecipeStatus extends Component {
	constructor(props) {
		super(props);
		this.state = { hasLike: this.hasLike() };
	}

	saveRecipe() {
		const recipeId = this.props.id;
		Meteor.call('users.saveRecipe', Meteor.userId(), recipeId, (err, res) => {
			if (err) return message.error(err);
			message.success('Recipe saved successfully!');
		});
	}

	likeRecipe() {
		const recipeId = this.props.id;
		Meteor.call('recipes.addLike', Meteor.userId(), recipeId, (err, res) => {
			if (err) return message.error(err);
			message.success('Liked!');
			this.setState({ hasLike: true });
		});
	}

	cancelLike() {
		const recipeId = this.props.id;
		Meteor.call('recipes.cancelLike', Meteor.userId(), recipeId, (err, res) => {
			if (err) return message.error(err);
			message.success('Unliked!');
			this.setState({ hasLike: false });
		});
	}

	hasLike() {
		const likes = this.props.likes;
		return likes.includes(Meteor.userId());
	}

	render() {
		const { hasLike } = this.state;
		return (
			<div className="status">
				{hasLike ? (
					<Icon
						type="heart"
						className="icon like"
						onClick={this.cancelLike.bind(this)}
					/>
				) : (
					<Icon
						type="heart-o"
						className="icon like"
						onClick={this.likeRecipe.bind(this)}
					/>
				)}
				<Icon
					type="save"
					className="icon save"
					onClick={this.saveRecipe.bind(this)}
				/>
				<Icon type="eye" className="view" />
				{this.props.views} views
			</div>
		);
	}
}

RecipeStatus.propTypes = {
	id: PropTypes.string.isRequired,
	views: PropTypes.number.isRequired,
	likes: PropTypes.array.isRequired
};

export default RecipeStatus;
