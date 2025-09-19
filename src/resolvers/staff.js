const Staff = require('../models/staff');

const staffResolvers = {
  Query: {
    staffList: async () => {
      const staff = await Staff.find();
      return staff;
    },
    staff: async (_, { id }) => {
      const stf = await Staff.findById(id);
      return stf;
    }
  },
  Mutation: {
    CreateStaffInput: async (_, { input }) => {
      const staff = await Staff.create(input);
      return staff;
    },
    UpdateStaffInput: async (_, { id, input }) => {
      const updated = await Staff.findByIdAndUpdate(
        id,
        input,
        { new: true, runValidators: true }
      );
      return updated;
    },
    deleteStaff: async (_, { id }) => {
      const res = await Staff.findByIdAndDelete(id);
      return !!res;
    },
    setStaffStatus: async (_, { id, isActive }) => {
      const updated = await Staff.findByIdAndUpdate(id, { isActive }, { new: true });
      return updated;
    }
  }
};

module.exports = staffResolvers;