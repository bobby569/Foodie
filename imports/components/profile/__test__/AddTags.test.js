import React from 'react';
import { mount, shallow } from 'enzyme';
import AddTags from '../AddTags.js';
import { shallowToJson } from 'enzyme-to-json';

const onEnter = jest.fn();
const onAdd = jest.fn();

describe('AddTags', () => {
	const fake = 'tomato';
	const addtags = shallow(
		<AddTags value={fake} onEnter={onEnter} onAdd={onAdd} />
	);
	//const addbutton = shallow(addtags.find('.tag'));

	it('AddTags should render', () => {
		expect(addtags.exists()).toBe(true);
		expect(shallowToJson(addtags)).toMatchSnapshot();
	});

	// it('Add Button', () => {
	// 	output.simulate('click');
	// 	expect(onAdd).toHaveBeenCalledWith(addbutton);
	// 	expect(onAdd).toHaveBeenCalledTimes(1);
	// });
});
