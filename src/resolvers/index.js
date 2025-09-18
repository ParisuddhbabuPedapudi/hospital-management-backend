const authResolvers = require('./auth');
const userResolvers = require('./user');
const doctorResolvers = require('./doctor');
const patientResolvers = require('./patient');

const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...doctorResolvers.Query,
    ...patientResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
    ...doctorResolvers.Mutation,
    ...patientResolvers.Mutation,
  },
  Doctor: {
    id: (parent) => (parent._id ? String(parent._id) : parent.id)
  },
  Patient: {
    id: (parent) => (parent._id ? String(parent._id) : parent.id)
  }
};

module.exports = resolvers;
