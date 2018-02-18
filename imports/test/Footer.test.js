import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../components/template/Footer';

describe('Footer', () => {
	const footer = shallow(<Footer />);
	it('Footer should render', () => {
		expect(footer.exists()).toBe(true);
	});
});
