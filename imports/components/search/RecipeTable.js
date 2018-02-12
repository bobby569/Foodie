import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table } from 'antd';

const columns = [
	{
		title: 'Title',
		dataIndex: 'title',
		key: 'title',
		render: text => <Link to="/">{text}</Link>
	},
	{
		title: 'Author',
		dataIndex: 'author',
		key: 'author'
	},
	{
		title: 'Points',
		dataIndex: 'points',
		key: 'points'
	}
];

class RecipeTable extends Component {
	render() {
		const { data } = this.props;
		console.log(data);
		return null;
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
