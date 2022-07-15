const {Schema, model} = require('mongoose')

const project = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Number,
        required: true
    },
    users: {
        items: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'User'
                }
            }
        ]
    },
    comments: {
        items: [
            {
                commentId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Comment'
                }
            }
        ]
    },
    reports: {
        items: [
            {
                reportId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Report'
                }
            }
        ]
    }
})

project.methods.addUser = function(user) {
    const items = [...this.users.items]
    items.push({
        userId: user._id
    })
    this.users = {items}

    return this.save()
}

project.methods.removeUser = function(id) {
    let items = [...this.users.items]
    const idx = items.findIndex(u => u.userId.toString() === id.toString())

    if (items[idx]) {
        items = items.filter(u => u.userId.toString() !== id.toString())
    }

    this.users = {items}
    return this.save()
}

project.methods.addComment = function(comment) {
    const items = [...this.comments.items]
    items.push({
        commentId: comment._id
    })
    this.comments = {items}

    return this.save()
}

project.methods.addReport = function(report) {
    const items = [...this.reports.items]
    items.push({
        reportId: report._id
    })
    this.reports = {items}

    return this.save()
}

project.methods.removeReport = function(id) {
    let items = [...this.reports.items]
    const idx = items.findIndex(r => r.reportId.toString() === id.toString())

    if (items[idx]) {
        items = items.filter(r => r.reportId.toString() !== id.toString())
    }

    this.reports = {items}
    return this.save()
}

module.exports = model('Project', project)