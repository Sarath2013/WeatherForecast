import React from 'react';
import WeatherViewContainer from '../contianers/WeatherViewContainer';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import rootSaga from '../sagas';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware, logger)
);
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CssBaseline />
        <WeatherViewContainer />
      </div>
    </Provider>
  );
}

export default App;
