import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from "react-google-charts";

const BarChart = (props) => {
  return (
    <Chart
      height={'240px'}
      chartType="Bar"
      loader={<div className="chart-loader">Loading Chart ...</div>}
      data={(props.temperatureType === 'celsius') ? props.chartData.chartDataC : props.chartData.chartDataF}
      options={{
        legend: { position: 'none' },
      }}
      rootProps={{ 'data-testid': '2' }}
    />
  );
}

BarChart.propTypes = {
  chartData: PropTypes.shape({
    chartDataC: PropTypes.array.isRequired,
    chartDataF: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
    displayDate: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    tempC: PropTypes.string.isRequired,
    tempF: PropTypes.string.isRequired,
    weather: PropTypes.string.isRequired,
    weatherArr: PropTypes.array.isRequired,
    fragmentsC: PropTypes.array.isRequired,
    fragmentsF: PropTypes.array.isRequired,
  }).isRequired,
  temperatureType: PropTypes.string.isRequired,
}

export default BarChart;