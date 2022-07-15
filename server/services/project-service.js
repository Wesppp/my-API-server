const Project = require('../models/project')
const User = require('../models/user')
const Comment = require('../models/comment')
const Report = require('../models/report')

function mapProjectItems(arr, field) {
  return arr.items.map(el => ({
      ...el[field]._doc
  }))
}

exports.getAll = async function () {
  const projects = await Project.find()
  return projects
}

exports.getById = async function (id) {
  const project = await Project.findById(id)
  return project
}

exports.save = async function (newProject, creatorId) {
  let repeatProject = await Project.find({title: {$regex: newProject.title, $options: 'i'}})
  
  try {
    if (!repeatProject.length) {
      const project = new Project({
        title: newProject.title,
        description: newProject.description,
        startDate: new Date().toLocaleDateString(),
        endDate: newProject.endDate || '',
        img: newProject.img || 'https://i0.wp.com/enbeeone3.com/wp-content/uploads/2015/01/absolute-beginner-guide.jpg?resize=300%2C200&ssl=1',
        creatorId: creatorId,
        users: {items: []},
        comments: {items: []},
        status: 0
      })
      await project.save() 
      return project
    } else {
      throw new SyntaxError('There is already a project with this title')
    }
  } catch (e) {
    throw e.message
  }
}

exports.update = async function (newProjectData) {
  const {_id} = newProjectData
  delete newProjectData
  const project = await Project.findByIdAndUpdate(_id, newProjectData)
  return project
}

exports.finish = async function (completedProject) {
  const {_id} = completedProject
  delete completedProject
  const project = await Project.findByIdAndUpdate(_id, completedProject)
  let users = await User.find()
  users.forEach(u => u.removeProject(project._id))
  return project
}

exports.delete = async function (id) {
  const users = await User.find()
  users.forEach(user => user.removeProject(id))

  const project = await Project.findById(id)
  project.comments.items.forEach(c => {
    Comment.findByIdAndRemove(c.commentId.toString(), function (err, res) {
      if (err) console.log(err)
    })
  })
  
  project.reports.items.forEach(r => {
    Report.findByIdAndRemove(r.reportId.toString(), function (err, res) {
      if (err) console.log(err)
    })
  })

  await Project.deleteOne({_id: id})

  return project
}

exports.addUser = async function(addUser, projectId) {
  const project = await Project.findById(projectId)
  const user = await User.findById(addUser._id)
  await project.addUser(addUser)
  await user.addProject(project)
  return project
}

exports.getUsersInProject = async function(id) {
  let project = await Project.findById(id)
    .populate('users.items.userId')

  const users = mapProjectItems(project.users, 'userId')
  return users
}

exports.excludeUser = async function(excludeUser, projectId) {
  const user = await User.findById(excludeUser._id)
  const project = await Project.findById(projectId)
  await user.removeProject(projectId)
  await project.removeUser(excludeUser._id)
  return project
}

exports.getProjectReports = async function(id) {
  const project = await Project.findById(id)
    .populate('reports.items.reportId')

  let reports = mapProjectItems(project.reports, 'reportId')
  return reports
}