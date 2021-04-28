import React from 'react';
import ReactDOM from 'react-dom';
import './fonts/Roboto-Regular.ttf'
import './fonts/Righteous-Regular.ttf'
import './fonts/Syne-VariableFont_wght.ttf'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
