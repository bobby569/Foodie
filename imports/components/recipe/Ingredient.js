import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { createContainer } from 'react-meteor-data';
//import { TrackerReact } from 'meteor/ultimatejs:tracker-react';
import { Col, List, Icon } from 'antd';
import { Meteor } from 'meteor/meteor';

export default class Ingredient extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: Meteor.user()
		};

		this.checkExist = this.checkExist.bind(this);
	}

	checkExist(owns, ingredient) {
		if (!Array.isArray(owns)) return false;
		return owns.reduce((a, c) => a || owns.includes(c), false);
	}

	render() {
		const { ingredient, size } = this.props;

		const { user } = this.state;

		if (!user) return <h2>Loading</h2>;
		const { ingredients } = user.profile;

		return (
			<Col lg={size}>
				<List
					className="ingredients"
					size="small"
					header={<h6>Ingredients</h6>}
					bordered
					dataSource={ingredient}
					renderItem={line => (
						<List.Item>
							<List.Item.Meta title={line} />
							{!this.checkExist(ingredients, line) && (
								<Icon type="shopping-cart" />
							)}
						</List.Item>
					)}
				/>
				<br />
				<p>
					<Icon type="shopping-cart" /> = Not in your ingredients list*
				</p>
			</Col>
		);
	}
}

Ingredient.propTypes = {
	ingredient: PropTypes.array.isRequired,
	size: PropTypes.object.isRequired,
	user: PropTypes.object
};
