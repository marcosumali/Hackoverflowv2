const ModelQuestion = require('../models/m_questions');

module.exports = {

  save: (req, res, next) => {

    let { question, details } = req.body;
    let { _id } = req.decoded;
        
    let newObj = {
        userId: _id,
        question,
        details,
        upvote: [],
        downvote: []
    }
    // console.log(newObj);

    let newQuestion = new ModelQuestion(newObj);

    newQuestion.save()
      .then(result => {
        res.status(201).json({
          message: 'Save new question successful',
          question: result,
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'Error: Bad request save new question',
          err
        })
      })
  },

  getQuestions: (req, res, next) => {

    ModelQuestion.find()
    .populate('userId')
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Find all questions successful',
        questions: result,
      })
    })
    .catch(error => {
      res.status(400).json({
        message: 'Error: Bad request get questions',
        err
      })
    })

  },

  updateQuestions: (req, res, next) => {

    let questionId = req.query.id
    let { question, details } = req.body;
    let { _id } = req.decoded;

    ModelQuestion.findOne({ _id: questionId })
      .then(result => {

        if (result.userId == _id) {

          ModelQuestion.findOneAndUpdate({ _id: questionId }, { question, details })
            .then(result => {
              res.status(200).json({
                message: 'Update question successful',
                updated_questions: result,
              })      
            })
            .catch(err => {
              res.status(400).json({
                message: 'Error: Update the question',
                err
              })
            })

        } else {
          res.status(400).json({
            message: 'Error: Your are not authorised to update the question'
          })
        }

      })
      .catch(err => {
        res.status(400).json({
          message: 'Error: Bad request find questions to update',
          err
        })
      })
  },

  upvote: (req, res, next) => {

    let questionId = req.query.id;
    let { _id } = req.decoded;

    ModelQuestion.findOne({ _id: questionId })
    .then(result => {

      let current_vote = result.upvote // array

      if (current_vote.length <= 0) {
        current_vote.push(_id)

        ModelQuestion.update({ _id: questionId }, { upvote: current_vote })
          .then(result => {
            res.status(200).json({
                message: 'Add one upvote to question successful',
                updated_status: result,
            })

          })
          .catch(error => {
            res.status(400).json({
                message: 'Error: Bad request to add upvote to related questions'
            })

          })        
      
      } else {

        current_vote.forEach(result => {
          if (result == _id) {
            res.status(400).json({
              message: 'Error: Each user only permitted to give one upvote per question'
            })
          } else {
            current_vote.push(_id)

            ModelQuestion.update({ _id: questionId }, { upvote: current_vote })
              .then(result => {
                res.status(200).json({
                  message: 'Add one upvote to question successful',
                  updated_status: result,
                })
              })
              .catch(error => {
                res.status(400).json({
                  message: 'Error: Bad request to add upvote to related questions'
                })
              })        
          }
        })
      }        
    })
    .catch(error => {
        res.status(400).json({
          message: 'Error: Bad request find question to add vote'
        })
    })
  },

  downvote: (req, res, next) => {

    let questionId = req.query.id;
    let { _id } = req.decoded;

    ModelQuestion.findOne({_id: questionId})
      .then(result => {

        let current_downvote = result.downvote // array

        if (current_downvote.length <= 0) {

          current_downvote.push(_id)

          ModelQuestion.update({_id: questionId}, {downvote: current_downvote})
            .then(result => {
              res.status(200).json({
                message: 'Add one downvote to question successful',
                update_status: result,
              })

            })
            .catch(error => {
              res.status(400).json({
                message: 'Error: Bad request to add downvote to related questions'
              })
            })

        } else {

          current_downvote.forEach(result => {
            if (result == _id) {
              res.status(400).json({
                message: 'Error: Each user only permitted to give one downvote per question'
              })

            } else {
              current_downvote.push(_id)

              ModelQuestion.update({_id: questionId}, {downvote: current_downvote})
                .then(result => {
                  res.status(200).json({
                    message: 'Add one downvote to question successful',
                    update_status: result,
                  })

                })
                .catch(error => {
                  res.status(400).json({
                    message: 'Error: Bad request to add downvote to related questions'
                  })
    
                })        
            }
          })                

        }

      })
      .catch(error => {
        res.status(400).json({
          message: 'Error: Bad request find question to add vote'
        })
      })
  },

  getQuestion: (req, res, next) => {

    let questionId = req.query.id

    ModelQuestion.find({ _id: questionId })
      .populate('userId')
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Find question successful',
          question: result,
        })
      })
      .catch(error => {
        res.status(400).json({
          message: 'Error: Bad request get question',
          err
        })
      })
  }



}