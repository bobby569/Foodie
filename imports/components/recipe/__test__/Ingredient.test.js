import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Ingredient from '../Ingredient';

jest.mock('react-meteor-data');

describe('Ingredient', () => {
	const data = {
		ingredient: ['tomato', 'potato'],
		size: {},
		user: {
			profile: {
				ingredients: ['tomato', 'potato']
			}
		}
	};
	const ingredient = shallow(<Ingredient {...data} />);

	it('Renders correctly', () => {
		expect(ingredient.exists()).toBe(true);
	});
});
