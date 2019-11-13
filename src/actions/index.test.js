import * as actions from './index';

describe('Unit testing actions', () => {
    it('should create an action to get all weather data', () => {
        const expectedAction = {
            type: 'GET_WEATHER_DATA'
        }
        expect(actions.getWeatherData()).toEqual(expectedAction);
    });
    it('should create an action to get the page data', () => {
        const pageIndex = 0;
        const expectedAction = {
            type: 'GET_PAGE_DATA',
            pageIndex
        }
        expect(actions.getPageData(pageIndex)).toEqual(expectedAction);
    });
    it('should create an action to get the active chart data', () => {
        const chartData = {
            chartDataC: [["C", "Temp"],
            ["8C", 8],
            ["6C", 6],
            ["4C", 4],
            ["2C", 2]],
            chartDataF: [["F", "Temp"],
            ["46F", 46],
            ["42F", 42],
            ["38F", 38],
            ["35F", 35]],
            date: "2019-11-12",
            displayDate: "12 Nov 19",
            humidity: 83,
            tempC: "5C",
            tempF: "40F",
            weather: "overcast clouds"
        }
        const expectedAction = {
            type: 'GET_ACTIVE_CHART_DATA',
            chartData
        }
        expect(actions.getActiveChartData(chartData)).toEqual(expectedAction);
    });
    it('should create an action to get current temperature type', () => {
        const temperatureType = 'fahrenheit';
        const expectedAction = {
            type: 'GET_TEMP_TYPE',
            temperatureType
        }
        expect(actions.getCurTempType(temperatureType)).toEqual(expectedAction);
    });
})