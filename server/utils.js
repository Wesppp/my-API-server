const fs = require('fs')
const path = require('path')

exports.saveFile = function (subjects) {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            path.join(__dirname, './data/subjects.json'),
            JSON.stringify(subjects),
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
    })
}

exports.saveFileSync = function (subjects) {
    fs.writeFileSync(path.join(__dirname, './data/subjects.json'), subjects);
}