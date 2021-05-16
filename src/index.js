import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import {CovidSaga} from "./Saga/Saga";
import {CovidReducer} from "./Reducer/Reducer";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const saga=createSagaMiddleware();
const store=createStore(
    CovidReducer,
    applyMiddleware(saga)
);

saga.run(CovidSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
