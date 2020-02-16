import config from './config';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import serverRender from './serverRender'
import splashRender from './serverRender'
import fetchSprint from './serverRender'
import axios from 'axios';

import express from 'express';
import bodyParser from 'body-parser';

const instance = axios.create({
  baseURL: "http://backend:5000/"
})
const server = express();
server.use(bodyParser.json());

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));

server.set('view engine', 'ejs');

server.get(('/fetch/sprint/values/:team'), (req, res) => {
  instance.get(`/${req.params.team}/sprint`)
   .then(resp => res.json(resp.data))
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});
// .then(resp => res.json({[...new Set(resp.data)]}))

server.get(['/', '/:team/:sprint', '/:team/:sprint/:review'], (req, res) => {
  serverRender(req.params.team, req.params.sprint, req.params.review)
    .then(({ initialMarkup, initialData}) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Bad Request');
    });
});

server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});
