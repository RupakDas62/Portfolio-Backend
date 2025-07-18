const Admin = require('../models/Admin.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// controllers/authController.js




const login = async (req, res) => {
  const { email, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET;
  // console.log("JWT_SECRET:", process.env.JWT_SECRET);
  try {
    const admin = await Admin.findOne({ email });
    console.log(admin)
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email, isAdmin: true },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Set cookie (optional)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,           // ✅ Always true for HTTPS (Render uses HTTPS)
      sameSite: "None",       // ✅ Must be "None" for cross-origin
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ Response
    res.status(200).json({
      message: "Login successful",
      token,
      isAdmin: true,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        _id: newAdmin._id,
        email: newAdmin.email,
        role: newAdmin.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/", // ← This is important
  });

  res.status(200).json({ message: "Logged out successfully" });
};

const verify = (req, res) => {
  const token = req.cookies.token;
  // console.log(token)
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ success: true, admin: decoded.admin });
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};


module.exports = { registerAdmin, login, logout, verify };
