import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import RecipeTable from '../components/search/RecipeTable';

describe('RecipeTable', () => {
	const data = [];
	const recipe_table = shallow(<RecipeTable data={data} />);
	const rendered = renderer.create(<RecipeTable data={data} />);

	it('Renders correctly', () => {
		expect(recipe_table.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
