const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "portfolio_certifications";

    return {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "pdf"],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
