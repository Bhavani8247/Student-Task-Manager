const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

// protect all routes
router.use(auth);

// POST /api/tasks
router.post('/', async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body;
    if (!title?.trim()) return res.status(400).json({ error: 'Title is required' });

    const task = new Task({
      userId: req.user.id,
      title: title.trim(),
      description: description?.trim() || '',
      priority: priority || 'medium',
      dueDate: dueDate || null
    });

    const saved = await task.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/tasks
router.get('/', async (req, res) => {
  try {
    const { status, priority, sort, search } = req.query;
    const query = { userId: req.user.id };

    if (status === 'pending') query.completed = false;
    if (status === 'completed') query.completed = true;
    if (priority && priority !== 'all') query.priority = priority;
    if (search) query.title = { $regex: search, $options: 'i' };

    let tasks = await Task.find(query);

    if (sort === 'priority') {
      const order = { high: 3, medium: 2, low: 1 };
      tasks.sort((a, b) => order[b.priority] - order[a.priority]);
    } else if (sort === 'dueDate') {
      tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else {
      tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch {
    res.status(500).json({ error: 'Invalid task ID' });
  }
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: new Date() };
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updates,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch {
    res.status(500).json({ error: 'Invalid task ID' });
  }
});

module.exports = router;
