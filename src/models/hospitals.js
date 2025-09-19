const mongoose = require('mongoose');
const validator = require('validator');

const hospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: [true, 'hospital name is required'],
    trim: true
  },
    address: {
    type: String,
    required: [true, 'address is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || validator.isMobilePhone(v);
      },
      message: 'Please provide a valid phone number'
    },
    trim: true,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  website: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || validator.isURL(v);
      },
      message: 'Please provide a valid URL'
    }
  },
  numberOfBeds: {
    type: Number,
    min: [0, 'Number of beds must be a non-negative number'],
    required: [true, 'Number of beds is required'],
    default: 0
  },
  establishedYear: {
    type: Number,
    min: [1800, 'Established year must be a valid year'],
    max: [new Date().getFullYear(), 'Established year cannot be in the future'],
    required: [true, 'Established year is required']
  },
  departments: [{
    type: String,
    trim: true
  }],   
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Hospital', hospitalSchema); 