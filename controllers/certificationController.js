const Certification = require('../models/certificationModel');
const path = require('path');

// POST /api/certifications/add
const addCertification = async (req, res) => {
  try {
    const { title, platform, year } = req.body;

    if (!title || !platform || !year || !req.files?.image || !req.files?.pdf) {
      return res.status(400).json({ error: "All fields including files are required" });
    }

    const imageUrl = req.files.image[0].path; // Cloudinary URL
    const pdfUrl = req.files.pdf[0].path;     // Cloudinary URL

    const newCert = new Certification({
      title,
      platform,
      year,
      image: imageUrl,
      pdf: pdfUrl,
    });

    await newCert.save();

    res.status(201).json({ message: "Certification uploaded", certification: newCert });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
// GET /api/certifications
const getCertifications = async (req, res) => {
    try {
        const certs = await Certification.find();
        res.status(200).json(certs);
    } catch (error) {
        console.error('Error fetching certifications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addCertification,
    getCertifications,
};
