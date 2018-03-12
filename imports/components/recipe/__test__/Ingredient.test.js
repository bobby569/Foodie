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

	it('CheckExist', () => {
		const owns = data.user.profile.ingredients;
		expect(ingredient.instance().checkExist('', '')).toBe(false);
		expect(ingredient.instance().checkExist(owns, 'apple')).toBe(false);
		expect(ingredient.instance().checkExist(owns, 'tomato')).toBe(true);
	});
});
