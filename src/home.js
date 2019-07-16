import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';
import Splash from './components/Splash';

ReactDOM.render((
    <Splash initialData={window.initialData}/>
), document.getElementById('root'))
