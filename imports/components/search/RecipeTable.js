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
		const dataSource = data.filter(item => item.title);
		// console.log(dataSource);
		return (
			<div className="table">
				<Table
					columns={columns}
					dataSource={dataSource}
					rowKey={record => record.objectID}
					pagination={false}
					bordered
				/>
			</div>
		);
	}
}

export default RecipeTable;
