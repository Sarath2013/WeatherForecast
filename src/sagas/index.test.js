import { fetchWeatherData } from './index';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

describe('Unit testing Sagas', () => {
    it('fetch weatherdata saga success', () => {
        const gen = fetchWeatherData();
        expect(gen.next().value).toEqual(call(axios.get, 'http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40'));
        expect(gen.next({data: { cod: '200', list: []}}).value).toEqual(put({type: 'WEATHER_DATA_RECEIVED', data: []}));
    });
    it('fetch weatherdata saga failure', () => {
        const gen = fetchWeatherData();
        expect(gen.next().value).toEqual(call(axios.get, 'http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40'));
        expect(gen.next({data: { cod: '100', list: []}}).value).toEqual(put({type: 'WEATHER_DATA_FAILED', error: {data: { cod: '100', list: []}}}));
    });
});