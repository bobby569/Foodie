import React from 'react';
import { Button, Icon } from 'antd';

export default props => (
	<div className="url">
		<Button
			type="primary"
			className="directions"
			size="large"
			target="_blank"
			href={props.url}
		>
			See Detail<Icon type="right" />
		</Button>
	</div>
);
