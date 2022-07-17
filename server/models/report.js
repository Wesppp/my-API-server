const {Schema, model} = require('mongoose')

const report = new Schema({
    createDate: {
      type: String,
      required: true
    },
    report: {
        type: String,
        required: true
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    },
    projectTitle: {
      type: String,
      required: true
    }
})

module.exports = model('Report', report)