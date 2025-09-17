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

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      if (!user.isActive) {
        throw new AuthenticationError('Account is deactivated');
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        throw new AuthenticationError('Invalid credentials');
      }

      user.lastLogin = new Date();
      await user.save();

      const token = generateToken(user._id);

      return { token, user };
    }
  }
};

module.exports = authResolvers;
