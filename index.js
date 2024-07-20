const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

let tasks = [];
let nextTaskId = 1;

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title, description, urgencyLevel } = req.body;

  console.log("POST /tasks received:", req.body);

  if (!title || !description || typeof urgencyLevel !== 'number' || urgencyLevel < 1 || urgencyLevel > 5) {
    return res
      .status(400)
      .json({ error: "Title, description, and a valid urgencyLevel (1-5) are required." });
  }

  const newTask = {
    id: nextTaskId++,
    title,
    description,
    urgencyLevel,  
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.status(200).json(deletedTask[0]);
});

app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, description, urgencyLevel } = req.body;

  console.log("PUT /tasks/:id received:", req.body);

  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found." });
  }

  tasks[taskIndex] = { id, title, description, urgencyLevel }; 
  res.json(tasks[taskIndex]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
