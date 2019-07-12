import express from 'express';
import data from '../src/testData';
import axios from 'axios';

const router = express.Router();


router.get('/category', (req, res) => {
  res.send({ category: data.category });
});




export default router;
