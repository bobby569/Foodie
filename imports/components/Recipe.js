import React, { Component } from 'react';
import axios from 'axios';
import { Tag, Divider, List, Button, Icon, Row, Col } from 'antd';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { API, URI_BASE_RETR } from './util/constant.js';

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
		let url = `${API}&r=${URI_BASE_RETR}${id}`;

		axios.get(url).then(({ data }) => {
			this.state.data = data[0];
			this.forceUpdate();
		});
	}

	render() {
		if (!this.state.data) return <div>Loading</div>;
		let recipe = this.state.data;
		console.log(recipe);

		let {
			label,
			ingredientLines,
			url,
			image,
			calories,
			healthLabels,
			dietLabels,
			source,
			totalNutrients
		} = recipe;
		//calorie
		let calorie = Math.round(calories);
		//healthLabels
		let hlabels = healthLabels.map(item => <Tag color="volcano">{item}</Tag>);
		//dietLabels
		let dlabels = dietLabels.map(item => <Tag color="orange">{item}</Tag>);
		//ingredients
		const data = ingredientLines;
		//nutrients
		let { CA, FE, K, MG, NA, VITC } = totalNutrients;
		const nutrientsdata = [CA, FE, K, MG, NA, VITC];
		//{this.props.match.params.id}

		return (
			<div className="recipe-details">
				<div className="upper">
					<div className="label">{label}</div>
					<img src={image} alt="Image" />
					<div className="source">By {source}</div>
					<div className="tags">
						{hlabels}
						{dlabels}
						<Tag color="gold">{calorie} calories</Tag>
					</div>
				</div>
				<Divider>More about the recipe</Divider>
				<div className="lower">
					<Row gutter={{ xs: 10, lg: 5 }}>
						<Col lg={{ span: 12 }}>
							<List
								className="ingredients"
								size="small"
								header={<h6>Ingredients</h6>}
								bordered
								dataSource={data}
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
									item ? (
										<List.Item>
											<List.Item.Meta title={item['label']} />
											<div className="quantity">
												{Math.round(item['quantity'])}
												{item['unit']}
											</div>
										</List.Item>
									) : (
										<div />
									)}
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
							Directions<Icon type="right" />
						</Button>
					</div>
				</div>
			</div>
		);
	}
}
