import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { createContainer } from 'react-meteor-data';
//import { TrackerReact } from 'meteor/ultimatejs:tracker-react';
import { Col, List, Icon } from 'antd';
import { Meteor } from 'meteor/meteor';

export default class Ingredient extends Component {
	constructor(props) {
		super(props);

		this.checkExist = this.checkExist.bind(this);
		this.state = {
			user: Meteor.user()
		};
	}

	checkExist(owns, ingredient) {
		if (!Array.isArray(owns)) return false;

		let res = false;
		owns.forEach(item => {
			res = ingredient.includes(item);
		});
		return res;
	}

	render() {
		const { ingredient, size } = this.props;

		const { user } = this.state;

		if (!user) return <h2>Loading</h2>;

		return (
			<Col lg={size}>
				<List
					className="ingredients"
					size="small"
					header={<h6>Ingredients</h6>}
					bordered
					dataSource={ingredient}
					renderItem={item => (
						<List.Item>
							<List.Item.Meta title={item} />
							{this.checkExist(user.profile.ingredients, item) ? null : (
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
	size: PropTypes.object.isRequired
};
