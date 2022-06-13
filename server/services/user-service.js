const User = require("../models/user")
const Project = require("../models/project")
const jwt = require('jsonwebtoken');
const JWT_Secret = 'your_secret_key'

function mapUserItems(arr, field) {
  return arr.items.map(el => ({
      ...el[field]._doc
  }))
}

exports.getAll = async function () {
  const users = await User.find()
  return users
}

exports.getById = async function (id) {
  const user = await User.findById(id)
  return user
}

exports.save = async function (newUser) {
  const repeatUser = await User.find({email: newUser.email});
  
  if (!repeatUser.length) {
    const user = new User({
      name: newUser.name,
      password: newUser.password,
      role: 'user',
      email: newUser.email,
      projects: {items: []}
  })
    return user
  } else {
    return false
  }
}

exports.update = async function (newUserData) {
  const {id} = newUserData
  delete newUserData.id
  const user = await User.findByIdAndUpdate(id, newUserData)
  return user
}

exports.login = async function (user) {
  const loginUser = await User.find({
    email: user.email,
    password: user.password
  });

  if (loginUser.length) {
    let token = jwt.sign(loginUser[0].toJSON(), JWT_Secret)
    return {signed_user: loginUser[0], token: token}
  }
}

exports.getProjectsInUser = async function(id) {
  const user = await User.findById(id)
    .populate('projects.items.projectId')

  let projects = mapUserItems(user.projects, 'projectId')
  return projects
}
