import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';
import axios from "axios";

jest.mock('axios');

let wrapper;

axios.get.mockImplementation(() => {
  return Promise.resolve({
    data: weatherResults
  });
});

describe("Unit Testing - Rendering App Component", () => {
  beforeAll(() => {
  });

  afterAll(() => {
    wrapper = null
  });

  test('renders snapshot', () => {
    wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("Integration Testing - Weather Forecast", () => {
  beforeAll(() => {
  });

  afterAll(() => {
    wrapper = null
  });

  test('renders integrated snapshot', async () => {
    wrapper = await mount(<App />);
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('checks initial state with fahrenheit', async () => {
    expect(wrapper.find('fieldset').children().props().value).toBe('fahrenheit');
    expect(wrapper.children().props().store.getState().temperatureType).toBe('fahrenheit');
    expect(wrapper.children().props().store.getState().loading).toBe(false);
    expect(wrapper.children().props().store.getState().hasError).toBe(false);
    expect(wrapper.children().props().store.getState().pageSize).toBe(3);
    expect(wrapper.children().props().store.getState().curPageIndex).toBe(0);
    expect(wrapper.children().props().store.getState().curPageData.length).toBe(3);
    expect(wrapper.children().props().store.getState().curPageData[0].tempF).toBe('44F');
    expect(wrapper.children().props().store.getState().curPageData[0].displayDate).toBe('08 Nov 19');
    expect(wrapper.children().props().store.getState().curPageData[1].tempF).toBe('37F');
    expect(wrapper.children().props().store.getState().curPageData[1].displayDate).toBe('09 Nov 19');
    expect(wrapper.children().props().store.getState().curPageData[2].tempF).toBe('35F');
    expect(wrapper.children().props().store.getState().curPageData[2].displayDate).toBe('10 Nov 19');
    expect(wrapper.children().props().store.getState().weatherData.length).toBe(6);
    expect(wrapper.children().props().store.getState().activeChartData).toEqual({});
    expect(wrapper.find('.bar-chart-notify').length).toBe(1);
    expect(wrapper.find('.bar-chart-notify').props().children).toBe('Please select a card to show temperature fragments in a Bar Chart.');
  });

  test('change radio button to celcius and ensure info', async () => {
    await wrapper.find('fieldset').children().props().onChange({ target: { value: 'celsius' } })
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('fieldset').children().props().value).toBe('celsius');
    expect(wrapper.children().props().store.getState().temperatureType).toBe('celsius');
    expect(wrapper.children().props().store.getState().loading).toBe(false);
    expect(wrapper.children().props().store.getState().hasError).toBe(false);
    expect(wrapper.children().props().store.getState().pageSize).toBe(3);
    expect(wrapper.children().props().store.getState().curPageIndex).toBe(0);
    expect(wrapper.children().props().store.getState().curPageData.length).toBe(3);
    expect(wrapper.children().props().store.getState().curPageData[0].tempC).toBe('7C');
    expect(wrapper.children().props().store.getState().curPageData[0].displayDate).toBe('08 Nov 19');
    expect(wrapper.children().props().store.getState().curPageData[1].tempC).toBe('3C');
    expect(wrapper.children().props().store.getState().curPageData[1].displayDate).toBe('09 Nov 19');
    expect(wrapper.children().props().store.getState().curPageData[2].tempC).toBe('2C');
    expect(wrapper.children().props().store.getState().curPageData[2].displayDate).toBe('10 Nov 19');
    expect(wrapper.children().props().store.getState().weatherData.length).toBe(6);
    expect(wrapper.children().props().store.getState().activeChartData).toEqual({});
    expect(wrapper.find('.bar-chart-notify').length).toBe(1);
    expect(wrapper.find('.bar-chart-notify').props().children).toBe('Please select a card to show temperature fragments in a Bar Chart.');
  });

  test('select card and ensure bar chart', async () => {
    await wrapper.find('.card-comp').at(0).simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find('.bar-chart-notify').length).toBe(0);
    expect(Object.keys(wrapper.children().props().store.getState().activeChartData).length > 0).toBe(true);
    expect(wrapper.children().props().store.getState().activeChartData.displayDate).toBe('08 Nov 19');
    expect(wrapper.children().props().store.getState().activeChartData.weather).toBe('light rain');
    expect(wrapper.children().props().store.getState().activeChartData.tempC).toBe('7C');
  });

  test('click right arrow scroll to next page and check info', async () => {
    await wrapper.find('.arrow-container').children().at(4).simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.children().props().store.getState().curPageIndex).toBe(1);
    expect(wrapper.find('fieldset').children().props().value).toBe('celsius');
    expect(wrapper.children().props().store.getState().temperatureType).toBe('celsius');
    expect(wrapper.children().props().store.getState().loading).toBe(false);
    expect(wrapper.children().props().store.getState().hasError).toBe(false);
    expect(wrapper.children().props().store.getState().pageSize).toBe(3);
    expect(wrapper.children().props().store.getState().activeChartData).toEqual({});
    expect(wrapper.find('.bar-chart-notify').length).toBe(1);
    expect(wrapper.find('.bar-chart-notify').props().children).toBe('Please select a card to show temperature fragments in a Bar Chart.');
    expect(wrapper.children().props().store.getState().curPageData.length).toBe(3);
    expect(wrapper.children().props().store.getState().curPageData[0].tempC).toBe('2C');
    expect(wrapper.children().props().store.getState().curPageData[0].displayDate).toBe('11 Nov 19');
    expect(wrapper.children().props().store.getState().curPageData[1].tempC).toBe('2C');
    expect(wrapper.children().props().store.getState().curPageData[1].displayDate).toBe('12 Nov 19');
    expect(wrapper.children().props().store.getState().curPageData[2].tempC).toBe('0C');
    expect(wrapper.children().props().store.getState().curPageData[2].displayDate).toBe('13 Nov 19');
    expect(wrapper.children().props().store.getState().weatherData.length).toBe(6);
  });
});


let weatherResults = {
  "cod": "200",
  "message": 0,
  "cnt": 40,
  "list": [
    {
      "dt": 1573203600,
      "main": {
        "temp": 279.77,
        "temp_min": 278.78,
        "temp_max": 279.77,
        "pressure": 1003,
        "sea_level": 1003,
        "grnd_level": 930,
        "humidity": 88,
        "temp_kf": 0.99
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 0.72,
        "deg": 0
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-08 09:00:00"
    },
    {
      "dt": 1573214400,
      "main": {
        "temp": 281.15,
        "temp_min": 280.41,
        "temp_max": 281.15,
        "pressure": 1003,
        "sea_level": 1003,
        "grnd_level": 931,
        "humidity": 79,
        "temp_kf": 0.74
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 1.48,
        "deg": 297
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-08 12:00:00"
    },
    {
      "dt": 1573225200,
      "main": {
        "temp": 279.9,
        "temp_min": 279.4,
        "temp_max": 279.9,
        "pressure": 1002,
        "sea_level": 1002,
        "grnd_level": 930,
        "humidity": 86,
        "temp_kf": 0.5
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 1.8,
        "deg": 322
      },
      "rain": {
        "3h": 0.06
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-08 15:00:00"
    },
    {
      "dt": 1573236000,
      "main": {
        "temp": 278.65,
        "temp_min": 278.4,
        "temp_max": 278.65,
        "pressure": 1005,
        "sea_level": 1005,
        "grnd_level": 933,
        "humidity": 94,
        "temp_kf": 0.25
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 2.79,
        "deg": 267
      },
      "rain": {
        "3h": 1.06
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-08 18:00:00"
    },
    {
      "dt": 1573246800,
      "main": {
        "temp": 277.18,
        "temp_min": 277.18,
        "temp_max": 277.18,
        "pressure": 1007,
        "sea_level": 1007,
        "grnd_level": 934,
        "humidity": 93,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 3.99,
        "deg": 239
      },
      "rain": {
        "3h": 0.44
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-08 21:00:00"
    },
    {
      "dt": 1573257600,
      "main": {
        "temp": 276.82,
        "temp_min": 276.82,
        "temp_max": 276.82,
        "pressure": 1007,
        "sea_level": 1007,
        "grnd_level": 935,
        "humidity": 95,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 3.63,
        "deg": 249
      },
      "rain": {
        "3h": 0.25
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-09 00:00:00"
    },
    {
      "dt": 1573268400,
      "main": {
        "temp": 276.58,
        "temp_min": 276.58,
        "temp_max": 276.58,
        "pressure": 1008,
        "sea_level": 1008,
        "grnd_level": 935,
        "humidity": 97,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 3.71,
        "deg": 256
      },
      "rain": {
        "3h": 1
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-09 03:00:00"
    },
    {
      "dt": 1573279200,
      "main": {
        "temp": 276.02,
        "temp_min": 276.02,
        "temp_max": 276.02,
        "pressure": 1009,
        "sea_level": 1009,
        "grnd_level": 937,
        "humidity": 97,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 3.91,
        "deg": 258
      },
      "rain": {
        "3h": 2.19
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-09 06:00:00"
    },
    {
      "dt": 1573290000,
      "main": {
        "temp": 276.41,
        "temp_min": 276.41,
        "temp_max": 276.41,
        "pressure": 1011,
        "sea_level": 1011,
        "grnd_level": 938,
        "humidity": 93,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 3.54,
        "deg": 256
      },
      "rain": {
        "3h": 1.31
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-09 09:00:00"
    },
    {
      "dt": 1573300800,
      "main": {
        "temp": 276.9,
        "temp_min": 276.9,
        "temp_max": 276.9,
        "pressure": 1011,
        "sea_level": 1011,
        "grnd_level": 939,
        "humidity": 92,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 2.91,
        "deg": 267
      },
      "rain": {
        "3h": 0.19
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-09 12:00:00"
    },
    {
      "dt": 1573311600,
      "main": {
        "temp": 276.95,
        "temp_min": 276.95,
        "temp_max": 276.95,
        "pressure": 1011,
        "sea_level": 1011,
        "grnd_level": 938,
        "humidity": 90,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 1.52,
        "deg": 221
      },
      "rain": {
        "3h": 0.06
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-09 15:00:00"
    },
    {
      "dt": 1573322400,
      "main": {
        "temp": 273.93,
        "temp_min": 273.93,
        "temp_max": 273.93,
        "pressure": 1013,
        "sea_level": 1013,
        "grnd_level": 939,
        "humidity": 94,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 56
      },
      "wind": {
        "speed": 1.28,
        "deg": 197
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-09 18:00:00"
    },
    {
      "dt": 1573333200,
      "main": {
        "temp": 273.01,
        "temp_min": 273.01,
        "temp_max": 273.01,
        "pressure": 1013,
        "sea_level": 1013,
        "grnd_level": 938,
        "humidity": 92,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 1.13,
        "deg": 127
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-09 21:00:00"
    },
    {
      "dt": 1573344000,
      "main": {
        "temp": 272.43,
        "temp_min": 272.43,
        "temp_max": 272.43,
        "pressure": 1012,
        "sea_level": 1012,
        "grnd_level": 936,
        "humidity": 94,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 1.44,
        "deg": 117
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-10 00:00:00"
    },
    {
      "dt": 1573354800,
      "main": {
        "temp": 271.82,
        "temp_min": 271.82,
        "temp_max": 271.82,
        "pressure": 1011,
        "sea_level": 1011,
        "grnd_level": 936,
        "humidity": 94,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 1.13,
        "deg": 99
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-10 03:00:00"
    },
    {
      "dt": 1573365600,
      "main": {
        "temp": 271.33,
        "temp_min": 271.33,
        "temp_max": 271.33,
        "pressure": 1011,
        "sea_level": 1011,
        "grnd_level": 936,
        "humidity": 93,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 1.06,
        "deg": 105
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-10 06:00:00"
    },
    {
      "dt": 1573376400,
      "main": {
        "temp": 275.98,
        "temp_min": 275.98,
        "temp_max": 275.98,
        "pressure": 1011,
        "sea_level": 1011,
        "grnd_level": 937,
        "humidity": 77,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 1.71,
        "deg": 85
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-10 09:00:00"
    },
    {
      "dt": 1573387200,
      "main": {
        "temp": 278.77,
        "temp_min": 278.77,
        "temp_max": 278.77,
        "pressure": 1010,
        "sea_level": 1010,
        "grnd_level": 937,
        "humidity": 69,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 2.54,
        "deg": 71
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-10 12:00:00"
    },
    {
      "dt": 1573398000,
      "main": {
        "temp": 277.37,
        "temp_min": 277.37,
        "temp_max": 277.37,
        "pressure": 1012,
        "sea_level": 1012,
        "grnd_level": 938,
        "humidity": 82,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 2.22,
        "deg": 68
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-10 15:00:00"
    },
    {
      "dt": 1573408800,
      "main": {
        "temp": 274,
        "temp_min": 274,
        "temp_max": 274,
        "pressure": 1016,
        "sea_level": 1016,
        "grnd_level": 941,
        "humidity": 96,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 2.19,
        "deg": 82
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-10 18:00:00"
    },
    {
      "dt": 1573419600,
      "main": {
        "temp": 272.7,
        "temp_min": 272.7,
        "temp_max": 272.7,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 942,
        "humidity": 96,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 5
      },
      "wind": {
        "speed": 1.02,
        "deg": 104
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-10 21:00:00"
    },
    {
      "dt": 1573430400,
      "main": {
        "temp": 272.12,
        "temp_min": 272.12,
        "temp_max": 272.12,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 942,
        "humidity": 94,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 2
      },
      "wind": {
        "speed": 0.8,
        "deg": 197
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-11 00:00:00"
    },
    {
      "dt": 1573441200,
      "main": {
        "temp": 271.76,
        "temp_min": 271.76,
        "temp_max": 271.76,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 943,
        "humidity": 92,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 71
      },
      "wind": {
        "speed": 0.59,
        "deg": 208
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-11 03:00:00"
    },
    {
      "dt": 1573452000,
      "main": {
        "temp": 271.45,
        "temp_min": 271.45,
        "temp_max": 271.45,
        "pressure": 1018,
        "sea_level": 1018,
        "grnd_level": 942,
        "humidity": 88,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 52
      },
      "wind": {
        "speed": 0.57,
        "deg": 192
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-11 06:00:00"
    },
    {
      "dt": 1573462800,
      "main": {
        "temp": 277.3,
        "temp_min": 277.3,
        "temp_max": 277.3,
        "pressure": 1017,
        "sea_level": 1017,
        "grnd_level": 943,
        "humidity": 62,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 0.48,
        "deg": 271
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-11 09:00:00"
    },
    {
      "dt": 1573473600,
      "main": {
        "temp": 281.25,
        "temp_min": 281.25,
        "temp_max": 281.25,
        "pressure": 1013,
        "sea_level": 1013,
        "grnd_level": 940,
        "humidity": 51,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": {
        "all": 0
      },
      "wind": {
        "speed": 1.1,
        "deg": 80
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-11 12:00:00"
    },
    {
      "dt": 1573484400,
      "main": {
        "temp": 277.7,
        "temp_min": 277.7,
        "temp_max": 277.7,
        "pressure": 1012,
        "sea_level": 1012,
        "grnd_level": 939,
        "humidity": 71,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": {
        "all": 1
      },
      "wind": {
        "speed": 1.34,
        "deg": 63
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-11 15:00:00"
    },
    {
      "dt": 1573495200,
      "main": {
        "temp": 273.56,
        "temp_min": 273.56,
        "temp_max": 273.56,
        "pressure": 1013,
        "sea_level": 1013,
        "grnd_level": 939,
        "humidity": 88,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "clouds": {
        "all": 1
      },
      "wind": {
        "speed": 0.45,
        "deg": 191
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-11 18:00:00"
    },
    {
      "dt": 1573506000,
      "main": {
        "temp": 273.54,
        "temp_min": 273.54,
        "temp_max": 273.54,
        "pressure": 1014,
        "sea_level": 1014,
        "grnd_level": 939,
        "humidity": 88,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "clouds": {
        "all": 28
      },
      "wind": {
        "speed": 1.99,
        "deg": 222
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-11 21:00:00"
    },
    {
      "dt": 1573516800,
      "main": {
        "temp": 273.18,
        "temp_min": 273.18,
        "temp_max": 273.18,
        "pressure": 1013,
        "sea_level": 1013,
        "grnd_level": 939,
        "humidity": 87,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "clouds": {
        "all": 26
      },
      "wind": {
        "speed": 1.48,
        "deg": 228
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-12 00:00:00"
    },
    {
      "dt": 1573527600,
      "main": {
        "temp": 273.32,
        "temp_min": 273.32,
        "temp_max": 273.32,
        "pressure": 1013,
        "sea_level": 1013,
        "grnd_level": 938,
        "humidity": 89,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 53
      },
      "wind": {
        "speed": 1.78,
        "deg": 215
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-12 03:00:00"
    },
    {
      "dt": 1573538400,
      "main": {
        "temp": 272.81,
        "temp_min": 272.81,
        "temp_max": 272.81,
        "pressure": 1013,
        "sea_level": 1013,
        "grnd_level": 939,
        "humidity": 92,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 62
      },
      "wind": {
        "speed": 2.04,
        "deg": 240
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-12 06:00:00"
    },
    {
      "dt": 1573549200,
      "main": {
        "temp": 276.34,
        "temp_min": 276.34,
        "temp_max": 276.34,
        "pressure": 1011,
        "sea_level": 1011,
        "grnd_level": 939,
        "humidity": 81,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 2.95,
        "deg": 239
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-12 09:00:00"
    },
    {
      "dt": 1573560000,
      "main": {
        "temp": 276.38,
        "temp_min": 276.38,
        "temp_max": 276.38,
        "pressure": 1010,
        "sea_level": 1010,
        "grnd_level": 938,
        "humidity": 96,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 2.93,
        "deg": 289
      },
      "rain": {
        "3h": 0.25
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-12 12:00:00"
    },
    {
      "dt": 1573570800,
      "main": {
        "temp": 276.48,
        "temp_min": 276.48,
        "temp_max": 276.48,
        "pressure": 1010,
        "sea_level": 1010,
        "grnd_level": 938,
        "humidity": 87,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 2.19,
        "deg": 221
      },
      "rain": {
        "3h": 0.44
      },
      "sys": {
        "pod": "d"
      },
      "dt_txt": "2019-11-12 15:00:00"
    },
    {
      "dt": 1573581600,
      "main": {
        "temp": 274.29,
        "temp_min": 274.29,
        "temp_max": 274.29,
        "pressure": 1012,
        "sea_level": 1012,
        "grnd_level": 938,
        "humidity": 95,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 600,
          "main": "Snow",
          "description": "light snow",
          "icon": "13n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 2.22,
        "deg": 225
      },
      "snow": {
        "3h": 0.06
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-12 18:00:00"
    },
    {
      "dt": 1573592400,
      "main": {
        "temp": 273.34,
        "temp_min": 273.34,
        "temp_max": 273.34,
        "pressure": 1013,
        "sea_level": 1013,
        "grnd_level": 939,
        "humidity": 96,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 1.63,
        "deg": 250
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-12 21:00:00"
    },
    {
      "dt": 1573603200,
      "main": {
        "temp": 272.68,
        "temp_min": 272.68,
        "temp_max": 272.68,
        "pressure": 1012,
        "sea_level": 1012,
        "grnd_level": 938,
        "humidity": 96,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 0.74,
        "deg": 180
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-13 00:00:00"
    },
    {
      "dt": 1573614000,
      "main": {
        "temp": 272.39,
        "temp_min": 272.39,
        "temp_max": 272.39,
        "pressure": 1012,
        "sea_level": 1012,
        "grnd_level": 937,
        "humidity": 95,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 1.4,
        "deg": 95
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-13 03:00:00"
    },
    {
      "dt": 1573624800,
      "main": {
        "temp": 271.9,
        "temp_min": 271.9,
        "temp_max": 271.9,
        "pressure": 1012,
        "sea_level": 1012,
        "grnd_level": 936,
        "humidity": 98,
        "temp_kf": 0
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "clouds": {
        "all": 100
      },
      "wind": {
        "speed": 2.07,
        "deg": 81
      },
      "sys": {
        "pod": "n"
      },
      "dt_txt": "2019-11-13 06:00:00"
    }
  ],
  "city": {
    "id": 2867714,
    "name": "Munich",
    "coord": {
      "lat": 48.1371,
      "lon": 11.5754
    },
    "country": "DE",
    "population": 1260391,
    "timezone": 3600,
    "sunrise": 1573193343,
    "sunset": 1573227950
  }
};