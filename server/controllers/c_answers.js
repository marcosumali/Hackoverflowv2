const ModelAnswer = require('../models/m_answers');

module.exports = {

  save: (req, res, next) => {

    let { _id } = req.decoded;
    let questionId = req.query.id;
    let { answer } = req.body;
        
    let newObj = {
      userId: _id,
      questionId,
      answer,
      upvote: [],
      downvote: []
    }

    let newAnswer = new ModelAnswer(newObj);
    newAnswer.save((err,result) => {
      if (err) {
        res.status(400).json({
          message: 'Error: Bad request save new answer',
          err
        })
      } else {
        res.status(201).json({
          message: 'Save new answer successful',
          answer: result,
        })
      }
    })
  },

  getAnswers: (req, res, next) => {
    
    ModelAnswer.find()
    .populate('userId questionId')
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Find all answers successful',
        answers: result,
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Error: Bad request get answers',
        err
      })
    })

  },

  getAnswersByQuestion: (req, res, next) => {

    let questionId = req.query.id;

    ModelAnswer.find({ questionId })
    .populate('userId questionId')
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Find all answers by question successful',
        answers: result,
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'Error: Bad request get answers',
        err
      })
    })

  },

  updateAnswer: (req, res, next) => {

    let answerId = req.query.id
    let { answer } = req.body;
    let { _id } = req.decoded;

    ModelAnswer.findOne({ _id: answerId })
      .then(result => {

        if (result.userId == _id) {

          ModelAnswer.findOneAndUpdate({ _id: answerId }, { answer })
            .then(result => {
              res.status(200).json({
                message: 'Update answer successful',
                updated_answers: result,
              })      
            })
            .catch(err => {
              res.status(400).json({
                message: 'Error: Update the answer',
                err
              })
            })

        } else {
          res.status(400).json({
            message: 'Error: Your are not authorised to update the answer'
          })
        }

      })
      .catch(err => {
        res.status(400).json({
          message: 'Error: Bad request find answers to update',
          err
        })
      })
  },

  upvote: (req, res, next) => {

    let answerId = req.query.id;
    let { _id } = req.decoded;

    ModelAnswer.findOne({ _id: answerId })
      .then(result => {

        let current_vote = result.upvote // array

        if (current_vote.length <= 0) {
          current_vote.push(_id)

          ModelAnswer.update({ _id: answerId }, { upvote: current_vote })
            .then(result => {
              res.status(200).json({
                  message: 'Add one upvote to answer successful',
                  updated_status: result,
              })

            })
            .catch(error => {
              res.status(400).json({
                  message: 'Error: Bad request to add upvote to related answers'
              })

            })        
        
        } else {

          current_vote.forEach(result => {
            if (result == _id) {
              res.status(400).json({
                message: 'Error: Each user only permitted to give one upvote per answer'
              })
            } else {
              current_vote.push(_id)

              ModelAnswer.update({ _id: answerId }, { upvote: current_vote })
                .then(result => {
                  res.status(200).json({
                    message: 'Add one upvote to answer successful',
                    updated_status: result,
                  })
                })
                .catch(error => {
                  res.status(400).json({
                    message: 'Error: Bad request to add upvote to related answers'
                  })
                })        
            }
          })
        }        
      })
      .catch(error => {
          res.status(400).json({
            message: 'Error: Bad request find answer to add vote'
          })
      })
  },

  downvote: (req, res, next) => {

    let answerId = req.query.id;
    let { _id } = req.decoded;

    ModelAnswer.findOne({_id: answerId})
      .then(result => {

        let current_downvote = result.downvote // array

        if (current_downvote.length <= 0) {

          current_downvote.push(_id)

          ModelAnswer.update({_id: answerId}, {downvote: current_downvote})
            .then(result => {
              res.status(200).json({
                message: 'Add one downvote to answer successful',
                update_status: result,
              })

            })
            .catch(error => {
              res.status(400).json({
                message: 'Error: Bad request to add downvote to related answers'
              })
            })

        } else {

          current_downvote.forEach(result => {
            if (result == _id) {
              res.status(400).json({
                message: 'Error: Each user only permitted to give one downvote per answer'
              })

            } else {
              current_downvote.push(_id)

              ModelAnswer.update({_id: answerId}, {downvote: current_downvote})
                .then(result => {
                  res.status(200).json({
                    message: 'Add one downvote to answer successful',
                    update_status: result,
                  })

                })
                .catch(error => {
                  res.status(400).json({
                    message: 'Error: Bad request to add downvote to related answers'
                  })
    
                })        
            }
          })                

        }

      })
      .catch(error => {
        res.status(400).json({
          message: 'Error: Bad request find answer to add vote'
        })
      })
  }


}
