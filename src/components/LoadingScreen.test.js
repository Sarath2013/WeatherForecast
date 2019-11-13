import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import LoadingScreen from './LoadingScreen';

let wrapper;

describe("Unit Testing - Rendering Loading Screen", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null
    });

    test('renders snapshot', () => {
        wrapper = shallow(<LoadingScreen />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('ensure loading screen content', () => {
        expect(wrapper.find('.loader-text').text()).toEqual('Loading ...');
        expect(wrapper.props().className).toEqual('loader-content center-content');
    });
});