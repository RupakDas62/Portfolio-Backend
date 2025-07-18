const express = require('express');
const router = express.Router();
const { addCertification, getCertifications } = require('../controllers/certificationController');
const upload = require('../middlewares/upload');

router.post(
  '/add',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf', maxCount: 1 },
  ]),
  addCertification
);

router.get('/', getCertifications);

module.exports = router;
