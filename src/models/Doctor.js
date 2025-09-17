const mongoose = require('mongoose');
const validator = require('validator');

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
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
  experiance: {
    type: Number,
    min: [0, 'Experiance must be a non-negative number'],
    required: [true, 'Experiance is required']
  },
  age: {
    type: Number,
    min: [0, 'Age must be a non-negative number'],
    required: [true, 'Age is required'],
    default: 0
  },
  gender: {
    type: String,
    enum:['male', 'female', 'transhender'],
    required: [true,'gender is required'],
    default: 'male'
  },
  specialization: {
    type: String,
    trim: true
  },
  qualification: {
    type: String,
    trim: true
  },
  isSurgeon: {
    type: Boolean,
    default: false
  },
  shifttiming: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema); 