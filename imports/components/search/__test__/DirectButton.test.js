import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import DirectButton from '../DirectButton';

const renderPage = jest.fn();

describe('DirectButton', () => {
	const direct_button = shallow(
		<DirectButton name="lib" renderPage={renderPage} />
	);
	const rendered_lib = renderer.create(
		<DirectButton name="lib" renderPage={renderPage} />
	);
	const rendered_diy = renderer.create(
		<DirectButton name="diy" renderPage={renderPage} />
	);

	const mockEvent = { target: {} };

	it('Renders correctly', () => {
		expect(direct_button.exists()).toBe(true);
		expect(rendered_lib.toJSON()).toMatchSnapshot();
		expect(rendered_diy.toJSON()).toMatchSnapshot();
	});

	it('Click on tab', () => {
		const diy = direct_button.find('.diy');
		diy.simulate('click', mockEvent);
	});
});
