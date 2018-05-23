var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question: String,
    details: String,
    upvote: Array,
    downvote: Array
},{
    timestamps: true
});

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;