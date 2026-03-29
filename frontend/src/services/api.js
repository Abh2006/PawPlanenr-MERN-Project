import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
})

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token')
    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }
    return req
})

// Auth
export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const getUser = () => API.get('/auth/user')

// Dog
export const addDog = (data) => API.post('/dog', data)
export const getDog = () => API.get('/dog')
export const updateDog = (id, data) => API.put(`/dog/${id}`, data)
export const deleteDog = (id) => API.delete(`/dog/${id}`)

// Tasks
export const addTask = (data) => API.post('/tasks', data)
export const getTasks = () => API.get('/tasks')
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data)
export const deleteTask = (id) => API.delete(`/tasks/${id}`)
export const completeTask = (id) => API.patch(`/tasks/${id}/complete`)