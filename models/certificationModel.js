const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true },
  year: { type: String, required: true },
  image: { type: String, required: true },
  pdf: { type: String, required: true },
});

module.exports = mongoose.model('Certification', certificationSchema);
