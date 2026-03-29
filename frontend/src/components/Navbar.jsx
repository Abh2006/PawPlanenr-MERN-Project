import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav style={styles.nav}>
            <span style={styles.logo}>PawPlanner</span>
            <div style={styles.links}>
                <Link to="/dashboard" style={styles.link}>Dashboard</Link>
                <Link to="/dog" style={styles.link}>My Dog</Link>
                <Link to="/tasks" style={styles.link}>Tasks</Link>
                <button onClick={logout} style={styles.btn}>Logout</button>
            </div>
        </nav>
    )
}

const styles = {
    nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', backgroundColor: '#2c3e50', color: 'white' },
    logo: { fontSize: '20px', fontWeight: 'bold', color: 'white' },
    links: { display: 'flex', gap: '16px', alignItems: 'center' },
    link: { color: 'white', textDecoration: 'none', fontSize: '14px' },
    btn: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }
}

export default Navbar