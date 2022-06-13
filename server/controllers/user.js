const userService = require('../services/user-service')
const User = require('../models/user')

exports.getAll = async function (req, res) {
    const users = await userService.getAll()
    res.send(users)
}

exports.getById = async function (req, res) {
    const user = await userService.getById(req.params.id)

    if (user) {
        res.send(user);
    } else {
        res.status(404).send();
    }
}

exports.save = async function(req, res) {
    const user = await userService.save(req.body)

    try {
        await user.save()
        res.send(user)
    } catch(e) {
        console.log(e)
        res.send(false)
    }
}

exports.update = async function(req, res) {
    const user = await userService.update(req.body)
    res.send(user)
}

exports.delete = async function(req, res) {
    try {
        const user = await User.deleteOne({_id: req.params.id})
        res.send(user)
    } catch (e) {
        console.log(e)
    }
}

exports.login = async function(req, res) {
    try {
        const userJWT = await userService.login(req.body)
        res.send(userJWT)
    } catch(e) {
        console.log(e);
        res.send(false)
    }
}

exports.getProjectsInUser = async function(req, res) {
    try {
        const projects = await userService.getProjectsInUser(req.params.id)
        res.send(projects)
    } catch(e) {
        console.log(e)
        res.status(404).send()
    }
}

exports.excludeUser = async function(req, res) {
    try {
        const project = await userService.excludeUser(req.body, req.params.id)
        res.send(project)
    } catch (e) {
        console.log(e);
    }
} 