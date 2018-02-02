import React from 'react';
import { Icon, List } from 'antd';

const data = [
	{
		err: 'Network Error',
		todo: 'Please check your network!'
	},
	{
		err: "You didn't login",
		todo: 'Please login!'
	}
];

export default () => (
	<div className="div-center">
		<h4>
			<Icon type="frown" /> Something went wrong
		</h4>
		<h5>Probably because:</h5>
		<List
			bordered
			className="error"
			dataSource={data}
			renderItem={item => (
				<List.Item>
					{item.err} | {item.todo}
				</List.Item>
			)}
		/>
	</div>
);
