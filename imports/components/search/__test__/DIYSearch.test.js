import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import DIYSearch from '../DIYSearch';

jest.mock('meteor/meteor');
jest.mock(Array.prototype.join());

describe('DIYSearch', () => {
	const diysearch = shallow(<DIYSearch />);

	it('DIYSearch should render', () => {
		expect(diysearch.exists()).toBe(true);
		expect(shallowToJson(diysearch)).toMatchSnapshot();
	});

	it('Click on getrecipe', () => {
		diysearch.setState({ recipes: [{}] });
		const more = diysearch.find('.more');
		more.simulate('click');
	});

	it('getRecipe', () => {
		diysearch.instance().getRecipe();
		expect(diysearch.state().err).toBe(null);
	});
});
