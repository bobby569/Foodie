import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../SearchBar';

const mockSearch = jest.fn();

describe('SearchBar', () => {
	const search_bar = shallow(<SearchBar onSearch={mockSearch} />);

	it('Renders correctly', () => {
		expect(search_bar.exists()).toBe(true);
	});

	// it('Test search functionality', () => {
	// 	search_bar.find('input').simulate('change', { target: { value: 'egg' } });
	// 	expect(mockSearch).toHaveBeenCalledTimes(1);
	// });

	it('onSearch', () => {
		expect(search_bar.instance().onSearch(null)).toBe(undefined);
		expect(search_bar.instance().onSearch('  ')).toBe(undefined);
		search_bar.instance().onSearch('apple');
		expect(mockSearch.mock.calls.length).toBe(1);
	});
});
