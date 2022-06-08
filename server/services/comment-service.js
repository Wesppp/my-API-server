const Project = require('../models/project')
const Comment = require('../models/comment')

function mapProjectItems(comments) {
  return comments.items.map(c => ({
      ...c.commentId._doc
  }))
}

exports.getByProjectId = async function (id) {
  let project = await Project.findById(id)
    .populate('comments.items.commentId')

  const comments = mapProjectItems(project.comments)
  return comments
}

exports.save = async function(newComment, projectId, author) {
  const project = await Project.findById(projectId) 

  const comment = new Comment({
    author: author.name,
    content: newComment.content,
    createDate: new Date().toLocaleDateString(),
    authorId: author._id,
  })

  await comment.save()
  await project.addComment(comment)
  return comment
}