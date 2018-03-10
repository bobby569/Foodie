import React from 'react';
import { mount, shallow } from 'enzyme';
import Home from '../Home';

describe('Home', () => {
    const home = shallow(<Home />);

    it('Home should render', () => {
        expect(home.exists()).toBe(true);
    });
});