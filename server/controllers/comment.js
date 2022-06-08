const commentService = require('../services/comment-service')

exports.getByProjectId = async function (req, res) {
  try {
    const comments = await commentService.getByProjectId(req.params.id)
    res.send(comments);
  } catch(e) {
    console.log(e);
    res.status(404).send();
  }
}

exports.save = async function(req, res) {
  try {
    const comment = await commentService.save(req.body, req.params.id, req.user)
    res.send(comment)
  } catch(e) {
    console.log(e)
  }
}