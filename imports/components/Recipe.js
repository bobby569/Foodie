import React, { Component } from 'react';
import axios from 'axios';
import { Tag, Divider, List, Button, Icon } from 'antd';

export default class Class extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: 0,
			data: null
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.setState({ id });
		axios
			.get(
				'https://api.edamam.com/search?q=chicken&app_id=06054e01&app_key=%208ac8228d49c7f57077d45d99b1ac781f&from=0&to=2'
			)
			.then(({ data }) => {
				this.setState({ data });
				console.log(data['hits'][0]['recipe']);
			});
	}

	render() {
		if (!this.state.data) return <div>Loading</div>;
		let { recipe } = this.state.data['hits'][0];
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
			<div>
				<div className="upper">
					{label}
					<img className="image" src={image} alt="Image" />
					<div className="source">By {source}</div>
					<div className="labels">
						{hlabels}
						{dlabels}
						<Tag color="gold">{calorie} calories</Tag>
					</div>
				</div>
				<Divider>More about the recipe</Divider>
				<div className="lower">
					<List
						className="ingredients"
						size="small"
						header={<h6>Ingredients</h6>}
						bordered
						dataSource={data}
						renderItem={item => <List.Item>{item}</List.Item>}
					/>
					<List
						className="nutrients"
						size="small"
						header={<h6>Nutrients</h6>}
						bordered
						dataSource={nutrientsdata}
						renderItem={item => (
							<List.Item>
								<List.Item.Meta title={item['label']} />
								<div className="quantity">
									{Math.round(item['quantity'])}
									{item['unit']}
								</div>
							</List.Item>
						)}
					/>
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
