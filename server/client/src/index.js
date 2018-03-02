/**
 * Created by yukiX on 2018/02/27.
 */
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);