import React from 'react';
import { mount, shallow } from 'enzyme';
import Avatar from '../Avatar.js';

describe('Avatar', () => {
	const fake = new Object();
	const avatar = shallow(<Avatar user={fake} />);

	it('Avatar should render', () => {
		expect(avatar.exists()).toBe(true);
	});
});
