import React from 'react';
import { mount, shallow } from 'enzyme';
import TagGroup from '../TagGroup.js';
import { shallowToJson } from 'enzyme-to-json';

const handleRemove = jest.fn();

describe('TagGroup', () => {
	const fake = ['tomato'];
	const taggroup = shallow(
		<TagGroup tags={fake} onDismiss={fake => handleRemove} />
	);

	it('TagGroup should render', () => {
		expect(taggroup.exists()).toBe(true);
		expect(shallowToJson(taggroup)).toMatchSnapshot();
	});
});
