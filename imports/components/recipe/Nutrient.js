import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, List } from 'antd';

class Nutrient extends Component {
	render() {
		const { nutrient, size } = this.props;

		return (
			<Col lg={size}>
				<List
					className="nutrients"
					size="small"
					header={<h6>Nutrients</h6>}
					bordered
					dataSource={nutrient}
					renderItem={item => (
						//item && (
						<List.Item>
							<List.Item.Meta title={item.label} />
							<div className="quantity">
								{`${~~item.quantity} ${item.unit}`}
							</div>
						</List.Item>
					)
					//)
					}
				/>
			</Col>
		);
	}
}

Nutrient.propTypes = {
	nutrient: PropTypes.array.isRequired,
	size: PropTypes.object.isRequired
};

export default Nutrient;
