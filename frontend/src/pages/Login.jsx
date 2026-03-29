import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/api'

function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await loginUser(form)
            localStorage.setItem('token', res.data.token)
            navigate('/dashboard')
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <p style={styles.sub}>Login to PawPlanner</p>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input style={styles.input} name="email" type="email" placeholder="Email" onChange={handleChange} required />
                    <input style={styles.input} name="password" type="password" placeholder="Password" onChange={handleChange} required />
                    <button style={styles.btn} type="submit">Login</button>
                </form>
                <p style={styles.bottom}>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

const styles = {
    container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' },
    title: { margin: '0 0 4px', color: '#2c3e50' },
    sub: { margin: '0 0 20px', color: '#888', fontSize: '14px' },
    input: { width: '100%', padding: '10px 12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
    btn: { width: '100%', padding: '12px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer' },
    error: { backgroundColor: '#fdecea', color: '#e74c3c', padding: '10px', borderRadius: '6px', marginBottom: '12px', fontSize: '13px' },
    bottom: { textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#555' }
}

export default Login