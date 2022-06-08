const reportService = require('../services/report-service')

exports.save = async function(req, res) {
  try {
    const report = await reportService.save(req.body, req.params.id, req.user)
    res.send(report)
  } catch(e) {
    console.log(e)
  }
}