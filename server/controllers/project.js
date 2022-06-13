const projectService = require('../services/project-service')

exports.getAll = async function (req, res) {
    try {
        const projects = await projectService.getAll()
        res.send(projects)
    } catch (e) {
        console.log(e)
    }
}

exports.getById = async function (req, res) {
    const project = await projectService.getById(req.params.id)
    if (project) {
        res.send(project);
    } else {
        res.status(404).send();
    }
}

exports.save = async function(req, res) {
    try {
        const project = await projectService.save(req.body, req.user._id)
        res.send(project)
    } catch(e) {
        console.log(e)
    }
}

exports.update = async function(req, res) {
    const project = await projectService.update(req.body)
    res.send(project)
}

exports.finish = async function(req, res) {
    const project = await projectService.finish(req.body)
    res.send(project)
}

exports.delete = async function(req, res) {
    try {
        const project = await projectService.delete(req.params.id)
        res.send(project)
    } catch (e) {
        console.log(e)
    }
}

exports.addUser = async function(req, res) {
    try {
        const project = await projectService.addUser(req.body, req.params.id)
        res.send(project)
    } catch(e) {
        console.log(e);
    }
}

exports.getUsersInProject = async function(req, res) {
    try {
        const users = await projectService.getUsersInProject(req.params.id)
        res.send(users);
    } catch(e) {
        res.status(404).send();
    }
}

exports.excludeUser = async function(req, res) {
    try {
        const project = await projectService.excludeUser(req.body, req.params.id)
        res.send(project)
    } catch (e) {
        console.log(e);
    }
} 

exports.getProjectReports = async function(req, res) {
    try {
        const reports = await projectService.getProjectReports(req.params.id)
        res.send(reports)
    } catch(e) {
        console.log(e)
        res.status(404).send()
    }
}