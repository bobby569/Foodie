import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SearchBar from '../SearchBar';

const mockSearch = jest.fn();

describe('SearchBar', () => {
	const search_bar = shallow(<SearchBar onSearch={mockSearch} />);
	const rendered = renderer.create(<SearchBar onSearch={mockSearch} />);

	it('Renders correctly', () => {
		expect(search_bar.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});

	// it('Calls onSearch when click button', () => {
	// 	search_bar.find('button#test').simulate('click');
	// 	expect(mockSearch.mock.calls.length).toBe(1);
	// });
});
