const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tech: [{ type: String, required: true }],
  github: { type: String, required: true },
  demo: { type: String, default: "#" },
  sampleVideo: { type: String },
});

module.exports = mongoose.model("Project", projectSchema);
