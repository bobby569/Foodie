import React from 'react';
import { shallow } from 'enzyme';
import Header from '../components/template/Header';

describe('Hooter', () => {
	const header = shallow(<Header />);
	it('Footer should render', () => {
		expect(header.exists()).toBe(true);
	});
});
