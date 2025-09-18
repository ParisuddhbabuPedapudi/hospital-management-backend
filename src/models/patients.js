const mongoose = require('mongoose');
const validator = require('validator');

const patientSchema = new mongoose.Schema({
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
  age: {
    type: Number,
    min: [0, 'Age must be a non-negative number'],
    required: [true, 'Age is required'],
    default: 0
  },
  gender: {
    type: String,
    enum:['male', 'female', 'transgender'],
    required: [true,'gender is required'],
    default: 'male'
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  address: {
    type: String,
    trim: true,
    required: [true, 'Address is required']
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'City is required']
  },
  state: {
    type: String,
    trim: true,
    required: [true, 'State is required']
  },
  zipCode: {
    type: String,
    trim: true,
    required: [true, 'Zip code is required']
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'Country is required']
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: [true, 'Blood group is required']
  },
  assaingnedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Assigned doctor is required']
  },
  emergencyContact: {
    name: {
      type: String,
      trim: true,
      required: [true, 'Emergency contact name is required']
    },
    relationship: {
      type: String,
      trim: true,
      required: [true, 'Emergency contact relationship is required']
    },
    emergencyContact: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || validator.isMobilePhone(v);
        },
        message: 'Please provide a valid phone number for emergency contact'
      },
      trim: true,
      required: [true, 'Emergency contact phone number is required']
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema); 