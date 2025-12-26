const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();

// CREATE
router.post("/", auth, async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user.id });
  res.status(201).json(task);
});

// READ
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
