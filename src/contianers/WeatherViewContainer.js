import { connect } from 'react-redux';
import WeatherView from '../components/WeatherView';
import { getWeatherData, getPageData, getActiveChartData, getCurTempType} from '../actions';

const mapStateToProps = state => ({
    weatherData: state.weatherData,
    curPageData: state.curPageData,
    temperatureType: state.temperatureType,
    curPageIndex: state.curPageIndex,
    loading: state.loading,
    hasError: state.hasError,
    error: state.error,
    activeChartData: state.activeChartData,
    pageSize: state.pageSize
});

//const mapStateToProps = state => state;

const mapDispatchToProps = {
    getPageData: index => getPageData(index),
    getActiveChartData: data => getActiveChartData(data),
    getCurTempType: data => getCurTempType(data),
    getWeatherData: getWeatherData,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeatherView)
