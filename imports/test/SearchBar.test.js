import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import SearchBar from '../components/search/SearchBar';

const onSearch = jest.fn();

describe('SearchBar', () => {
	const search_bar = shallow(<SearchBar onSearch={onSearch} />);
	const rendered = renderer.create(<SearchBar onSearch={onSearch} />);

	it('Renders correctly', () => {
		expect(search_bar.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
