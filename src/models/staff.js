const mongoose = require('mongoose');
const validator = require('validator');

const staffSchema = new mongoose.Schema({
  staffType: {
    type: String,
    enum: ['nurse', 'receptionist', 'lab technician', 'pharmacist', 'admin staff','surgical','physician','security','housekeeping'],
    required: [true, 'Staff type is required']
  },
  qualification: {
    type: String,
    trim: true
  },
  experiance: {
    type: Number,
    min: [0, 'Experience must be a non-negative number'],
    required: [true, 'Experience is required']
  },
  salary: {
    type: Number,
    min: [0, 'Salary must be a non-negative number'],
    required: [true, 'Salary is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Staff', staffSchema); 