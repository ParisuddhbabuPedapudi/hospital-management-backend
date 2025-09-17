const User = require('../models/User');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const userResolvers = {
  Query: {
    users: async (_, { role }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'admin') {
        throw new ForbiddenError('Only admins can view all users');
      }

      const filter = role ? { role } : {};
      return await User.find(filter).sort({ createdAt: -1 });
    },

    user: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      // Users can only view their own profile unless they're admin
      if (user.role !== 'admin' && user._id.toString() !== id) {
        throw new ForbiddenError('You can only view your own profile');
      }

      return await User.findById(id);
    },

    doctors: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      return await User.find({ role: 'doctor', isActive: true }).sort({ 'profile.firstName': 1 });
    },

    patients: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'admin' && user.role !== 'doctor') {
        throw new ForbiddenError('Only admins and doctors can view patients');
      }

      return await User.find({ role: 'patient', isActive: true }).sort({ 'profile.firstName': 1 });
    }
  },

  Mutation: {
    updateProfile: async (_, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { profile: input },
        { new: true, runValidators: true }
      );

      return updatedUser;
    },

    updateDoctorInfo: async (_, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'doctor') {
        throw new ForbiddenError('Only doctors can update doctor information');
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { doctorInfo: input },
        { new: true, runValidators: true }
      );

      return updatedUser;
    },

    updatePatientInfo: async (_, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'patient') {
        throw new ForbiddenError('Only patients can update patient information');
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { patientInfo: input },
        { new: true, runValidators: true }
      );

      return updatedUser;
    },

    deactivateUser: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'admin') {
        throw new ForbiddenError('Only admins can deactivate users');
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    },

    activateUser: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'admin') {
        throw new ForbiddenError('Only admins can activate users');
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { isActive: true },
        { new: true }
      );

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return updatedUser;
    }
  }
};

module.exports = userResolvers;
