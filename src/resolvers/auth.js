const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AuthenticationError } = require('apollo-server-express');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

const authResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }
      return user;
    }
  },

  Mutation: {
    login: async (_, { input }) => {
      const { email, password } = input;

      // Find user by email
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      // Check if user is active
      if (!user.isActive) {
        throw new AuthenticationError('Account is deactivated');
      }

      // Verify password
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid credentials');
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate token
      const token = generateToken(user._id);

      return {
        token,
        user
      };
    },

    register: async (_, { input }) => {
      const { email, password, role, profile, doctorInfo, patientInfo } = input;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Validate role-specific information
      if (role === 'DOCTOR' && !doctorInfo) {
        throw new Error('Doctor information is required for doctor role');
      }

      if (role === 'PATIENT' && !patientInfo) {
        throw new Error('Patient information is required for patient role');
      }

      // Create user
      const user = new User({
        email,
        password,
        role,
        profile,
        doctorInfo: role === 'DOCTOR' ? doctorInfo : undefined,
        patientInfo: role === 'PATIENT' ? patientInfo : undefined
      });

      await user.save();

      // Generate token
      const token = generateToken(user._id);

      return {
        token,
        user
      };
    }
  }
};

module.exports = authResolvers;
