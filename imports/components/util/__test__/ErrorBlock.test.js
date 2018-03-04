import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import ErrorBlock, { data } from '../ErrorBlock';

describe('ErrorBlock', () => {
	const errorblock = shallow(<ErrorBlock />);
	const rendered = renderer.create(<ErrorBlock />);

	it('ErrorBlock should render', () => {
		expect(errorblock.exists()).toBe(true);
		expect(rendered.toJSON()).toMatchSnapshot();
	});

	it('ErrorBlock title', () => {
		const title = errorblock.find('h4').html();
		const expectTitle = 'Something went wrong';
		expect(title.includes(expectTitle)).toBe(true);
	});

	it('ErrorBlock Error Message', () => {
		const expected = errorblock.find('.error').html();
		const haveAll = data.reduce(
			(a, c) => a && expected.includes(c.err) && expected.includes(c.msg),
			true
		);
		expect(haveAll).toBe(true);
	});
});
