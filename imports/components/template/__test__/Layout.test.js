import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Layout from '../Layout';

describe('Layout', () => {
	const layout = shallow(<Layout />);
	const rendered = renderer.create(<Layout />);

	it('Layout should render', () => {
		expect(layout.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
