import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers/index';
import App from './containers/App';
import AppRouter from './router/router';

import './index.less';

let store = createStore(reducer, applyMiddleware(thunkMiddleware));

/*热更新*/
if (module.hot) {
    module.hot.accept('./router/router', () => {
        const getRouter = require('./router/router');
        renderWithHotReload(getRouter());
    });
}

/* redux中间件middleware就是在action在到达reducer先经过中间件处理，使用中间件处理不同格式的action，
把它转为标准的action给reducer处理 */

render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);
