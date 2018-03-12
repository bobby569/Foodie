import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../Layout';

describe('Layout', () => {
	const layout = shallow(<Layout />);

	it('Layout should render', () => {
		expect(layout.exists()).toBe(true);
	});
});
