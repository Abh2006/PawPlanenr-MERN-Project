import React, { useEffect, useState } from 'react'
import { getTasks, addTask, updateTask, deleteTask, completeTask, getDog } from '../services/api'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [dog, setDog] = useState(null)
  const [filter, setFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({ title:'', description:'', category:'Walking', dueDate:'' })

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    const taskRes = await getTasks()
    setTasks(taskRes.data)
    const dogRes = await getDog()
    setDog(dogRes.data)
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editTask) {
        await updateTask(editTask._id, form)
        setMessage('Task updated!')
      } else {
        await addTask({ ...form, dogId: dog._id })
        setMessage('Task added!')
      }
      setForm({ title:'', description:'', category:'Walking', dueDate:'' })
      setShowForm(false)
      setEditTask(null)
      fetchAll()
    } catch (err) {
      setMessage('Something went wrong')
    }
  }

  const handleEdit = (task) => {
    setEditTask(task)
    setForm({ title:task.title, description:task.description, category:task.category, dueDate:task.dueDate?.slice(0,10) })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    await deleteTask(id)
    setMessage('Task deleted')
    fetchAll()
  }

  const handleComplete = async (id) => {
    await completeTask(id)
    setMessage('Task marked complete!')
    fetchAll()
  }

  const filtered = tasks.filter(t => {
    if (filter === 'all') return true
    return t.status === filter
  })

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Tasks</h2>
        {dog && <button style={styles.btn} onClick={() => { setShowForm(!showForm); setEditTask(null); setForm({ title:'', description:'', category:'Walking', dueDate:'' }) }}>
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>}
      </div>

      {!dog && <p style={styles.warn}>Please add a dog profile first before adding tasks.</p>}
      {message && <p style={styles.msg}>{message}</p>}

      {showForm && (
        <div style={styles.card}>
          <h3 style={{margin:'0 0 16px'}}>{editTask ? 'Edit Task' : 'New Task'}</h3>
          <form onSubmit={handleSubmit}>
            <input style={styles.input} name="title" placeholder="Task Title" value={form.title} onChange={handleChange} required />
            <input style={styles.input} name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            <select style={styles.input} name="category" value={form.category} onChange={handleChange}>
              <option>Walking</option>
              <option>Feeding</option>
              <option>Grooming</option>
              <option>Training</option>
              <option>Vet Visit</option>
            </select>
            <input style={styles.input} name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
            <button style={styles.btn} type="submit">{editTask ? 'Update Task' : 'Save Task'}</button>
          </form>
        </div>
      )}

      <div style={styles.filterRow}>
        {['all', 'pending', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{...styles.filterBtn, backgroundColor: filter === f ? '#2c3e50' : '#ddd', color: filter === f ? 'white' : '#333'}}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 && <p style={{color:'#888'}}>No tasks found.</p>}

      {filtered.map(task => (
        <div key={task._id} style={styles.taskCard}>
          <div style={styles.taskTop}>
            <div>
              <h4 style={styles.taskTitle}>{task.title}</h4>
              <p style={styles.taskSub}>{task.category} {task.dueDate && `· ${new Date(task.dueDate).toLocaleDateString()}`}</p>
              {task.description && <p style={styles.taskDesc}>{task.description}</p>}
            </div>
            <span style={{...styles.badge, backgroundColor: task.status === 'completed' ? '#2ecc71' : '#e67e22'}}>
              {task.status}
            </span>
          </div>
          <div style={styles.taskBtns}>
            {task.status === 'pending' && (
              <button style={{...styles.smallBtn, backgroundColor:'#2ecc71'}} onClick={() => handleComplete(task._id)}>Complete</button>
            )}
            <button style={{...styles.smallBtn, backgroundColor:'#3498db'}} onClick={() => handleEdit(task)}>Edit</button>
            <button style={{...styles.smallBtn, backgroundColor:'#e74c3c'}} onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  container: { padding:'24px', maxWidth:'800px', margin:'0 auto' },
  header: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' },
  title: { color:'#2c3e50', margin:0 },
  card: { backgroundColor:'white', padding:'24px', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', marginBottom:'20px' },
  input: { width:'100%', padding:'10px 12px', marginBottom:'12px', borderRadius:'8px', border:'1px solid #ddd', fontSize:'14px', boxSizing:'border-box' },
  btn: { padding:'10px 20px', backgroundColor:'#2c3e50', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px' },
  filterRow: { display:'flex', gap:'8px', marginBottom:'16px' },
  filterBtn: { padding:'6px 16px', border:'none', borderRadius:'20px', cursor:'pointer', fontSize:'13px' },
  taskCard: { backgroundColor:'white', padding:'16px 20px', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.06)', marginBottom:'12px' },
  taskTop: { display:'flex', justifyContent:'space-between', alignItems:'flex-start' },
  taskTitle: { margin:'0 0 4px', color:'#2c3e50' },
  taskSub: { margin:'0 0 4px', color:'#888', fontSize:'13px' },
  taskDesc: { margin:0, color:'#555', fontSize:'13px' },
  badge: { padding:'4px 10px', borderRadius:'20px', color:'white', fontSize:'12px', whiteSpace:'nowrap' },
  taskBtns: { display:'flex', gap:'8px', marginTop:'12px' },
  smallBtn: { padding:'5px 12px', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'12px' },
  msg: { backgroundColor:'#eafaf1', color:'#27ae60', padding:'10px', borderRadius:'6px', marginBottom:'12px' },
  warn: { backgroundColor:'#fef9e7', color:'#e67e22', padding:'10px', borderRadius:'6px', marginBottom:'12px' }
}

export default Tasks