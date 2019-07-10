import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/App';

ReactDOM.hydrate(
  <App initialCategory={window.initialData.category} />,
  document.getElementById('root')
);
