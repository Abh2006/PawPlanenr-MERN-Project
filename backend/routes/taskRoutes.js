const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const protect = require('../middleware/authMiddleware')

// Add task
router.post('/', protect, async (req, res) => {
  const { dogId, title, description, category, dueDate } = req.body
  try {
    const task = await Task.create({ dogId, userId: req.user.id, title, description, category, dueDate })
    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get all tasks for user
router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update task
router.put('/:id', protect, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete task
router.delete('/:id', protect, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Mark task complete
router.patch('/:id/complete', protect, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true })
    res.json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router