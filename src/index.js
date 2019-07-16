import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';
import TeamBoard from './components/TeamBoard';

ReactDOM.render((
    <TeamBoard initialData={window.initialData}/>
), document.getElementById('root'))
