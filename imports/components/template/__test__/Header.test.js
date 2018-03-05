import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Header from '../Header';

describe('Header', () => {
	const header = shallow(<Header />);
	const rendered = renderer.create(<Header />);

	it('Header should render', () => {
		expect(header.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
