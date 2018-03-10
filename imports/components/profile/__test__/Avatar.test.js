import React from 'react';
import { mount, shallow } from 'enzyme';
import Avatar from '../Avatar.js';
import { shallowToJson } from 'enzyme-to-json';

describe('Avatar', () => {
	const fake = new Object();
	const avatar = shallow(<Avatar user={fake} />);

	it('Avatar should render', () => {
		expect(avatar.exists()).toBe(true);
		expect(shallowToJson(avatar)).toMatchSnapshot();
	});
});
