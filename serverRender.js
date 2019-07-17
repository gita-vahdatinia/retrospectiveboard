import React from 'react';
import ReactDOMServer from 'react-dom/server';
import TeamBoard from './src/components/TeamBoard';
import config from './config';
import axios from 'axios';
import * as api from './src/api'

const instance = axios.create({
  baseURL: "http://0.0.0.0:5000/"
})

const checkValues = (team, sprint, review) => {
    if (review){
      var prev_sprint = sprint-1
      return `/${team}/${prev_sprint}`
    }
    else if(team && sprint){
      return `/${team}/${sprint}`;}
    else{
      return `/teams`
    }
}
const serverRender = (team, sprint, review) =>
  instance.get(checkValues(team, sprint, review))
    .then(resp => {
      console.log(resp.data)
      resp.data.team = team
      resp.data.sprint = sprint
      resp.data.welldata = ""
      resp.data.review = review
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <TeamBoard initialData={resp.data} />
        ),
        initialData: resp.data,
      };
    });

  const splashRender = () =>
    instance.get(`/teams`)
      .then(resp => {
        return {
          initialMarkup: ReactDOMServer.renderToString(
            <Splash initialData={resp.data} />
          ),
          initialData: resp.data,
        };
      });


export default serverRender
