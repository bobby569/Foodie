import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import axios from 'axios';
import { Divider, List, Button, Icon, Row, Col } from 'antd';
import { API, URI_BASE_RETR } from './util/constant.js';
import HeadLine from './recipe/HeadLine';

export default class Class extends TrackerReact(Component) {
	constructor(props) {
		super(props);

		this.state = {
			id: 0,
			data: null
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		const url = `${API}&r=${URI_BASE_RETR}${id}`;

		axios.get(url).then(({ data }) => {
			this.setState({ data: data[0] });
			this.forceUpdate();
		});
	}

	render() {
		const { data } = this.state;
		if (!data) return <div>Loading</div>;

		const { ingredientLines, url, totalNutrients } = data;
		const { CA, FE, K, MG, NA, VITC } = totalNutrients;
		const nutrientsdata = [CA, FE, K, MG, NA, VITC];

		return (
			<div className="recipe-details">
				<HeadLine data={data} />
				<Divider>More about the recipe</Divider>
				<div className="lower">
					<Row gutter={{ xs: 10, lg: 5 }}>
						<Col lg={{ span: 12 }}>
							<List
								className="ingredients"
								size="small"
								header={<h6>Ingredients</h6>}
								bordered
								dataSource={ingredientLines}
								renderItem={item => <List.Item>{item}</List.Item>}
							/>
						</Col>
						<Col lg={{ span: 12 }}>
							<List
								className="nutrients"
								size="small"
								header={<h6>Nutrients</h6>}
								bordered
								dataSource={nutrientsdata}
								renderItem={item =>
									item && (
										<List.Item>
											<List.Item.Meta title={item['label']} />
											<div className="quantity">
												{Math.round(item['quantity'])}
												{item['unit']}
											</div>
										</List.Item>
									)
								}
							/>
						</Col>
					</Row>
					<div className="url">
						<Button
							type="primary"
							className="directions"
							size="large"
							target="_blank"
							href={url}
						>
							See Detail<Icon type="right" />
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
