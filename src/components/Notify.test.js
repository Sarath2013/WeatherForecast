import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Notify from './Notify';

let wrapper;

describe("Unit Testing - Rendering Notify with No weather forecasts", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null
    });

    test('renders snapshot', () => {
        wrapper = shallow(<Notify message="No weather forecasts avaialble." />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('ensure notify detials', () => {
        expect(wrapper.find('h1').text()).toEqual('No weather forecasts avaialble.');
    });
});

describe("Unit Testing - Rendering Notify with Error", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null
    });

    test('renders snapshot', () => {
        wrapper = shallow(<Notify classVal="alert-red" message="Something went wrong. Sorry, we can't show weather information at this time." />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('ensure notify details', () => {
        expect(wrapper.find('h1').text()).toEqual("Something went wrong. Sorry, we can't show weather information at this time.");
        expect(wrapper.find('h1').props().className).toEqual("alert-red");
    });
});