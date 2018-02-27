import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, List } from 'antd';

class Ingredient extends Component {
	render() {
		const { ingredient, size } = this.props;

		return (
			<Col lg={size}>
				<List
					className="ingredients"
					size="small"
					header={<h6>Ingredients</h6>}
					bordered
					dataSource={ingredient}
					renderItem={item => <List.Item>{item}</List.Item>}
				/>
			</Col>
		);
	}
}

Ingredient.propTypes = {
	ingredient: PropTypes.array.isRequired,
	size: PropTypes.object.isRequired
};

export default Ingredient;
