import React, { Component } from 'react';
import axios from 'axios';
import { Tag } from 'antd';

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
		let recipe = this.state.data['hits'][0]['recipe'];
		//label
		let label = recipe['label'];
		//ingredients
		let ingredients = recipe['ingredientLines'];
		//url for directions
		let directionUrl = recipe['url'];
		//picture
		let image = recipe['image'];
		//calorie
		let calorie = Math.round(recipe['calories']);
		//healthLabels
		let healthLabels = recipe['healthLabels'];
		let hlabels = healthLabels.map(item => <Tag color="volcano">{item}</Tag>);
		//dietLabels
		let dietLabels = recipe['dietLabels'];
		let dlabels = dietLabels.map(item => <Tag color="orange">{item}</Tag>);
		//source
		let source = recipe['source'];
		//{this.props.match.params.id}

		return (
			<div>
				<div className="upper">
					{label}
					<div className="source">By {source}</div>
					<div className="labels">
						{hlabels}
						{dlabels}
						<Tag color="gold">{calorie} calories</Tag>
					</div>
					<img className="image" src={image} alt="Image" />
				</div>
				<div className="lower" />
			</div>
		);
	}
}
