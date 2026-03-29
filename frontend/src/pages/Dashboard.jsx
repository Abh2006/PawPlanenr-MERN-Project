import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, getDog, getTasks } from '../services/api'

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [dog, setDog] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await getUser()
        setUser(userRes.data)
        const dogRes = await getDog()
        setDog(dogRes.data)
        const taskRes = await getTasks()
        setTasks(taskRes.data)
      } catch (err) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
    fetchData()
  }, [navigate])

  const completed = tasks.filter(t => t.status === 'completed').length
  const pending = tasks.filter(t => t.status === 'pending').length

  return (
    <div style={styles.container}>
      <h2 style={styles.welcome}>Welcome, {user?.name} 👋</h2>

      {dog ? (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>My Dog</h3>
          <p><b>Name:</b> {dog.name}</p>
          <p><b>Breed:</b> {dog.breed}</p>
          <p><b>Age:</b> {dog.age} years</p>
          <p><b>Gender:</b> {dog.gender}</p>
        </div>
      ) : (
        <div style={styles.card}>
          <p style={{color:'#888'}}>No dog profile yet.</p>
          <button style={styles.btn} onClick={() => navigate('/dog')}>Add Your Dog</button>
        </div>
      )}

      <div style={styles.statsRow}>
        <div style={{...styles.stat, backgroundColor:'#3498db'}}>
          <h3>{tasks.length}</h3>
          <p>Total Tasks</p>
        </div>
        <div style={{...styles.stat, backgroundColor:'#2ecc71'}}>
          <h3>{completed}</h3>
          <p>Completed</p>
        </div>
        <div style={{...styles.stat, backgroundColor:'#e67e22'}}>
          <h3>{pending}</h3>
          <p>Pending</p>
        </div>
      </div>

      <div style={styles.btnRow}>
        <button style={styles.btn} onClick={() => navigate('/dog')}>Manage Dog</button>
        <button style={styles.btn} onClick={() => navigate('/tasks')}>View Tasks</button>
      </div>
    </div>
  )
}

const styles = {
  container: { padding:'24px', maxWidth:'800px', margin:'0 auto' },
  welcome: { color:'#2c3e50', marginBottom:'20px' },
  card: { backgroundColor:'white', padding:'20px', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', marginBottom:'20px' },
  cardTitle: { margin:'0 0 12px', color:'#2c3e50' },
  statsRow: { display:'flex', gap:'16px', marginBottom:'20px' },
  stat: { flex:1, padding:'20px', borderRadius:'12px', color:'white', textAlign:'center' },
  btnRow: { display:'flex', gap:'12px' },
  btn: { padding:'10px 20px', backgroundColor:'#2c3e50', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'14px' }
}

export default Dashboard