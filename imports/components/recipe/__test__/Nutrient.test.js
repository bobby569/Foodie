import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Nutrient from '../Nutrient';

describe('Nutrient', () => {
	const data = {
		nutrient: [],
		size: {}
	};
	const nutrient = shallow(<Nutrient {...data} />);
	const rendered = renderer.create(<Nutrient {...data} />);

	it('Renders correctly', () => {
		expect(nutrient.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
