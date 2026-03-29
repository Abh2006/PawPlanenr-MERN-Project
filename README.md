# PawPlanner 🐾
### Dog Daily Routine Management System
#### Built with the MERN Stack

---

## What is PawPlanner?

PawPlanner is a web application designed to help dog owners manage their dog's daily routine. Dog owners often forget to track important activities like feeding, walking, grooming, or vet visits. PawPlanner solves this by giving owners one simple place to organize and monitor everything related to their dog's care.

---

## Live Demo

- **Website:** https://paw-planenr-mern-project.vercel.app
- **GitHub:** https://github.com/Abh2006/PawPlanenr-MERN-Project

---

## What Can You Do in PawPlanner?

### Account
- Create a personal account with your name, email, and password
- Log in securely — your password is encrypted and never stored as plain text
- Your data is private and only visible to you

### My Dog
- Add your dog's profile with their name, breed, age, weight, and gender
- Edit your dog's profile anytime
- Delete the profile if needed

### Tasks
- Add daily activities for your dog such as:
  - Morning walk
  - Feeding time
  - Grooming session
  - Training practice
  - Vet visit
- Each task has a title, description, category, and due date
- Every task starts as **Pending**
- Mark tasks as **Complete** when done
- Edit or delete any task
- Filter tasks by: **All**, **Pending**, or **Completed**

### Dashboard
- See your dog's profile at a glance
- View a live summary showing:
  - Total number of tasks
  - How many are completed
  - How many are still pending
- Quick buttons to navigate to Dog Profile and Tasks

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React.js | User interface |
| Backend | Node.js + Express.js | Server and API |
| Database | MongoDB Atlas | Cloud data storage |
| Auth | JWT (JSON Web Tokens) | Secure login system |
| Styling | Inline CSS | Component styling |
| HTTP Client | Axios | API calls from frontend |
| Routing | React Router DOM | Page navigation |
| Password Encryption | bcryptjs | Secure password hashing |

---

## Project Structure

```
PawPlanner/
│
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Dog.js             # Dog schema
│   │   └── Task.js            # Task schema
│   ├── routes/
│   │   ├── authRoutes.js      # Register, Login, Get User
│   │   ├── dogRoutes.js       # Dog CRUD
│   │   └── taskRoutes.js      # Task CRUD
│   ├── .env                   # Environment variables (secret)
│   └── server.js              # App entry point
│
└── frontend/
    └── src/
        ├── pages/
        │   ├── Register.jsx   # Registration page
        │   ├── Login.jsx      # Login page
        │   ├── Dashboard.jsx  # Main dashboard
        │   ├── DogProfile.jsx # Dog management
        │   └── Tasks.jsx      # Task management
        ├── components/
        │   ├── Navbar.jsx     # Navigation bar
        │   ├── TaskCard.jsx   # Task display card
        │   └── DogCard.jsx    # Dog display card
        ├── services/
        │   └── api.js         # All API calls
        └── App.js             # Routes and app setup
```

---

## API Routes

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Create new account |
| POST | /api/auth/login | Login and get token |
| GET | /api/auth/user | Get logged in user |

### Dog
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/dog | Add dog profile |
| GET | /api/dog | Get dog profile |
| PUT | /api/dog/:id | Update dog profile |
| DELETE | /api/dog/:id | Delete dog profile |

### Tasks
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/tasks | Add new task |
| GET | /api/tasks | Get all tasks |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| PATCH | /api/tasks/:id/complete | Mark task complete |

---

## How to Run Locally

### Requirements
- Node.js installed
- MongoDB Atlas account

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Then open http://localhost:3000 in your browser.

---

## Features Implemented

- ✅ User authentication with JWT
- ✅ Password hashing with bcrypt
- ✅ Protected routes (login required)
- ✅ Dog profile — Create, Read, Update, Delete
- ✅ Task management — Create, Read, Update, Delete
- ✅ Mark tasks as complete
- ✅ Filter tasks by status
- ✅ Live dashboard with task summary
- ✅ Cloud database with MongoDB Atlas
- ✅ Deployed live on Vercel + Render

---

## Future Improvements

Here are features that could be added in future versions:

- **Multiple dogs** — Allow one user to manage more than one dog
- **Reminders and notifications** — Send email or push notifications when a task is due
- **Recurring tasks** — Set tasks to repeat daily or weekly automatically
- **Photo upload** — Let users add a photo of their dog to their profile
- **Task history** — View a log of all completed tasks with timestamps
- **Vet records** — Store vaccination records and medical history
- **Mobile app** — Build a React Native version for iOS and Android
- **Calendar view** — See all tasks laid out on a calendar
- **Multiple users per dog** — Share dog care with family members
- **Progress charts** — Visual graphs showing task completion over time

---

## Developer

**Abhinoor Singh**
Web Development Assignment — MERN Stack Project
