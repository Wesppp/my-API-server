const {Schema, model} = require('mongoose')
const Project = require('../models/project')

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    projects: {
        items: [
            {
                projectId: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: 'Project'
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

user.methods.addProject = function(project) {
    const items = [...this.projects.items]
    items.push({
        projectId: project._id
    })

    this.projects = {items}
    return this.save()
}

user.methods.removeProject = function(id) {
    let items = [...this.projects.items]
    const idx = items.findIndex(p => p.projectId.toString() === id.toString())

    if (items[idx]) {
        items = items.filter(p => p.projectId.toString() !== id.toString())
    }

    this.projects = {items}
    return this.save()
}

user.methods.addReport = function(report) {
    const items = [...this.reports.items]
    items.push({
        reportId: report._id
    })
    this.reports = {items}

    return this.save()
}

module.exports = model('User', user)