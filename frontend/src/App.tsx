import { useState, useEffect } from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
  description: string;
  urgencyLevel: number;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({ title: "", description: "", urgencyLevel: 1 });
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
    const { title, description, urgencyLevel } = formData;
  
    const response = await fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, urgencyLevel }),
    });
  
    if (response.ok) {
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setFormData({ title: "", description: "", urgencyLevel: 1 });
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
      if (editTaskId === id) {
        setFormData({ title: "", description: "", urgencyLevel: 1 });
        setEditTaskId(null);
      }
    } else {
      alert("Failed to delete task.");
    }
  };

  const updateTask = async () => {
    if (editTaskId === null) return;

    const { title, description, urgencyLevel } = formData;

    if (!title || !description || urgencyLevel < 1 || urgencyLevel > 5) {
      alert("All fields are required and urgencyLevel must be between 1 and 5.");
      return;
    }

    const response = await fetch(`http://localhost:8000/tasks/${editTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, urgencyLevel }),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) => (task.id === editTaskId ? updatedTask : task))
      );
      setEditTaskId(null);
      setFormData({ title: "", description: "", urgencyLevel: 1 });
    } else {
      alert("Failed to update task.");
    }
  };

  const handleEdit = (task: Task) => {
    setEditTaskId(task.id);
    setFormData({ title: task.title, description: task.description, urgencyLevel: task.urgencyLevel });
  };

  const urgencyLevelIcon = (urgencyLevel: number) => {
    const circles = Array(urgencyLevel).fill("⚫").join(" ");
    return circles || "⚪"; 
  };

  return (
    <div className="app">
      <header className="flex">
        <h1>Task Management App</h1>
        <img src="/vite.svg" alt="Logo" className="logo" />
      </header>
      <div>
        <h2>{editTaskId ? "Update Task" : "Create Task"}</h2>
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
          <input
            type="number"
            min="1"
            max="5"
            placeholder="urgencyLevel (1-5)"
            value={formData.urgencyLevel}
            onChange={(e) =>
              setFormData({ ...formData, urgencyLevel: parseInt(e.target.value, 10) })
            }
          />
        </div>
        <button
          className="create-button"
          onClick={editTaskId ? updateTask : createTask}
        >
          {editTaskId ? "Update" : "Create"}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-list">
            <div>
              <h3>{task.title} <span className="urgency-icons">{urgencyLevelIcon(task.urgencyLevel)}</span></h3>
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
