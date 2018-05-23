const express = require('express');
const { save, getQuestions, updateQuestions, upvote, downvote, getQuestion } = require('../controllers/c_questions');
const { authentication, authorisation, autherror } = require('../middlewares/auth');

const router = express.Router();

router
  .get('/', getQuestions)
  .get('/single', getQuestion)
  .post('/save', authentication, authorisation, autherror, save)
  .put('/', authentication, authorisation, autherror, updateQuestions)
  .put('/upvote', authentication, authorisation, autherror, upvote)
  .put('/downvote', authentication, authorisation, autherror, downvote)

module.exports = router;
