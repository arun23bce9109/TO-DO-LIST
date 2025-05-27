const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// POST /api/tasks
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
