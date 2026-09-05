const express = require("express");

const projects = require("../data/projects");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(projects);
});

router.get("/:id", (req, res) => {
  const projectId = parseInt(req.params.id);

  const project = projects.find((item) => item.id === projectId);

  if (!project) {
    return res.status(404).json({
      message: "Project not found"
    });
  }

  res.json(project);
});

router.post("/", (req, res) => {
  const { name, description, status, progress, ownerId } = req.body;

  if (!name || !description || !status || progress === undefined || !ownerId) {
    return res.status(400).json({
      message: "Name, description, status, progress and ownerId are required"
    });
  }

  const newProject = {
    id: projects.length + 1,
    name,
    description,
    status,
    progress,
    ownerId
  };

  projects.push(newProject);

  res.status(201).json(newProject);
});

module.exports = router; 

