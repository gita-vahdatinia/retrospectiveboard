import express from 'express';
import data from '../src/testData';

const router = express.Router();

router.get('/category', (req, res) => {
  res.send({ category: data.category });
});



export default router;
