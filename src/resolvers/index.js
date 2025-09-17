const authResolvers = require('./auth');
const userResolvers = require('./user');

const resolvers = {
  Query: {
    ...authResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
  }
};

module.exports = resolvers;
