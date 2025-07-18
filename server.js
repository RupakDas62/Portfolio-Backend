const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoute.js');
const certificationRoutes = require('./routes/certificationRoutes.js');
const projectRoutes = require("./routes/projectRoute");
const contactRoutes = require("./routes/contactRoute");

const { FRONTEND_URL } = require("./config/constants");

dotenv.config();
const app = express();

// ✅ Allow cookies & specific origin
const allowedOrigins = [
  "http://localhost:3000",
  "https://rupak-das-portfolio.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

require('dotenv').config(); // at the top

const cloudinary = require('cloudinary').v2;

console.log("⛅ Cloudinary ENV Check:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// console.log("JWT_SECRET:", process.env.JWT_SECRET);


// ✅ Mongo connection
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/certifications', certificationRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.use('/thumbnails', express.static('public/thumbnails'));
app.use('/certificates', express.static('public/certificates'));

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
