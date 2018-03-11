import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LibrarySearch from '../LibrarySearch';

jest.mock('meteor/meteor');

describe('LibrarySearch', () => {
	const librarysearch = shallow(<LibrarySearch />);

	it('LibrarySearch should render', () => {
		expect(librarysearch.exists()).toBe(true);
		expect(shallowToJson(librarysearch)).toMatchSnapshot();
	});

	it('Click on getrecipe', () => {
		librarysearch.setState({ recipes: [{}] });
		const more = librarysearch.find('.more');
		more.simulate('click');
	});
});
