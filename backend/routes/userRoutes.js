const express = require("express");

const users = require("../data/users");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json(users);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json(user);
});

router.post("/", (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({
      message: "Name, email and role are required"
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    role
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

module.exports = router;