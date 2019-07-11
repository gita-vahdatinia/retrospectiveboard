import express from 'express';
import data from '../src/testData';
import axios from 'axios';

const instance = axios.create({
  baseURL: "http://0.0.0.0:5000/"
})

const router = express.Router();


router.get('/category', (req, res) => {
  res.send({ category: data.category });
});

router.get('/teams', (req, res) => {
  let path = `/teams`
    instance.get(path).then(({data}) =>  res.send({teams: data}))
  })



export default router;
