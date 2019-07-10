import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
  <App initialCategory={window.initialData.category} />,
  document.getElementById('root')
);
