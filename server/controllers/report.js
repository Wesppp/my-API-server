const reportService = require('../services/report-service')

exports.getAll = async function (req, res) {
  const reports = await reportService.getAll()
  res.send(reports)
}

exports.save = async function(req, res) {
  try {
    const report = await reportService.save(req.body, req.params.id, req.user)
    res.send(report)
  } catch(e) {
    console.log(e)
  }
}