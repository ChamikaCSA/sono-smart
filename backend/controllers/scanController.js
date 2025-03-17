const ScanResult = require('../models/ScanResult');
const User = require('../models/User');

// @desc    Save scan result
// @route   POST /api/scan/results
// @access  Private
const saveScanResult = async (req, res) => {
  try {
    const { scanSections, totalScans, correctScans, startTime, endTime } = req.body;

    // Calculate accuracy
    const accuracy = (correctScans / totalScans) * 100;

    // Calculate session duration in seconds
    const startTimeDate = new Date(startTime);
    const endTimeDate = new Date(endTime);
    const sessionDuration = Math.round((endTimeDate - startTimeDate) / 1000);

    // Create scan result
    const scanResult = await ScanResult.create({
      user: req.user.id,
      scanSections,
      totalScans,
      correctScans,
      accuracy,
      startTime: startTimeDate,
      endTime: endTimeDate,
      sessionDuration
    });

    res.status(201).json({
      success: true,
      data: scanResult
    });
  } catch (error) {
    console.error('Error saving scan result:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving scan result',
      error: error.message
    });
  }
};

// @desc    Get all scan results for a user
// @route   GET /api/scan/results
// @access  Private
const getScanResults = async (req, res) => {
  try {
    const scanResults = await ScanResult.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: scanResults.length,
      data: scanResults
    });
  } catch (error) {
    console.error('Error fetching scan results:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching scan results',
      error: error.message
    });
  }
};

// @desc    Get single scan result
// @route   GET /api/scan/results/:id
// @access  Private
const getScanResult = async (req, res) => {
  try {
    const scanResult = await ScanResult.findById(req.params.id);

    if (!scanResult) {
      return res.status(404).json({
        success: false,
        message: 'Scan result not found'
      });
    }

    // Make sure user owns the scan result
    if (scanResult.user.toString() !== req.user.id && req.user.role !== 'professional') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this scan result'
      });
    }

    res.status(200).json({
      success: true,
      data: scanResult
    });
  } catch (error) {
    console.error('Error fetching scan result:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching scan result',
      error: error.message
    });
  }
};

module.exports = {
  saveScanResult,
  getScanResults,
  getScanResult
};