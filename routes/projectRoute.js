const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

// GET /api/projects - list all projects
router.get("/", projectController.getAllProjects);

// POST /api/projects - add new project (optional)
router.post("/", projectController.addProject);

module.exports = router;
