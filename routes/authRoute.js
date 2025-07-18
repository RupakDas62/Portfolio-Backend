const express  = require('express');
const {registerAdmin, login, logout } = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
