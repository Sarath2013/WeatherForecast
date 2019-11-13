import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import WeatherView from './WeatherView';

let wrapper;
describe("Unit Testing - Rendering Weather view with Fahrenheit", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null
    });

    test('renders snapshot', () => {
        wrapper = shallow(<WeatherView {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('ensure Weather view details with Fahrenheit', () => {
        expect(wrapper.instance().props.getWeatherData.mock.calls.length).toBe(1);
        expect(wrapper.find('.grid-card').length).toBe(2);
        expect(wrapper.find('.bar-chart-notify').length).toBe(1);
        expect(wrapper.find('.bar-chart-notify').props().children).toBe('Please select a card to show temperature fragments in a Bar Chart.');
        expect(wrapper.find("[name='temperature-type']").props().value).toBe('fahrenheit');
        expect(wrapper.find('.grid-card').get(0).props.children.props.cardData).toEqual(weatherData[0]);
        expect(wrapper.find('.grid-card').get(1).props.children.props.cardData).toEqual(weatherData[1]);
        expect(wrapper.instance().props.curPageData.length).toBe(2);
        expect(wrapper.instance().props.weatherData.length).toBe(2);
        expect(wrapper.instance().props.curPageData).toEqual(weatherData);
        expect(wrapper.instance().props.temperatureType).toBe('fahrenheit');
        expect(wrapper.instance().props.loading).toBe(false);
    });
});

describe("Unit Testing - Rendering Weather view with Celsius", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null
    });

    test('renders snapshot', () => {
        wrapper = shallow(<WeatherView {...props} temperatureType="celsius" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('ensure Weather view details with Celsius', () => {
        expect(wrapper.instance().props.getWeatherData.mock.calls.length).toBe(2);
        expect(wrapper.find('.grid-card').length).toBe(2);
        expect(wrapper.find('.bar-chart-notify').length).toBe(1);
        expect(wrapper.find('.bar-chart-notify').props().children).toBe('Please select a card to show temperature fragments in a Bar Chart.');
        expect(wrapper.find("[name='temperature-type']").props().value).toBe('celsius');
        expect(wrapper.find('.grid-card').get(0).props.children.props.cardData).toEqual(weatherData[0]);
        expect(wrapper.find('.grid-card').get(1).props.children.props.cardData).toEqual(weatherData[1]);
        expect(wrapper.instance().props.curPageData.length).toBe(2);
        expect(wrapper.instance().props.weatherData.length).toBe(2);
        expect(wrapper.instance().props.curPageData).toEqual(weatherData);
        expect(wrapper.instance().props.temperatureType).toBe('celsius');
        expect(wrapper.instance().props.loading).toBe(false);
    });
});

describe("Unit Testing - Rendering Weather view with Barchart", () => {
    beforeAll(() => {
    });

    afterAll(() => {
        wrapper = null
    });

    test('renders snapshot', () => {
        wrapper = shallow(<WeatherView {...props} activeChartData={weatherData[1]} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test('ensure Weather view details with Barchart', () => {
        expect(wrapper.instance().props.getWeatherData.mock.calls.length).toBe(3);
        expect(wrapper.find('.grid-card').length).toBe(2);
        expect(wrapper.find('.bar-chart-container').props().children.props.chartData).toEqual(weatherData[1]);
        expect(wrapper.instance().props.activeChartData).toEqual(weatherData[1]);
        expect(wrapper.find('.bar-chart-notify').length).toBe(0);
        expect(wrapper.find("[name='temperature-type']").props().value).toBe('fahrenheit');
        expect(wrapper.find('.grid-card').get(0).props.children.props.cardData).toEqual(weatherData[0]);
        expect(wrapper.find('.grid-card').get(1).props.children.props.cardData).toEqual(weatherData[1]);
        expect(wrapper.instance().props.curPageData.length).toBe(2);
        expect(wrapper.instance().props.weatherData.length).toBe(2);
        expect(wrapper.instance().props.curPageData).toEqual(weatherData);
        expect(wrapper.instance().props.temperatureType).toBe('fahrenheit');
        expect(wrapper.instance().props.loading).toBe(false);
    });
});

const weatherData = [{
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
},
{
    chartDataC: [["C", "Temp"],
    ["2C", 2],
    ["5C", 5],
    ["3C", 3]],
    chartDataF: [["F", "Temp"],
    ["38F", 38],
    ["32F", 32],
    ["34F", 34]],
    date: "2019-11-13",
    displayDate: "13 Nov 19",
    humidity: 89,
    tempC: "4C",
    tempF: "38F",
    weather: "light snow",
    weatherArr: [{
        count: 2,
        weather: "light snow"
    }, {
        count: 1,
        weather: "overcast clouds"
    }],
    fragmentsC: [1.6100000000000136, 4.25, 2.3900000000000432],
    fragmentsF: [39.498000000000026, 31.05, 33.702000000000076]
}];

let props = {
    weatherData: weatherData,
    curPageData: weatherData,
    temperatureType: "fahrenheit",
    curPageIndex: 0,
    loading: false,
    hasError: false,
    error: {},
    activeChartData: {},
    pageSize: 3,
    getPageData: jest.fn(),
    getActiveChartData: jest.fn(),
    getCurTempType: jest.fn(),
    getWeatherData: jest.fn(),
}
