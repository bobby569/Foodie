import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import RecipeStatus from '../RecipeStatus';

jest.mock('meteor/meteor');

describe('RecipeStatus', () => {
	const data = {
		id: '',
		views: 0,
		likes: []
	};
	const status = shallow(<RecipeStatus {...data} />);
	const rendered = renderer.create(<RecipeStatus {...data} />);

	it('Renders correctly', () => {
		expect(status.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});

	it('Click like', () => {
		const like = status.find('.like');
		like.simulate('click');
		//like.simulate('click');
	});

	it('Click save', () => {
		const save = status.find('.save');
		save.simulate('click');
	});
});
