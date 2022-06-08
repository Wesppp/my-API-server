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
  const project = new Project({
    title: newProject.title,
    description: newProject.description,
    startDate: new Date().toLocaleDateString(),
    endDate: newProject.endDate || '',
    img: newProject.img || 'https://i0.wp.com/enbeeone3.com/wp-content/uploads/2015/01/absolute-beginner-guide.jpg?resize=300%2C200&ssl=1',
    creatorId: creatorId,
    users: {items: []},
    comments: {items: []}
  })
  return project
}

exports.update = async function (newProjectData) {
  const {_id} = newProjectData
  delete newProjectData
  const project = await Project.findByIdAndUpdate(_id, newProjectData)
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

