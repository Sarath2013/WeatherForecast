export const getWeatherData = () => ({
    type: 'GET_WEATHER_DATA'
});

export const getPageData = (index) => ({
    type: 'GET_PAGE_DATA',
    pageIndex: index
});

export const getActiveChartData = (data) => ({
    type: 'GET_ACTIVE_CHART_DATA',
    chartData: data
});

export const getCurTempType = (data) => ({
    type: 'GET_TEMP_TYPE',
    temperatureType: data
});