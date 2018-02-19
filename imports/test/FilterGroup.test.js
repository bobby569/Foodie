import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import FilterGroup from '../components/search/FilterGroup';

const onDietChange = jest.fn();
const onHealthChange = jest.fn();

describe('FilterGroup', () => {
	const filter_group = shallow(
		<FilterGroup onDietChange={onDietChange} onHealthChange={onHealthChange} />
	);
	const rendered = renderer.create(
		<FilterGroup onDietChange={onDietChange} onHealthChange={onHealthChange} />
	);

	it('Renders correctly', () => {
		expect(filter_group.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});
});
