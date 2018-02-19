import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Footer from '../components/template/Footer';

describe('Footer', () => {
	const footer = shallow(<Footer />);
	const rendered = renderer.create(<Footer />);

	it('Footer should render', () => {
		expect(footer.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
