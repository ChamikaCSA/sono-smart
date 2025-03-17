const mongoose = require('mongoose');

const PatientReportSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient ID is required']
  },
  scanImages: [
    {
      imageUrl: {
        type: String,
        required: [true, 'Image URL is required']
      },
      organ: {
        type: String,
        required: [true, 'Organ name is required']
      },
      findings: {
        type: String,
        required: [true, 'Findings are required']
      }
    }
  ],
  reportText: {
    type: String,
    required: [true, 'Report text is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PatientReport', PatientReportSchema);