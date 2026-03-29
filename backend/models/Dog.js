const mongoose = require('mongoose')

const dogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number },
  gender: { type: String, enum: ['Male', 'Female'] }
}, { timestamps: true })

module.exports = mongoose.model('Dog', dogSchema)