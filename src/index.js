import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/index';
import App from './containers/App';
import AppRouter from './router/router'

import './index.css';

let store = createStore(reducer);

render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);
