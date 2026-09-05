# TaskFlow AI

TaskFlow AI is a project and task management platform developed as part of my Full Stack Development Internship at Innovation Hacks.

The project is being developed step by step. The frontend was created in Phase 1 and the REST API backend was developed in Phase 2.

---

## Current Progress

### Phase 1 — Developer Productivity Dashboard
- React.js frontend
- Dashboard
- Projects section
- Task list
- Task progress indicators
- Search and filtering
- Responsive design
- Loading and empty states
- Interactive task status
- Productivity chart

### Phase 2 — REST API
- Node.js
- Express.js
- RESTful API
- User management
- Project management
- Task management
- Input validation
- HTTP status codes
- Error handling
- Environment variables
- API documentation

### Phase 3 — Persistent Data Layer
Planned for the next phase.

### Phase 4 — AI-Powered Project & Task Management
Planned for a later phase.

---

# Technology Stack

## Frontend

- React.js
- Vite
- JavaScript
- CSS
- Lucide React

## Backend

- Node.js
- Express.js
- CORS
- dotenv

## API Testing

- Postman

## Version Control

- Git
- GitHub

---

# Project Structure

```text
taskflow-ai/
│
├── src/
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── backend/
│   │
│   ├── data/
│   │   ├── users.js
│   │   ├── projects.js
│   │   └── tasks.js
│   │
│   ├── middleware/
│   │   └── errorMiddleware.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── .env.example
│   ├── API-DOCUMENTATION.md
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── package.json
└── README.md