const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  dogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dog',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: ['Walking', 'Feeding', 'Grooming', 'Training', 'Vet Visit'],
    required: true
  },
  dueDate: { type: Date },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' }
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)