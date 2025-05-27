import React from "react";
import TaskBoard from "./components/TaskBoard";
import './styles.css';


function App() {
  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ textAlign: "center", fontSize: "80px",marginTop:"100px", marginBottom: "50px" }}>TO-DO LIST </h1>
      <TaskBoard />
    </div>
  );
}

export default App;
