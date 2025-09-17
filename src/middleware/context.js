const jwt = require('jsonwebtoken');
const User = require('../models/User');

const context = async ({ req }) => {
  let user = null;

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.userId).select('-password');
    }
  } catch (error) {
    // Token is invalid, but we don't throw here
    // Let individual resolvers handle authentication
    console.log('Invalid token:', error.message);
  }

  return {
    user,
    req
  };
};

module.exports = context;
