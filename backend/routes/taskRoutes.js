const express = require("express");

const tasks = require("../data/tasks");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(tasks);
});

router.get("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(task);
});

router.post("/", (req, res) => {
  const {
    title,
    description,
    status,
    priority,
    projectId,
    assignedTo,
    dueDate
  } = req.body;

  if (
    !title ||
    !description ||
    !status ||
    !priority ||
    !projectId ||
    !assignedTo ||
    !dueDate
  ) {
    return res.status(400).json({
      message:
        "Title, description, status, priority, projectId, assignedTo and dueDate are required"
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status,
    priority,
    projectId,
    assignedTo,
    dueDate
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

router.put("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const {
    title,
    description,
    status,
    priority,
    projectId,
    assignedTo,
    dueDate
  } = req.body;

  if (
    !title ||
    !description ||
    !status ||
    !priority ||
    !projectId ||
    !assignedTo ||
    !dueDate
  ) {
    return res.status(400).json({
      message:
        "Title, description, status, priority, projectId, assignedTo and dueDate are required"
    });
  }

  task.title = title;
  task.description = description;
  task.status = status;
  task.priority = priority;
  task.projectId = projectId;
  task.assignedTo = assignedTo;
  task.dueDate = dueDate;

  res.json(task);
});

router.patch("/:id/status", (req, res) => {
  const taskId = parseInt(req.params.id);

  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "Status is required"
    });
  }

  task.status = status;

  res.json(task);
});

router.delete("/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  const taskIndex = tasks.findIndex((item) => item.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.json({
    message: "Task deleted successfully",
    task: deletedTask[0]
  });
});

module.exports = router;