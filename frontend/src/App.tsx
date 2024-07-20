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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    if (!title || !description || urgencyLevel < 1 || urgencyLevel > 5) {
      setErrorMessage("All fields are required and urgency level must be between 1 and 5.");
      return;
    }

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
      setErrorMessage(null);
    } else {
      setErrorMessage("Failed to create task.");
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
      setErrorMessage(null);
    } else {
      setErrorMessage("Failed to delete task.");
    }
  };

  const updateTask = async () => {
    if (editTaskId === null) return;

    const { title, description, urgencyLevel } = formData;

    if (!title || !description || urgencyLevel < 1 || urgencyLevel > 5) {
      setErrorMessage("All fields are required and urgency level must be between 1 and 5.");
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
      setErrorMessage(null);
    } else {
      setErrorMessage("Failed to update task.");
    }
  };

  const handleEdit = (task: Task) => {
    setEditTaskId(task.id);
    setFormData({ title: task.title, description: task.description, urgencyLevel: task.urgencyLevel });
    setErrorMessage(null);
  };

  const urgencyLevelIcon = (urgencyLevel: number) => {
    return (
      <span className="urgency-icons">
        {Array.from({ length: urgencyLevel }, (_, index) => (
          <span key={index} className="circle"></span>
        ))}
      </span>
    );
  };

  const sortByMostUrgent = () => {
    const sortedTasks = [...tasks].sort((a, b) => b.urgencyLevel - a.urgencyLevel);
    setTasks(sortedTasks);
  };

  const sortByLeastUrgent = () => {
    const sortedTasks = [...tasks].sort((a, b) => a.urgencyLevel - b.urgencyLevel);
    setTasks(sortedTasks);
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
          <div className="input-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="input-group">
            <label>Description</label>
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="input-group">
            <label>Urgency Level (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Urgency Level (1-5)"
              value={formData.urgencyLevel}
              onChange={(e) =>
                setFormData({ ...formData, urgencyLevel: parseInt(e.target.value, 10) })
              }
            />
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button
          className="create-button"
          onClick={editTaskId ? updateTask : createTask}
        >
          {editTaskId ? "Update" : "Create"}
        </button>
      </div>
      <div className="sorting-buttons">
        <span>Order by:</span> 
        <button onClick={sortByMostUrgent}>Most urgent</button>
        <button onClick={sortByLeastUrgent}>Least urgent</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-list">
            <div>
              <h3>{task.title} {urgencyLevelIcon(task.urgencyLevel)}</h3>
              <p>{task.description}</p>
            </div>
            <div>
              <button className="edit-button" onClick={() => handleEdit(task)}>Edit</button>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>
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
