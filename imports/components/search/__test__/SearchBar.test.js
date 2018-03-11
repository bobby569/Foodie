import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SearchBar from '../SearchBar';

const mockSearch = jest.fn();
const val = new Object();
mockSearch(val);

describe('SearchBar', () => {
	const search_bar = shallow(<SearchBar onSearch={mockSearch} />);
	// const rendered = renderer.create(
	// 	<SearchBar onSearch={val => mockSearch(val)} />
	// );

	it('Renders correctly', () => {
		expect(search_bar.exists()).toBe(true);
		//expect(rendered.toJSON()).toMatchSnapshot();
	});

	// it('Calls onSearch when click button', () => {
	// 	search_bar.find('Search').simulate('click');
	// 	expect(mockSearch).toBeCalledWith('click');
	// });
});
