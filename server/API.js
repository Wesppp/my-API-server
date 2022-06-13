const express = require("express");
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const JWT_Secret = 'your_secret_key'
const projectController = require('./controllers/project')
const userController = require('./controllers/user')
const commentController = require('./controllers/comment')
const reportController = require('./controllers/report')

const cors = require('cors')
const app = express();
const jsonParser = express.json();
const port = 3200;

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1] 

  if (token == null) return res.sendStatus(401)
  
  jwt.verify(token, JWT_Secret, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
  })
}

app.get("/api/projects", projectController.getAll);
app.get("/api/projects/:id", projectController.getById);
app.get("/api/projects/users/:id", projectController.getUsersInProject);
app.get("/api/projects/reports/:id", projectController.getProjectReports);
app.post("/api/projects", authenticateToken, jsonParser, projectController.save);
app.post("/api/projects/add-user/:id", jsonParser, projectController.addUser);
app.post("/api/projects/exclude-user/:id", jsonParser, projectController.excludeUser);
app.delete("/api/projects/:id", projectController.delete);
app.put("/api/projects", jsonParser, projectController.update);
app.put("/api/projects/finish", jsonParser, projectController.finish);

app.get("/api/users", userController.getAll);
app.get("/api/users/:id", userController.getById);
app.get("/api/users/projects/:id", userController.getProjectsInUser);
app.post("/api/users", jsonParser, userController.save);
app.delete("/api/users/:id", userController.delete);
app.put("/api/users", jsonParser, userController.update);
app.post("/api/users/login", jsonParser, userController.login);

app.get("/api/comments/:id", commentController.getByProjectId);
app.post("/api/comments/add/:id", authenticateToken, jsonParser, commentController.save);

app.get("/api/reports", reportController.getAll);
app.post("/api/reports/add/:id", authenticateToken, jsonParser, reportController.save);

async function start() {
  try {
    await mongoose.connect('mongodb+srv://Misha:1234qwer@cluster0.8cynq.mongodb.net/work-space', {
      useNewUrlParser: true
    })

    app.use(cors())
    const server = app.listen(port, (error) => {
      if (error) return console.log(`Error: ${error}`);
      console.log(`Server listening on port ${server.address().port}`);
    });

  } catch(e) {
    console.log(e)
  }
}

start()

