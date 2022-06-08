const {Schema, model} = require('mongoose')

const comment = new Schema({
    author: {
        type: String,
        required: true
    },
    createDate: {
      type: String,
      required: true
    },
    content: {
        type: String,
        required: true
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
})

module.exports = model('Comment', comment)