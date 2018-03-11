import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
	const mockSearch = jest.fn();
	const search_bar = mount(<SearchBar onSearch={mockSearch} />);

	it('Renders correctly', () => {
		expect(search_bar.exists()).toBe(true);
		//expect(rendered.toJSON()).toMatchSnapshot();
	});

	// it('Test search functionality', () => {
	// 	search_bar.find('input').simulate('change', { target: { value: 'egg' } });
	// 	expect(mockSearch).toHaveBeenCalledTimes(1);
	// });
});
