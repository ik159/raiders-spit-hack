
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import 'react-responsive-modal/styles.css';
import swDev from './swDev';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

swDev();
