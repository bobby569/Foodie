import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Direction from '../Direction';

describe('Direction', () => {
	const direction = shallow(<Direction />);
	const rendered = renderer.create(<Direction />);

	it('Renders correctly', () => {
		expect(direction.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
