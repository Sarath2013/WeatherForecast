import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchWeatherData() {
    try {
        const res = yield call(axios.get, 'https://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40');
        if (res.data.cod === '200')
            yield put({ type: "WEATHER_DATA_RECEIVED", data: formatWeatherData(res.data) });
        else
            yield put({ type: 'WEATHER_DATA_FAILED', error: res });
    }
    catch (error) {
        yield put({ type: 'WEATHER_DATA_FAILED', error });
    }
}

function formatWeatherData(res) {
    let weatherData = [], months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    for (let i = 0; i < res.list.length; i++) {
        let date = res.list[i].dt_txt.split(' ')[0], index, tempF, tempC;
        tempF = (res.list[i].main.temp - 273.15) * (9 / 5) + 32; // Kelvin to Fahrenheit
        tempC = res.list[i].main.temp - 273.15; // Kelvin to Celsius
        index = weatherData.findIndex((obj) => date === obj.date);
        if (index > -1) {
            weatherData[index].humidity.push(res.list[i].main.humidity);
            weatherData[index].fragmentsF.push(tempF);
            weatherData[index].fragmentsC.push(tempC);
            if (res.list[i].weather.length > 0) {
                let wIndex = weatherData[index].weatherArr.findIndex((obj) => res.list[i].weather[0].description === obj.weather);
                if (wIndex > -1)
                    weatherData[index].weatherArr[wIndex].count += 1;
                else
                    weatherData[index].weatherArr.push({ weather: res.list[i].weather[0].description, count: 1 });
            }
        } else {
            let obj = { date: date, humidity: [res.list[i].main.humidity], weatherArr: [], fragmentsF: [tempF], fragmentsC: [tempC] };
            if (res.list[i].weather.length > 0)
                obj.weatherArr = [{ weather: res.list[i].weather[0].description, count: 1 }]
            weatherData.push(obj);
        }
    }
    for (let index = 0; index < weatherData.length; index++) {
        weatherData[index].tempF = Math.ceil(weatherData[index].fragmentsF.reduce((prev, cur) => prev + cur, 0) / weatherData[index].fragmentsF.length) + "F";
        weatherData[index].tempC = Math.ceil(weatherData[index].fragmentsC.reduce((prev, cur) => prev + cur, 0) / weatherData[index].fragmentsC.length) + "C";
        weatherData[index].humidity = Math.ceil(weatherData[index].humidity.reduce((prev, cur) => prev + cur, 0) / weatherData[index].humidity.length);
        if (weatherData[index].weatherArr.length > 0)
            weatherData[index].weather = weatherData[index].weatherArr.sort((a, b) => b.count - a.count)[0].weather;
        weatherData[index].displayDate = weatherData[index].date.split('-')[2] + " " + months[Number(weatherData[index].date.split('-')[1] - 1)] + " " + weatherData[index].date.split('-')[0].slice(2, 4);
        weatherData[index].chartDataC = [];
        weatherData[index].chartDataF = [];
        weatherData[index].chartDataC.push(['C', 'Temp']);
        weatherData[index].chartDataF.push(['F', 'Temp']);
        for (let j = 0; j < weatherData[index].fragmentsF.length; j++) {
            weatherData[index].chartDataF.push([Math.ceil(weatherData[index].fragmentsF[j]) + 'F', Math.ceil(weatherData[index].fragmentsF[j])]);
            weatherData[index].chartDataC.push([Math.ceil(weatherData[index].fragmentsC[j]) + 'C', Math.ceil(weatherData[index].fragmentsC[j])]);
        }
    }
    return weatherData;
}

function* fetchWeatherWatch() {
    yield takeLatest('GET_WEATHER_DATA', fetchWeatherData);
}

export default function* rootSaga() {
    yield fetchWeatherWatch();
}