const express = require('express');
const { save, getAnswers, getAnswersByQuestion, updateAnswer, upvote, downvote } = require('../controllers/c_answers');
const { authentication, authorisation, autherror } = require('../middlewares/auth');

const router = express.Router();

router
  .get('/', getAnswers)
  .get('/byQuestion', getAnswersByQuestion)
  .post('/save', authentication, authorisation, autherror, save)
  .put('/', authentication, authorisation, autherror, updateAnswer)
  .put('/upvote', authentication, authorisation, autherror, upvote)
  .put('/downvote', authentication, authorisation, autherror, downvote)

module.exports = router;
