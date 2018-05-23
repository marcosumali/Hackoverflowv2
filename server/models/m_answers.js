var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var answerSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    answer: String,
    upvote: Array,
    downvote: Array
},{
    timestamps: true
});

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;