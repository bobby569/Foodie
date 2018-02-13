import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select } from 'antd';
const { Option } = Select;

class FilterGroup extends Component {
	render() {
		const { onDietChange, onHealthChange } = this.props;

		return (
			<div className="search-filter">
				<Row gutter={24}>
					<Col span={12}>
						<Select
							className="search-select"
							defaultValue="intro"
							onChange={onDietChange}
						>
							<Option value="intro" disabled>
								Choose Diet
							</Option>
							<Option value="balanced">Balanced</Option>
							<Option value="high-protein">High Protein</Option>
							<Option value="high-fiber">High Fiber</Option>
							<Option value="low-fat">Low Fat</Option>
							<Option value="low-carb">Low Carb</Option>
							<Option value="low-sodium">Low Sodium</Option>
							<Option value="none">No Restriction</Option>
						</Select>
					</Col>
					<Col span={12}>
						<Select
							className="search-select"
							defaultValue="intro"
							onChange={onHealthChange}
						>
							<Option value="intro" disabled>
								Choose Health
							</Option>
							<Option value="peanut-free">Peanut Free</Option>
							<Option value="tree-nut-free">Tree Nut Free</Option>
							<Option value="soy-free">Soy Free</Option>
							<Option value="fish-free">Fish Free</Option>
							<Option value="shellfish-free">Shellfish Free</Option>
							<Option value="none">No Restriction</Option>
						</Select>
					</Col>
				</Row>
			</div>
		);
	}
}

FilterGroup.propTypes = {
	onDietChange: PropTypes.func.isRequired,
	onHealthChange: PropTypes.func.isRequired
};

export default FilterGroup;
