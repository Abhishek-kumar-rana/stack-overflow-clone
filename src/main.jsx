import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux';
import { legacy_createStore as createstore, applyMiddleware, compose } from 'redux';
import {thunk} from "redux-thunk"
import reducers from './reducers';

const store = createstore(reducers, compose(applyMiddleware(thunk)))

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
