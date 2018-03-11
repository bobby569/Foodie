import React from 'react';
import { mount, shallow } from 'enzyme';
import EmailAction from '../EmailAction.js';
import { shallowToJson } from 'enzyme-to-json';

const showConfirm = jest.fn();

describe('EmailAction', () => {
	const fake = 'abc@abc.com';
	const emailaction = shallow(<EmailAction email={fake} />);

	it('EmailAction should render', () => {
		expect(emailaction.exists()).toBe(true);
		expect(shallowToJson(emailaction)).toMatchSnapshot();
	});

	it('Email address', () => {
		const email = emailaction.find('p').html();
		const expected = '@';
		expect(email.includes(expected)).toBe(true);
	});

	it('Delete Button', () => {
		const deleteButton = emailaction.find('.delete');
		deleteButton.simulate('click');
	});
});
