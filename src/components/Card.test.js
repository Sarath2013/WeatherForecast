import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Card from './Card';

let wrapper, cardData;

cardData = {
    date: "2019-11-12",
    displayDate: "12 Nov 19",
    humidity: 83,
    tempC: "5C",
    tempF: "40F",
    weather: "overcast clouds"
}

describe("Unit Testing - Rendering Card with Fahrenheit", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null
    });

    test('renders snapshot', () => {
        wrapper = shallow(<Card cardData={cardData} temperatureType="fahrenheit" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('ensure card details with Fahrenheit', () => {
        expect(wrapper.find('.card-name').get(0).props.children).toEqual('Temp:');
        expect(wrapper.find('.card-name').get(1).props.children).toEqual('Date:');
        expect(wrapper.find('.card-name').get(2).props.children).toEqual('Humidity:');
        expect(wrapper.find('.card-name').get(3).props.children).toEqual('Weather:');
        expect(wrapper.find('.card-value').get(0).props.children).toEqual('40F');
        expect(wrapper.find('.card-value').get(1).props.children).toEqual('12 Nov 19');
        expect(wrapper.find('.card-value').get(2).props.children).toEqual(83);
        expect(wrapper.find('.card-value').get(3).props.children).toEqual('overcast clouds');
        
    });
});

describe("Unit Testing - Rendering Card with Celsius", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null
    });

    test('renders snapshot', () => {
        wrapper = shallow(<Card cardData={cardData} temperatureType="celsius" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('ensure card details with Celsius', () => {
        expect(wrapper.find('.card-name').get(0).props.children).toEqual('Temp:');
        expect(wrapper.find('.card-name').get(1).props.children).toEqual('Date:');
        expect(wrapper.find('.card-name').get(2).props.children).toEqual('Humidity:');
        expect(wrapper.find('.card-name').get(3).props.children).toEqual('Weather:');
        expect(wrapper.find('.card-value').get(0).props.children).toEqual('5C');
        expect(wrapper.find('.card-value').get(1).props.children).toEqual('12 Nov 19');
        expect(wrapper.find('.card-value').get(2).props.children).toEqual(83);
        expect(wrapper.find('.card-value').get(3).props.children).toEqual('overcast clouds');
        
    });
});