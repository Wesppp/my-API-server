const User = require('../models/user')
const Report = require('../models/report')

exports.save = async function(newReport, projectId, author) {
  const user = await User.findById(author._id) 

  const report = new Report({
    report: newReport.report,
    createDate: new Date().toLocaleString(),
    authorId: author._id,
    projectId: projectId
  })

  await report.save()
  await user.addReport(report)
  return report
}