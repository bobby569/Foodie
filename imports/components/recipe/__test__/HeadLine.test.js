import React from 'react';
import { shallow } from 'enzyme';
import HeadLine from '../HeadLine';

describe('HeadLine', () => {
	const data = {
		data: {
			label: '',
			image: '',
			source: '',
			healthLabels: ['Alcohol free'],
			dietLabels: ['Fat free'],
			calories: 0
		},
		id: '',
		views: 0,
		likes: []
	};
	const headline = shallow(<HeadLine {...data} />);

	it('Renders correctly', () => {
		expect(headline.exists()).toBe(true);
	});
});
