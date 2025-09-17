const Doctor = require('../models/Doctor');

const doctorResolvers = {
  Query: {
    doctors: async () => {
      const doctors = await Doctor.find();
      return doctors;
    }
  },
  Mutation: {
    createDoctor: async (_, { input }) => {
      const doctor = await Doctor.create({
        firstName: input.firstName,
        lastName: input.lastName,
        phoneNumber: input.phoneNumber,
        experiance: input.experiance,
        specialization: input.specialization,
        qualification: input.qualification,
        isSurgeon: input.isSurgeon,
        shifttiming: input.shifttiming,
        email: input.email
      });
      return doctor;
    }
  }
};

module.exports = doctorResolvers; 