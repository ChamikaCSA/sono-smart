const PatientReport = require('../models/PatientReport');
const Patient = require('../models/Patient');

// @desc    Save patient report
// @route   POST /api/reports
// @access  Private
const savePatientReport = async (req, res) => {
  try {
    const { patient, scanImages, reportText, diagnosticName, instructions, conditionDetails, additionalNotes } = req.body;

    // Create patient report
    const patientReport = await PatientReport.create({
      user: req.user.id,
      patient,
      scanImages,
      reportText,
      diagnosticName,
      instructions,
      conditionDetails,
      additionalNotes
    });

    res.status(201).json({
      success: true,
      data: patientReport
    });
  } catch (error) {
    console.error('Error saving patient report:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving patient report',
      error: error.message
    });
  }
};

// @desc    Get all patient reports for a user
// @route   GET /api/reports
// @access  Private
const getPatientReports = async (req, res) => {
  try {
    const patientReports = await PatientReport.find({ user: req.user.id })
      .populate('patient', 'firstName lastName dateOfBirth gender')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: patientReports.length,
      data: patientReports
    });
  } catch (error) {
    console.error('Error fetching patient reports:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching patient reports',
      error: error.message
    });
  }
};

// @desc    Get single patient report
// @route   GET /api/reports/:id
// @access  Private
const getPatientReport = async (req, res) => {
  try {
    const patientReport = await PatientReport.findById(req.params.id)
      .populate('patient', 'firstName lastName dateOfBirth gender email phone address');

    if (!patientReport) {
      return res.status(404).json({
        success: false,
        message: 'Patient report not found'
      });
    }

    // Make sure user owns the patient report
    if (patientReport.user.toString() !== req.user.id && req.user.role !== 'professional') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this patient report'
      });
    }

    res.status(200).json({
      success: true,
      data: patientReport
    });
  } catch (error) {
    console.error('Error fetching patient report:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching patient report',
      error: error.message
    });
  }
};

module.exports = {
  savePatientReport,
  getPatientReports,
  getPatientReport
};