import { useState, useEffect } from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  description: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://localhost:8000/tasks");
    const tasks = await response.json();
    setTasks(tasks);
  };

  const createTask = async () => {
    const { title, description } = formData;

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    const response = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setFormData({ title: "", description: "" });
    } else {
      alert("Failed to create task.");
    }
  };

  const deleteTask = async (id: number) => {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setTasks(tasks.filter((task) => task.id !== id));
    } else {
      alert("Failed to delete task.");
    }
  };

  const updateTask = async () => {
    if (editTaskId === null) return;

    const { title, description } = formData;

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    const response = await fetch(`http://localhost:8000/tasks/${editTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) => (task.id === editTaskId ? updatedTask : task))
      );
      setEditTaskId(null);
      setFormData({ title: "", description: "" });
    } else {
      alert("Failed to update task.");
    }
  };

  const handleEdit = (task: Task) => {
    setEditTaskId(task.id);
    setFormData({ title: task.title, description: task.description });
  };

  return (
    <div className="app">
      <header className="flex">
        <h1>Task Management App</h1>
        <img src="/vite.svg" alt="Logo" className="logo" />
      </header>
      <div>
      <h2>Create Task</h2>
        <div className="inputs">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        </div>
        <button className="create-button" onClick={createTask}>
          Create
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-list">
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
