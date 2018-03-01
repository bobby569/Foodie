import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Footer from '../Footer';

describe('Footer', () => {
	const footer = shallow(<Footer />);
	const rendered = renderer.create(<Footer />);

	it('Footer should render', () => {
		expect(footer.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});

	it('Footer has correct content', () => {
		const expectContent = 'Foodie © 2018 Created by Foodie Team';
		const realOutput = footer.find('.footer').html();
		expect(realOutput.indexOf(expectContent) > -1).toBe(true);
	});
});
