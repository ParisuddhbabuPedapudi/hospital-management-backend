const User = require('../models/User');
const Appointment = require('../models/Appointment');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const dashboardResolvers = {
  Query: {
    dashboardStats: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'admin') {
        throw new ForbiddenError('Only admins can view dashboard statistics');
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endOfToday = new Date(today);
      endOfToday.setHours(23, 59, 59, 999);

      const [
        totalPatients,
        totalDoctors,
        totalAppointments,
        todayAppointments,
        pendingAppointments,
        completedAppointments,
        revenueData
      ] = await Promise.all([
        User.countDocuments({ role: 'patient', isActive: true }),
        User.countDocuments({ role: 'doctor', isActive: true }),
        Appointment.countDocuments(),
        Appointment.countDocuments({
          appointmentDate: { $gte: today, $lte: endOfToday }
        }),
        Appointment.countDocuments({ status: 'scheduled' }),
        Appointment.countDocuments({ status: 'completed' }),
        Appointment.aggregate([
          { $match: { status: 'completed' } },
          { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
        ])
      ]);

      const revenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

      return {
        totalPatients,
        totalDoctors,
        totalAppointments,
        todayAppointments,
        pendingAppointments,
        completedAppointments,
        revenue
      };
    }
  }
};

module.exports = dashboardResolvers;
