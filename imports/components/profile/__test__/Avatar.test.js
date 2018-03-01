import React from 'react';
import { mount, shallow } from 'enzyme';
import Avatar from '../Avatar.js';

describe('Avatar', () => {
	const avatar = shallow(<Avatar />);
	it('Avatar should render', () => {
		expect(avatar.exists()).toBe(true);
	});
});
