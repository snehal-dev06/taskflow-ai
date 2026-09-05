# TaskFlow AI API Documentation

Base URL:

http://localhost:5000

## Users

### Get all users

GET /api/users

Returns all users.

### Get user by ID

GET /api/users/:id

Example:

GET /api/users/1

### Create a user

POST /api/users

Request body:

{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "Developer"
}

## Projects

### Get all projects

GET /api/projects

### Get project by ID

GET /api/projects/:id

Example:

GET /api/projects/1

### Create a project

POST /api/projects

Request body:

{
  "name": "E-commerce Website",
  "description": "Online shopping platform",
  "status": "Active",
  "progress": 0,
  "ownerId": 1
}

## Tasks

### Get all tasks

GET /api/tasks

### Get task by ID

GET /api/tasks/:id

Example:

GET /api/tasks/1

### Create a task

POST /api/tasks

Request body:

{
  "title": "Create login page",
  "description": "Build the login page",
  "status": "Todo",
  "priority": "High",
  "projectId": 1,
  "assignedTo": 1,
  "dueDate": "2026-09-15"
}

### Update a task

PUT /api/tasks/:id

### Update task status

PATCH /api/tasks/:id/status

Request body:

{
  "status": "Done"
}

### Delete a task

DELETE /api/tasks/:id

## Common Status Codes

200 - Request successful

201 - Resource created

400 - Invalid request or missing data

404 - Resource not found

500 - Server error