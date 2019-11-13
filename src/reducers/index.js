const reducer = (state = { weatherData: [], curPageData: [], temperatureType: 'fahrenheit', curPageIndex: 0, loading: false, hasError: false, error: {}, activeChartData: {}, pageSize: 3 }, action) => {
    switch (action.type) {
        case 'GET_WEATHER_DATA':
            return { ...state, loading: true };
        case 'WEATHER_DATA_RECEIVED':
            return { ...state, weatherData: [...action.data], loading: false };
        case 'WEATHER_DATA_FAILED':
            return { ...state, hasError: true, error: action.error, loading: false };
        case 'GET_PAGE_DATA':
            const startIndex = action.pageIndex * state.pageSize;
            return { ...state, curPageIndex: action.pageIndex, curPageData: [...state.weatherData.slice(startIndex, startIndex + state.pageSize)], activeChartData: {} };
        case 'GET_TEMP_TYPE':
            return { ...state, temperatureType: action.temperatureType };
        case 'GET_ACTIVE_CHART_DATA':
            return { ...state, activeChartData: action.chartData };
        default:
            return state;
    }
};
export default reducer;