const express  = require('express');
const {registerAdmin, login, logout, verify } = require('../controllers/authController.js');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', login);
router.post('/logout', logout);

router.get('/verify', verify);

module.exports = router;
