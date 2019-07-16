import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './src/components/App';
import config from './config';
import axios from 'axios';
import * as api from './src/api'

const instance = axios.create({
  baseURL: "http://0.0.0.0:5000/"
})

const checkValues = (team, sprint) => {
    if (sprint && team) {
      return `/${team}/${sprint}`;
    }
    else {
      return `/teams`;
    }
}
const serverRender = (team, sprint) =>
  instance.get(checkValues(team, sprint))
    .then(resp => {
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App selectSprint={sprint} selectTeam={team}/>
        ),
        initialData: resp.data
      };
    });



export default serverRender
