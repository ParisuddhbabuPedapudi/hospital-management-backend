const authResolvers = require('./auth');
const userResolvers = require('./user');
const appointmentResolvers = require('./appointment');
const medicalRecordResolvers = require('./medicalRecord');
const departmentResolvers = require('./department');
const dashboardResolvers = require('./dashboard');

const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...userResolvers.Query,
    ...appointmentResolvers.Query,
    ...medicalRecordResolvers.Query,
    ...departmentResolvers.Query,
    ...dashboardResolvers.Query
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...userResolvers.Mutation,
    ...appointmentResolvers.Mutation,
    ...medicalRecordResolvers.Mutation,
    ...departmentResolvers.Mutation,
    ...dashboardResolvers.Mutation
  }
};

module.exports = resolvers;
