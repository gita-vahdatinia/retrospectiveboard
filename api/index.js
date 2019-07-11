import express from 'express';
import data from '../src/testData';
import teams from '../src/teams'
const router = express.Router();

router.get('/category', (req, res) => {
  res.send({ category: data.category });
});
router.get('/teams', (req, res) => {
  res.send({ teams: teams.teams });
});



export default router;
