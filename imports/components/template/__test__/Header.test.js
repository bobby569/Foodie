import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe('Header', () => {
	const header = shallow(<Header />);

	it('Header should render', () => {
		expect(header.exists()).toBe(true);
	});
});
