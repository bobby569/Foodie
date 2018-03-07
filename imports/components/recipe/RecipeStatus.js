import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, message } from 'antd';

class RecipeStatus extends Component {
	saveRecipe() {
		const recipeId = this.props.id;
		Meteor.call('users.saveRecipe', Meteor.userId(), recipeId, (err, res) => {
			if (err) return message.error(err);
			message.success('Recipe saved successfully!');
		});
	}

	likeRecipe() {
		const recipeId = this.props.id;
		Meteor.call('recipes.addLike', recipeId, (err, res) => {
			console.log(res);
			if (err) return message.error(err);
			message.success('Liked!');
		});
	}

	cancelLike() {
		const recipeId = this.props.id;
		Meteor.call('recipes.cancelLike', recipeId, (err, res) => {
			if (err) return message.error(err);
			message.success('Unliked!');
		});
	}

	render() {
		return (
			<div className="status">
				<Icon
					type="heart-o"
					className="icon like"
					onClick={this.likeRecipe.bind(this)}
				/>
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
	views: PropTypes.number.isRequired
};

export default RecipeStatus;
