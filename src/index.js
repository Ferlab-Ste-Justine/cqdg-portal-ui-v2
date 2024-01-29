// Import css before everything to make sure it is applied correctly
import React from 'react';
import ReactDOM from 'react-dom';

import { initUserSnap } from 'services/initUsersnap';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'style/themes/cqdg/dist/antd.css';
import 'style/themes/cqdg/main.scss';
import './index.css';

initUserSnap();

//On Summary tab ResizableGridLayout fails with new createRoot(container) from React 18
//so we need to keep ReactDOM.render for now until we solve this issue
//eslint-disable-next-line react/no-deprecated
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
