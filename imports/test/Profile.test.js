import React from 'react';
import { mount, shallow } from 'enzyme';
import Profile from '../components/Profile.js';
import Avatar from '../components/profile/Avatar.js';

describe('Profile', () => {
	const avatar = shallow(<Avatar />);
	it('Avatar should render', () => {
		expect(avatar.exists()).toBe(true);
	});
});
