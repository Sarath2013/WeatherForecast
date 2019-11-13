import reducer from './index';

describe('Unit testing reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            weatherData: [],
            curPageData: [],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: false,
            hasError: false,
            error: {},
            activeChartData: {},
            pageSize: 3
        })
    });
    it('should return weather request', () => {
        expect(reducer({
            weatherData: [],
            curPageData: [],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: false,
            hasError: false,
            error: {},
            activeChartData: {},
            pageSize: 3
        }, {
            type: 'GET_WEATHER_DATA'
        })).toEqual({
            weatherData: [],
            curPageData: [],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: true,
            hasError: false,
            error: {},
            activeChartData: {},
            pageSize: 3
        })
    });
    it('should return all weather data', () => {
        expect(reducer({
            weatherData: [],
            curPageData: [],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: true,
            hasError: false,
            error: {},
            activeChartData: {},
            pageSize: 3
        }, {
            type: 'WEATHER_DATA_RECEIVED',
            data: [{ temp: 22 }, { temp: 33 }, { temp: 44 }]
        })).toEqual({
            weatherData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }],
            curPageData: [],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: false,
            hasError: false,
            error: {},
            activeChartData: {},
            pageSize: 3
        })
    });
    it('should return all weather data', () => {
        expect(reducer({
            weatherData: [],
            curPageData: [],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: true,
            hasError: false,
            error: {},
            activeChartData: {},
            pageSize: 3
        }, {
            type: 'WEATHER_DATA_FAILED',
            error: new Error()
        })).toEqual({
            weatherData: [],
            curPageData: [],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: false,
            hasError: true,
            error: new Error(),
            activeChartData: {},
            pageSize: 3
        })
    });
    it('should return current page data', () => {
        expect(reducer({
            weatherData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }, { temp: 55 }],
            curPageData: [],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: false,
            hasError: false,
            error: {},
            activeChartData: {},
            pageSize: 3
        }, {
            type: 'GET_PAGE_DATA',
            pageIndex: 0
        })).toEqual({
            weatherData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }, { temp: 55 }],
            curPageData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: false,
            hasError: false,
            error: {},
            activeChartData: {},
            pageSize: 3
        })
    });
    it('should return current temperature type', () => {
        expect(reducer({
            weatherData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }, { temp: 55 }],
            curPageData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: false,
            hasError: false,
            error: {},
            activeChartData: {},
            pageSize: 3
        }, {
            type: 'GET_TEMP_TYPE',
            temperatureType: 'celsius'
        })).toEqual({
            weatherData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }, { temp: 55 }],
            curPageData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }],
            temperatureType: 'celsius',
            curPageIndex: 0,
            loading: false,
            hasError: false,
            error: {},
            activeChartData: {},
            pageSize: 3
        })
    });
    it('should return active chart data', () => {
        expect(reducer({
            weatherData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }, { temp: 55 }],
            curPageData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: false,
            hasError: false,
            error: {},
            activeChartData: {},
            pageSize: 3
        }, {
            type: 'GET_ACTIVE_CHART_DATA',
            chartData: { temp: 33 }
        })).toEqual({
            weatherData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }, { temp: 55 }],
            curPageData: [{ temp: 22 }, { temp: 33 }, { temp: 44 }],
            temperatureType: 'fahrenheit',
            curPageIndex: 0,
            loading: false,
            hasError: false,
            error: {},
            activeChartData: { temp: 33 },
            pageSize: 3
        })
    });
})