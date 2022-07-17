const Project = require('../models/project')
const Report = require('../models/report')

exports.getAll = async function () {
  const reports = await Report.find()
  return reports
}

exports.save = async function(newReport, projectId, author) {
  const project = await Project.findById(projectId)

  const report = new Report({
    report: newReport.report,
    createDate: new Date().toLocaleString(),
    authorId: author._id,
    projectTitle: project.title
  })

  await report.save()
  await project.addReport(report)
  return report
}