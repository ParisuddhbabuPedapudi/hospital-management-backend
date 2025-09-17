const Department = require('../models/Department');
const User = require('../models/User');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const departmentResolvers = {
  Query: {
    departments: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      return await Department.find({ isActive: true })
        .populate('head', 'profile firstName lastName email')
        .sort({ name: 1 });
    },

    department: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const department = await Department.findById(id)
        .populate('head', 'profile firstName lastName email');

      if (!department) {
        throw new Error('Department not found');
      }

      return department;
    }
  },

  Mutation: {
    createDepartment: async (_, { name, description }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'admin') {
        throw new ForbiddenError('Only admins can create departments');
      }

      const department = new Department({
        name,
        description
      });

      await department.save();

      return await Department.findById(department._id)
        .populate('head', 'profile firstName lastName email');
    },

    updateDepartment: async (_, { id, name, description }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'admin') {
        throw new ForbiddenError('Only admins can update departments');
      }

      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;

      const department = await Department.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      ).populate('head', 'profile firstName lastName email');

      if (!department) {
        throw new Error('Department not found');
      }

      return department;
    },

    deleteDepartment: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'admin') {
        throw new ForbiddenError('Only admins can delete departments');
      }

      const department = await Department.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      if (!department) {
        throw new Error('Department not found');
      }

      return true;
    }
  }
};

module.exports = departmentResolvers;
