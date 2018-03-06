import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Ingredient from '../Ingredient';

describe('Ingredient', () => {
	const data = {
		ingredient: [],
		size: {}
	};
	const ingredient = shallow(<Ingredient {...data} />);
	const rendered = renderer.create(<Ingredient {...data} />);

	it('Renders correctly', () => {
		expect(ingredient.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
