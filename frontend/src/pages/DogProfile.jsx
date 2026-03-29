import React, { useEffect, useState } from 'react'
import { getDog, addDog, updateDog, deleteDog } from '../services/api'

function DogProfile() {
  const [dog, setDog] = useState(null)
  const [form, setForm] = useState({ name:'', breed:'', age:'', weight:'', gender:'Male' })
  const [editing, setEditing] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => { fetchDog() }, [])

  const fetchDog = async () => {
    const res = await getDog()
    if (res.data) {
      setDog(res.data)
      setForm(res.data)
    }
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (dog) {
        await updateDog(dog._id, form)
        setMessage('Dog profile updated!')
      } else {
        await addDog(form)
        setMessage('Dog profile created!')
      }
      setEditing(false)
      fetchDog()
    } catch (err) {
      setMessage('Something went wrong')
    }
  }

  const handleDelete = async () => {
    await deleteDog(dog._id)
    setDog(null)
    setForm({ name:'', breed:'', age:'', weight:'', gender:'Male' })
    setMessage('Dog profile deleted')
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Dog Profile</h2>
      {message && <p style={styles.msg}>{message}</p>}

      {dog && !editing ? (
        <div style={styles.card}>
          <p><b>Name:</b> {dog.name}</p>
          <p><b>Breed:</b> {dog.breed}</p>
          <p><b>Age:</b> {dog.age} years</p>
          <p><b>Weight:</b> {dog.weight} kg</p>
          <p><b>Gender:</b> {dog.gender}</p>
          <div style={styles.btnRow}>
            <button style={styles.btn} onClick={() => setEditing(true)}>Edit</button>
            <button style={{...styles.btn, backgroundColor:'#e74c3c'}} onClick={handleDelete}>Delete</button>
          </div>
        </div>
      ) : (
        <div style={styles.card}>
          <form onSubmit={handleSubmit}>
            <input style={styles.input} name="name" placeholder="Dog Name" value={form.name} onChange={handleChange} required />
            <input style={styles.input} name="breed" placeholder="Breed" value={form.breed} onChange={handleChange} required />
            <input style={styles.input} name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} required />
            <input style={styles.input} name="weight" type="number" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} />
            <select style={styles.input} name="gender" value={form.gender} onChange={handleChange}>
              <option>Male</option>
              <option>Female</option>
            </select>
            <div style={styles.btnRow}>
              <button style={styles.btn} type="submit">{dog ? 'Update' : 'Save Dog'}</button>
              {dog && <button style={{...styles.btn, backgroundColor:'#888'}} type="button" onClick={() => setEditing(false)}>Cancel</button>}
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: { padding:'24px', maxWidth:'600px', margin:'0 auto' },
  title: { color:'#2c3e50' },
  card: { backgroundColor:'white', padding:'24px', borderRadius:'12px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
  input: { width:'100%', padding:'10px 12px', marginBottom:'12px', borderRadius:'8px', border:'1px solid #ddd', fontSize:'14px', boxSizing:'border-box' },
  btnRow: { display:'flex', gap:'10px' },
  btn: { padding:'10px 20px', backgroundColor:'#2c3e50', color:'white', border:'none', borderRadius:'8px', cursor:'pointer' },
  msg: { backgroundColor:'#eafaf1', color:'#27ae60', padding:'10px', borderRadius:'6px', marginBottom:'12px' }
}

export default DogProfile