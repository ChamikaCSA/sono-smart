const express = require('express');
const router = express.Router();
const { saveScanResult, getScanResults, getScanResult } = require('../controllers/scanController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.post('/results', protect, saveScanResult);
router.get('/results', protect, getScanResults);
router.get('/results/:id', protect, getScanResult);

module.exports = router;