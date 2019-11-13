import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardComponent from './Card';
import BarChart from './BarChart';
import LoadingScreen from './LoadingScreen';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackTwoTone from '@material-ui/icons/ArrowBackTwoTone';
import ArrowForwardTwoTone from '@material-ui/icons/ArrowForwardTwoTone';
import Notify from './Notify';

class WeatherView extends Component {
   constructor(props) {
      super(props);
      this.temperatureChange = this.temperatureChange.bind(this);
      this.backwardClick = this.backwardClick.bind(this);
      this.forwardClick = this.forwardClick.bind(this);
      this.setBarChart = this.setBarChart.bind(this);
      this.materialClasses = makeStyles(theme => ({
         root: {
            flexGrow: 1,
         }
      }));
   }

   componentDidMount() {
      this.props.getWeatherData();
   }

   componentDidUpdate() {
      if (this.props.weatherData.length > 0 && !this.props.loading && this.props.curPageData.length === 0)
         this.props.getPageData(0);
   }

   forwardClick() {
      this.props.getPageData(this.props.curPageIndex + 1);
   }

   backwardClick() {
      this.props.getPageData(this.props.curPageIndex - 1);
   }

   setBarChart(cardData) {
      this.props.getActiveChartData(cardData);
   }

   temperatureChange(event) {
      this.props.getCurTempType(event.target.value);
   }

   render() {
      return (
         <div className="weather-view-container">
            {
               (this.props.curPageData.length > 0) ? (
                  <div className="weather-view">
                     <div className={this.materialClasses.root}>
                        <Grid container>
                           <Grid className="temp-type-container" item xs={12}>
                              <FormControl component="fieldset">
                                 <RadioGroup className="temp-radio-group" aria-label="Select Temperature Type" name="temperature-type" value={this.props.temperatureType} onChange={this.temperatureChange} row>
                                    <FormControlLabel
                                       value="celsius"
                                       control={<Radio color="primary" />}
                                       label="Celsius"
                                       labelPlacement="end"
                                       className="celsius"
                                    />
                                    <FormControlLabel
                                       value="fahrenheit"
                                       control={<Radio color="primary" />}
                                       label="Fahrenheit"
                                       labelPlacement="end"
                                       className="fahrenheit"
                                    />
                                 </RadioGroup>
                              </FormControl>
                           </Grid>
                           <Grid className="arrow-container left" item xs={6}>
                              {(this.props.curPageIndex > 0) ?
                                 (<IconButton color="primary" aria-label="Left Arrow" onClick={this.backwardClick}>
                                    <ArrowBackTwoTone fontSize="large" />
                                 </IconButton>) : null
                              }
                           </Grid>
                           <Grid className="arrow-container right" item xs={6}>
                              {(((this.props.curPageIndex * this.props.pageSize) + this.props.pageSize) < this.props.weatherData.length) ?
                                 (<IconButton color="primary" aria-label="Right Arrow" onClick={this.forwardClick}>
                                    <ArrowForwardTwoTone fontSize="large" />
                                 </IconButton>) : null
                              }
                           </Grid>
                           {
                              this.props.curPageData.map((obj, index) => <Grid className={(Object.keys(this.props.activeChartData).length > 0 && obj.date === this.props.activeChartData.date) ? 'card-active grid-card' : 'grid-card'} key={index} item xs={4}><CardComponent cardData={obj} onSelect={this.setBarChart} temperatureType={this.props.temperatureType} /></Grid>)
                           }
                           <Grid className="bar-chart-container" item xs={12}>
                              {
                                 (Object.keys(this.props.activeChartData).length > 0) ? <BarChart chartData={this.props.activeChartData} temperatureType={this.props.temperatureType} /> : <div className="bar-chart-notify">Please select a card to show temperature fragments in a Bar Chart.</div>
                              }

                           </Grid>
                        </Grid>
                     </div>
                  </div>) : (
                     (this.props.hasError) ?
                        <Notify classVal="alert-red" error={this.props.error} message="Something went wrong. Sorry, we can't show weather information at this time." /> :
                        (!this.props.loading && this.props.weatherData.length === 0) ? <Notify message="No weather forecasts avaialble." /> : <LoadingScreen />)
            }
         </div>);
   }
}

WeatherView.propTypes = {
   weatherData: PropTypes.arrayOf(PropTypes.shape({
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
   })),
   curPageData: PropTypes.arrayOf(PropTypes.shape({
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
   })),
   temperatureType: PropTypes.string.isRequired,
   curPageIndex: PropTypes.number.isRequired,
   loading: PropTypes.bool.isRequired,
   hasError: PropTypes.bool.isRequired,
   error: PropTypes.object,
   activeChartData: PropTypes.object,
   pageSize: PropTypes.number.isRequired,
   getPageData: PropTypes.func.isRequired,
   getActiveChartData: PropTypes.func.isRequired,
   getCurTempType: PropTypes.func.isRequired,
   getWeatherData: PropTypes.func.isRequired,
}

export default WeatherView;