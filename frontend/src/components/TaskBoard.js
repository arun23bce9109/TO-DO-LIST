import React, { useEffect, useState } from "react";
import axios from "axios";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ priority: "" });
  

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    const res = await axios.post("/api/tasks", newTask);
    setTasks([...tasks, res.data]);
    setNewTask({ title: "", priority: "Low", deadline: "", section: "", assignedTo: "" });
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const updateTask = async (id, updatedTask) => {
    const res = await axios.put(`/api/tasks/${id}`, updatedTask);
    setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Task Manager</h2>

      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Task "
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Collaborating with others or not (Yes/No) "
          value={newTask.section}
          onChange={(e) => setNewTask({ ...newTask, section: e.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Name of person Collaborating with"
          value={newTask.assignedTo}
          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
          style={styles.input}
        />
        <select
          value={newTask.priority}
          
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          style={styles.input}
        >
          <option value="" disabled selected>Select priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="date"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>Add Task</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li key={task._id} style={styles.taskCard}>
            <div>
              <strong>{task.title}</strong>
              <p>{task.section} | {task.assignedTo}</p>
              <p>{task.priority} - {task.deadline}</p>
            </div>
            <div>
              <button onClick={() => deleteTask(task._id)} style={styles.deleteBtn}>Delete</button>
              <button
                onClick={() =>
                  updateTask(task._id, {
                    ...task,
                    title: prompt("Edit task title", task.title),
                  })
                }
                style={styles.editBtn}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  taskCard: {
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    marginRight: "10px",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editBtn: {
    backgroundColor: "#17a2b8",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TaskBoard;
