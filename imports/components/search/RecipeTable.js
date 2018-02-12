import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Tag } from 'antd';

const columns = [
	{
		title: 'Dish Name',
		dataIndex: 'label',
		key: 'label',
		render: (text, record) => <Link to={`/recipe/${record.id}`}>{text}</Link>
	},
	{
		title: 'Calories',
		dataIndex: 'calories',
		key: 'calories',
		render: text => ~~text
	},
	{
		title: 'Health',
		dataIndex: 'healthLabels',
		key: 'healthLabels',
		render: text =>
			text.map(item => (
				<Tag key={item} color="green">
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
				<Tag key={item} color="green">
					{item}
				</Tag>
			))
	}
];

class RecipeTable extends Component {
	render() {
		const { data } = this.props;
		console.log(data);
		return (
			<div className="table">
				<Table
					columns={columns}
					dataSource={data}
					rowKey={record => record.id}
					pagination={false}
					bordered
				/>
			</div>
		);
	}
}

RecipeTable.propTypes = {
	data: PropTypes.array.isRequired
};

export default RecipeTable;
