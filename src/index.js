import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootswatch/dist/zephyr/bootstrap.min.css';
import './index.css';
import App from './App';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';

// Set up app with Redux store and React Router
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
