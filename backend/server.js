const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const dogRoutes = require('./routes/dogRoutes')
const taskRoutes = require('./routes/taskRoutes')

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/dog', dogRoutes)
app.use('/api/tasks', taskRoutes)

app.get('/', (req, res) => {
  res.send('PawPlanner API is running!')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})