const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Patient is required']
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Doctor is required']
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  visitDate: {
    type: Date,
    required: [true, 'Visit date is required']
  },
  symptoms: [String],
  diagnosis: {
    type: String,
    required: [true, 'Diagnosis is required']
  },
  treatment: {
    type: String,
    required: [true, 'Treatment is required']
  },
  prescription: [{
    medication: String,
    dosage: String,
    frequency: String,
    duration: String,
    instructions: String
  }],
  vitalSigns: {
    bloodPressure: String,
    heartRate: Number,
    temperature: Number,
    weight: Number,
    height: Number,
    oxygenSaturation: Number
  },
  labResults: [{
    testName: String,
    result: String,
    normalRange: String,
    date: Date
  }],
  notes: String,
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDate: Date,
  attachments: [String] // File URLs
}, {
  timestamps: true
});

// Index for efficient queries
medicalRecordSchema.index({ patient: 1, visitDate: -1 });
medicalRecordSchema.index({ doctor: 1, visitDate: -1 });

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
