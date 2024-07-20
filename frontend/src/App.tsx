import { useState, useEffect } from 'react';
import './App.css'; // Ensure you have a CSS file for styling

type Task = {
  id: number,
  title: string,
  description: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:8000/tasks');
    const tasks = await response.json();
    setTasks(tasks);
  };

  const createTask = async () => {
    const { title, description } = formData;

    if (!title || !description) {
      alert('Title and description are required.');
      return;
    }

    const response = await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setFormData({ title: '', description: '' });
    } else {
      alert('Failed to create task.');
    }
  };

  const deleteTask = async (id: number) => {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTasks(tasks.filter(task => task.id !== id));
    } else {
      alert('Failed to delete task.');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <img src="/logo.png" alt="Logo" className="app-logo" />
        <h1>Task Management App</h1>
      </header>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />
        <button onClick={createTask}>Create</button>
      </div>
    </div>
  );
}

export default App;
