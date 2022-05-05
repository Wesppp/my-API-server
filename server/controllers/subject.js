const subjectService = require('../services/subject-service')
const Subject = require('../models/subject')

exports.getAll = async function (req, res) {
  const subjects = await subjectService.getAll()
  res.send(subjects);
}

exports.getById = async function (req, res) {
  const id = req.params.id;
  let subject = await subjectService.getById(id)

  if (subject) {
    res.send(subject);
  } else {
    res.status(404).send();
  }
}

exports.save = async function(req, res) {
  if (req.body.name === '' || !req.body) return res.sendStatus(400);

  let subject = new Subject(req.body.name, 0)
  await subjectService.save(subject)
  res.send(subject);
}

exports.update = async function(req, res) {
  if (!req.body) return res.sendStatus(400);
  let subject = new Subject(req.body.name, req.body.id)

  subject = subjectService.update(subject)
  res.send(subject);
}

exports.delete = async function(req, res) {
  let subject = await subjectService.delete(req.params.id)

  if (subject) {
    res.send(subject);
  } else {
    res.status(404).send();
  }
}
