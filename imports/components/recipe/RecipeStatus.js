import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, message } from 'antd';

class RecipeStatus extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hasLike: false
		};
	}

	componentDidMount() {
		const { likes } = this.props;
		const hasLike = likes.includes(Meteor.userId());
		this.setState({ hasLike });
	}

	saveRecipe() {
		const { id } = this.props;
		Meteor.call('users.saveRecipe', Meteor.userId(), id, (err, res) => {
			if (err) return message.error(err);
			message.success('Recipe saved successfully!');
		});
	}

	likeRecipe() {
		const { id } = this.props;
		Meteor.call('recipes.addLike', Meteor.userId(), id, (err, res) => {
			if (err) return message.error(err);
			message.success('Liked!');
			this.setState({ hasLike: true });
		});
	}

	cancelLike() {
		const { id } = this.props;
		Meteor.call('recipes.cancelLike', Meteor.userId(), id, (err, res) => {
			if (err) return message.error(err);
			message.success('Unliked!');
			this.setState({ hasLike: false });
		});
	}

	render() {
		const { state: { hasLike }, props: { views } } = this;
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
				{views} views
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
