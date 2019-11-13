import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import BarChart from './BarChart';

let wrapper, chartData;

describe("Unit Testing - Rendering BarChart with Fahrenheit", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null
    });

    test('renders snapshot', () => {
        wrapper = shallow(<BarChart chartData={chartData} temperatureType="fahrenheit" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('ensure BarChart details with Fahrenheit', () => {
        expect(wrapper.props().chartType).toEqual('Bar');
        expect(wrapper.props().data).toEqual(chartData.chartDataF);
    });
});

describe("Unit Testing - Rendering BarChart with Celsius", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null
    });

    test('renders snapshot', () => {
        wrapper = shallow(<BarChart chartData={chartData} temperatureType="celsius" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('ensure BarChart details with Celsius', () => {
        expect(wrapper.props().chartType).toEqual('Bar');
        expect(wrapper.props().data).toEqual(chartData.chartDataC);
    });
});

chartData = {
    chartDataC: [["C", "Temp"],
    ["4C", 4],
    ["3C", 3],
    ["1C", 1]],
    chartDataF: [["F", "Temp"],
    ["39F", 39],
    ["37F", 37],
    ["33F", 33]],
    date: "2019-11-12",
    displayDate: "12 Nov 19",
    humidity: 87,
    tempC: "3C",
    tempF: "36F",
    weather: "overcast clouds",
    weatherArr: [{
        count: 2,
        weather: "overcast clouds"
    }, {
        count: 1,
        weather: "light snow"
    }],
    fragmentsC: [3.6100000000000136, 2.25, 0.3900000000000432],
    fragmentsF: [38.498000000000026, 36.05, 32.702000000000076]
}