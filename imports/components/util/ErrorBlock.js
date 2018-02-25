import React from 'react';
import { Icon, List } from 'antd';

const data = [
	{
		err: 'Network Error',
		msg: 'Please check your network!'
	},
	{
		err: "You didn't login",
		msg: 'Please login!'
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
					{item.err} | {item.msg}
				</List.Item>
			)}
		/>
	</div>
);
