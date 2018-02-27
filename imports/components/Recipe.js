import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import axios from 'axios';
import { Divider, Row } from 'antd';
import { API, URI_BASE_RETR } from './util/constant.js';
import HeadLine from './recipe/HeadLine';
import Ingredient from './recipe/Ingredient';
import Nutrient from './recipe/Nutrient';
import Direction from './recipe/Direction';

class Recipe extends TrackerReact(Component) {
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

		const rowSize = { xs: 10, lg: 5 };
		const colSize = { span: 12 };
		const { ingredientLines, url, totalNutrients } = data;
		const { CA, FE, K, MG, NA, VITC } = totalNutrients;
		const nutrientsdata = [CA, FE, K, MG, NA, VITC].filter(item => item);

		return (
			<div className="recipe-details">
				<HeadLine data={data} />
				<Divider>More about the recipe</Divider>
				<div className="lower">
					<Row gutter={rowSize}>
						<Ingredient ingredient={ingredientLines} size={colSize} />
						<Nutrient nutrient={nutrientsdata} size={colSize} />
					</Row>
					<Direction url={url} />
				</div>
			</div>
		);
	}
}

export default Recipe;
