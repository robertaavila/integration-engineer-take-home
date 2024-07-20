const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

let tasks = [];
let nextTaskId = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required.' });
  }

  const newTask = {
    id: nextTaskId++,
    title,
    description,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id, 10));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found.' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.status(200).json(deletedTask[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
