const Project = require("../models/Project");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Add new project (optional)
exports.addProject = async (req, res) => {
  try {
    const { title, description, tech, github, demo, sampleVideo } = req.body;
    if (!title || !description || !tech || !github) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const newProject = new Project({
      title,
      description,
      tech,
      github,
      demo: demo || "#",
      sampleVideo,
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error("Error adding project:", err);
    res.status(500).json({ error: "Server error" });
  }
};
