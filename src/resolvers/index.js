const authResolvers = require('./auth');
const userResolvers = require('./user');
const doctorResolvers = require('./doctor');

const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...doctorResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
    ...doctorResolvers.Mutation,
  }
};

module.exports = resolvers;
