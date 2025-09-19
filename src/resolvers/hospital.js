const Hospital = require('../models/hospitals');

const hospitalResolvers = {
  Query: {
    hospitals: async () => {
      const hospitals = await Hospital.find();
      return hospitals;
    },
    hospital: async (_, { id }) => {
      const hos = await Hospital.findById(id);
      return hos;
    }
  },
  Mutation: {
    createHospital: async (_, { input }) => {
      const hospital = await Hospital.create(input);
      return hospital;
    },
    updateHospital: async (_, { id, input }) => {
      const updated = await Hospital.findByIdAndUpdate(id, input, { new: true, runValidators: true });
      return updated;
    },
    deleteHospital: async (_, { id }) => {
      const res = await Hospital.findByIdAndDelete(id);
      return !!res;
    },
    setHospitalStatus: async (_, { id, isActive }) => {
      const updated = await Hospital.findByIdAndUpdate(id, { isActive }, { new: true });
      return updated;
    }
  }
};

module.exports = hospitalResolvers; 