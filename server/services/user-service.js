const {randomUUID} = require('crypto');
const Utils = require('../utils')
const fs = require("fs");
const path = require("path");

exports.getAll = async function () {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '../data/subjects.json'),
        'utf-8', (err, content) => {
          if (err) {
            reject(err)
          } else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
}

exports.getById = async function (id) {
    const subjects = await this.getAll()
    return subjects.find(subject => subject.id === id)
}

exports.save = async function (subject) {
    const subjects = await this.getAll()
    if (subject) {
        subject.id = randomUUID()
        console.log(subject)
        subjects.push(subject)
    }
    return await Utils.saveFile(subjects)
}

exports.update = async function (subject) {
    const subjects = await this.getAll();
    if (subject) {
        const ids = subjects.findIndex(i => i.id === subject.id);
        subjects[ids] = subject;
    }
    return await Utils.saveFile(subjects)
}

exports.delete = async function (id) {
    let subjects = await this.getAll();
    let index = -1;

    index = subjects.findIndex((a) => a.id === id);

    if (index > -1) {
        const subject = subjects.splice(index, 1)[0];
        subjects = JSON.stringify(subjects);
        Utils.saveFileSync(subjects)
        return subject
    } else {
        return null
    }
}
