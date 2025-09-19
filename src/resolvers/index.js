const authResolvers = require('./auth');
const userResolvers = require('./user');
const doctorResolvers = require('./doctor');
const patientResolvers = require('./patient');
const hospitalResolvers = require('./hospital');
const staffResolvers = require('./staff');

const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...doctorResolvers.Query,
    ...patientResolvers.Query,
    ...hospitalResolvers.Query,
    ...staffResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
    ...doctorResolvers.Mutation,
    ...hospitalResolvers.Mutation,
    ...staffResolvers.Mutation,
  },
  Doctor: {
    id: (parent) => (parent._id ? String(parent._id) : parent.id)
  },
  Patient: {
    id: (parent) => (parent._id ? String(parent._id) : parent.id)
  },
  Hospital: {
    id: (parent) => (parent._id ? String(parent._id) : parent.id)
  },
  Staff: {
    id: (parent) => (parent._id ? String(parent._id) : parent.id)
  }
};

module.exports = resolvers;
