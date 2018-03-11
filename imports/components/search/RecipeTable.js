import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Tag } from 'antd';

const style = { fontSize: 10 };

export const columns = [
	{
		title: 'Dish Name',
		dataIndex: 'label',
		key: 'label',
		render: (text, record) => (
			<Link to={`/recipe/${record.api_id}`}>{text}</Link>
		)
	},
	{
		title: 'Calories',
		dataIndex: 'calories',
		key: 'calories',
		render: text => ~~text,
		sorter: (a, b) => ~~b.calories - ~~a.calories
	},
	{
		title: 'Health',
		dataIndex: 'healthLabels',
		key: 'healthLabels',
		render: text =>
			text.map(item => (
				<Tag style={style} key={item} color="green">
					{item}
				</Tag>
			))
	},
	{
		title: 'Diet',
		dataIndex: 'dietLabels',
		key: 'dietLabels',
		render: text =>
			text.map(item => (
				<Tag style={style} key={item} color="green">
					{item}
				</Tag>
			))
	}
];

class RecipeTable extends Component {
	render() {
		const { data, customColumns } = this.props;
		return (
			<div className="table">
				<Table
					columns={customColumns || columns}
					dataSource={data}
					rowKey={record => record.api_id}
					pagination={false}
					bordered
				/>
			</div>
		);
	}
}

RecipeTable.propTypes = {
	data: PropTypes.array.isRequired,
	customColumns: PropTypes.array
};

export default RecipeTable;
