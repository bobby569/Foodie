import React from 'react';
import { mount, shallow } from 'enzyme';
import TagGroup from '../TagGroup.js';
import { shallowToJson } from 'enzyme-to-json';

const handleRemove = jest.fn();

describe('TagGroup', () => {
	const fake = ['tomato'];
	const taggroup = shallow(<TagGroup tags={fake} onDismiss={handleRemove} />);

	it('TagGroup should render', () => {
		expect(taggroup.exists()).toBe(true);
		expect(shallowToJson(taggroup)).toMatchSnapshot();
	});

	it('Click remove', () => {
		taggroup.simulate('click');
		expect(handleRemove.mock.calls.length).toBe(0);
	});
});
