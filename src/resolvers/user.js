const User = require('../models/User');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const userResolvers = {
  Mutation: {
    updateProfile: async (_, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const update = { profile: {
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        dateOfBirth: input.dateOfBirth,
        department: input.department
      }};

      // Allow role update only for admins
      if (input.role) {
        if (user.role !== 'admin') {
          throw new ForbiddenError('Only admins can change role');
        }
        update.role = input.role;
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        update,
        { new: true, runValidators: true }
      );

      return updatedUser;
    }
  }
};

module.exports = userResolvers;
