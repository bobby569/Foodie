import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import RecipeStatus from '../RecipeStatus';

describe('RecipeStatus', () => {
	const data = {
		id: '',
		views: 0
	};
	const status = shallow(<RecipeStatus {...data} />);
	const rendered = renderer.create(<RecipeStatus {...data} />);

	it('Renders correctly', () => {
		expect(status.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
