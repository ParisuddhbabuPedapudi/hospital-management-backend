const Doctor = require('../models/Doctor');

const doctorResolvers = {
  Query: {
    doctors: async () => {
      const doctors = await Doctor.find();
      return doctors;
    },
    doctor: async (_, { id }) => {
      const doc = await Doctor.findById(id);
      return doc;
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
        email: input.email,
        age: input.age,
        gender: input.gender
      });
      return doctor;
    },
    updateDoctor: async (_, { id, input }) => {
      const updated = await Doctor.findByIdAndUpdate(
        id,
        {
          $set: {
            ...(input.firstName !== undefined && { firstName: input.firstName }),
            ...(input.lastName !== undefined && { lastName: input.lastName }),
            ...(input.phoneNumber !== undefined && { phoneNumber: input.phoneNumber }),
            ...(input.experiance !== undefined && { experiance: input.experiance }),
            ...(input.specialization !== undefined && { specialization: input.specialization }),
            ...(input.qualification !== undefined && { qualification: input.qualification }),
            ...(input.isSurgeon !== undefined && { isSurgeon: input.isSurgeon }),
            ...(input.shifttiming !== undefined && { shifttiming: input.shifttiming }),
            ...(input.email !== undefined && { email: input.email }),
            ...(input.age !== undefined && { age: input.age }),
            ...(input.gender !== undefined && { gender: input.gender }),
          }
        },
        { new: true, runValidators: true }
      );
      return updated;
    },
    deleteDoctor: async (_, { id }) => {
      const res = await Doctor.findByIdAndDelete(id);
      return !!res;
    },
    setDoctorStatus: async (_, { id, isActive }) => {
      const updated = await Doctor.findByIdAndUpdate(
        id,
        { isActive },
        { new: true }
      );
      return updated;
    }
  }
};

module.exports = doctorResolvers; 