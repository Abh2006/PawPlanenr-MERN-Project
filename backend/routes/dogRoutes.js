const express = require('express')
const router = express.Router()
const Dog = require('../models/Dog')
const protect = require('../middleware/authMiddleware')

// Add dog
router.post('/', protect, async (req, res) => {
  const { name, breed, age, weight, gender } = req.body
  try {
    const dog = await Dog.create({ userId: req.user.id, name, breed, age, weight, gender })
    res.status(201).json(dog)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get user's dog
router.get('/', protect, async (req, res) => {
  try {
    const dog = await Dog.findOne({ userId: req.user.id })
    res.json(dog)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update dog
router.put('/:id', protect, async (req, res) => {
  try {
    const dog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(dog)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete dog
router.delete('/:id', protect, async (req, res) => {
  try {
    await Dog.findByIdAndDelete(req.params.id)
    res.json({ message: 'Dog deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router