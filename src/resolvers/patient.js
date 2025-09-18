const Patient = require('../models/patients');

const patientResolvers = {
  Query: {
    patients: async () => {
      const patients = await Patient.find().populate({ path: 'assaingnedDoctor' });
      return patients;
    },
  },
  Mutation: {
    createPatient: async (_, { input }) => {
      const patient = await Patient.create({
        firstName: input.firstName,
        lastName: input.lastName,
        phoneNumber: input.phoneNumber,
        email: input.email,
        age: input.age,
        gender: input.gender,
        address: input.address,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
        country: input.country,
        bloodGroup: input.bloodGroup,
        assaingnedDoctor: input.assaingnedDoctor,
        emergencyContact: input.emergencyContact
      });

      await patient.populate({ path: 'assaingnedDoctor' });
      return patient;
    },
    updatePatient: async (_, { id, input }) => {
      const updated = await Patient.findByIdAndUpdate(
        id,
        {
          $set: {
            ...(input.firstName !== undefined && { firstName: input.firstName }),
            ...(input.lastName !== undefined && { lastName: input.lastName }),
            ...(input.phoneNumber !== undefined && { phoneNumber: input.phoneNumber }),
            ...(input.email !== undefined && { email: input.email }),
            ...(input.age !== undefined && { age: input.age }),
            ...(input.gender !== undefined && { gender: input.gender }),
            ...(input.address !== undefined && { address: input.address }),
            ...(input.city !== undefined && { city: input.city }),
            ...(input.state !== undefined && { state: input.state }),
            ...(input.zipCode !== undefined && { zipCode: input.zipCode }),
            ...(input.country !== undefined && { country: input.country }),
            ...(input.bloodGroup !== undefined && { bloodGroup: input.bloodGroup }),
            ...(input.assaingnedDoctor !== undefined && { assaingnedDoctor: input.assaingnedDoctor }),
            ...(input.emergencyContact !== undefined && { emergencyContact: input.emergencyContact }),
          }
        },
        { new: true, runValidators: true }
      );

      if (!updated) return null;
      await updated.populate({ path: 'assaingnedDoctor' });
      return updated;
    },
    deletePatient: async (_, { id }) => {
      const res = await Patient.findByIdAndDelete(id);
      return !!res;
    },
    setPatientStatus: async (_, { id, isActive }) => {
          const updated = await Patient.findByIdAndUpdate(
            id,
            { isActive },
            { new: true }
          );
          if (!updated) return null;
          await updated.populate({ path: 'assaingnedDoctor' });
          return updated;
    }
  }
};

module.exports = patientResolvers;