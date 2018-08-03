import './utils/moment-sql';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Spinner from './components/spinner/spinner';
import App from './App';
import 'reset-css';
import 'react-day-picker/lib/style.css';
import 'react-vis/dist/style.css';
import './index.css';
import createStore from './store';

const { store, persistor } = createStore();
ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<Spinner />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
    document.getElementById('root')
);
