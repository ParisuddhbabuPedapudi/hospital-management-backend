const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const appointmentResolvers = {
  Query: {
    appointments: async (_, { patientId, doctorId, status, date }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      let filter = {};

      // Role-based filtering
      if (user.role === 'patient') {
        filter.patient = user._id;
      } else if (user.role === 'doctor') {
        filter.doctor = user._id;
      }

      // Additional filters
      if (patientId) {
        if (user.role !== 'admin' && user.role !== 'doctor') {
          throw new ForbiddenError('Only admins and doctors can filter by patient');
        }
        filter.patient = patientId;
      }

      if (doctorId) {
        filter.doctor = doctorId;
      }

      if (status) {
        filter.status = status;
      }

      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        filter.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
      }

      return await Appointment.find(filter)
        .populate('patient', 'profile firstName lastName email')
        .populate('doctor', 'profile firstName lastName email doctorInfo')
        .sort({ appointmentDate: 1, appointmentTime: 1 });
    },

    appointment: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const appointment = await Appointment.findById(id)
        .populate('patient', 'profile firstName lastName email')
        .populate('doctor', 'profile firstName lastName email doctorInfo');

      if (!appointment) {
        throw new Error('Appointment not found');
      }

      // Check permissions
      if (user.role !== 'admin' && 
          appointment.patient._id.toString() !== user._id.toString() &&
          appointment.doctor._id.toString() !== user._id.toString()) {
        throw new ForbiddenError('You can only view your own appointments');
      }

      return appointment;
    },

    myAppointments: async (_, __, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      let filter = {};
      if (user.role === 'patient') {
        filter.patient = user._id;
      } else if (user.role === 'doctor') {
        filter.doctor = user._id;
      }

      return await Appointment.find(filter)
        .populate('patient', 'profile firstName lastName email')
        .populate('doctor', 'profile firstName lastName email doctorInfo')
        .sort({ appointmentDate: -1 });
    },

    doctorAppointments: async (_, { doctorId, date }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'admin' && user.role !== 'doctor') {
        throw new ForbiddenError('Only admins and doctors can view doctor appointments');
      }

      let filter = { doctor: doctorId };

      if (date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        filter.appointmentDate = { $gte: startOfDay, $lte: endOfDay };
      }

      return await Appointment.find(filter)
        .populate('patient', 'profile firstName lastName email')
        .populate('doctor', 'profile firstName lastName email doctorInfo')
        .sort({ appointmentTime: 1 });
    }
  },

  Mutation: {
    createAppointment: async (_, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const { patientId, doctorId, appointmentDate, appointmentTime, duration = 30, type, reason, notes, amount } = input;

      // Validate doctor exists
      const doctor = await User.findOne({ _id: doctorId, role: 'doctor', isActive: true });
      if (!doctor) {
        throw new Error('Doctor not found or inactive');
      }

      // Validate patient exists
      const patient = await User.findOne({ _id: patientId, role: 'patient', isActive: true });
      if (!patient) {
        throw new Error('Patient not found or inactive');
      }

      // Check for conflicting appointments
      const conflictingAppointment = await Appointment.findOne({
        doctor: doctorId,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        status: { $in: ['scheduled', 'confirmed'] }
      });

      if (conflictingAppointment) {
        throw new Error('Doctor has a conflicting appointment at this time');
      }

      const appointment = new Appointment({
        patient: patientId,
        doctor: doctorId,
        appointmentDate: new Date(appointmentDate),
        appointmentTime,
        duration,
        type,
        reason,
        notes,
        amount
      });

      await appointment.save();

      return await Appointment.findById(appointment._id)
        .populate('patient', 'profile firstName lastName email')
        .populate('doctor', 'profile firstName lastName email doctorInfo');
    },

    updateAppointment: async (_, { id, input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const appointment = await Appointment.findById(id);
      if (!appointment) {
        throw new Error('Appointment not found');
      }

      // Check permissions
      if (user.role !== 'admin' && 
          appointment.doctor._id.toString() !== user._id.toString()) {
        throw new ForbiddenError('Only the assigned doctor or admin can update appointments');
      }

      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        input,
        { new: true, runValidators: true }
      ).populate('patient', 'profile firstName lastName email')
       .populate('doctor', 'profile firstName lastName email doctorInfo');

      return updatedAppointment;
    },

    cancelAppointment: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const appointment = await Appointment.findById(id);
      if (!appointment) {
        throw new Error('Appointment not found');
      }

      // Check permissions
      if (user.role !== 'admin' && 
          appointment.patient._id.toString() !== user._id.toString() &&
          appointment.doctor._id.toString() !== user._id.toString()) {
        throw new ForbiddenError('You can only cancel your own appointments');
      }

      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status: 'cancelled' },
        { new: true }
      ).populate('patient', 'profile firstName lastName email')
       .populate('doctor', 'profile firstName lastName email doctorInfo');

      return updatedAppointment;
    },

    completeAppointment: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const appointment = await Appointment.findById(id);
      if (!appointment) {
        throw new Error('Appointment not found');
      }

      // Only the assigned doctor or admin can complete appointments
      if (user.role !== 'admin' && 
          appointment.doctor._id.toString() !== user._id.toString()) {
        throw new ForbiddenError('Only the assigned doctor can complete appointments');
      }

      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status: 'completed' },
        { new: true }
      ).populate('patient', 'profile firstName lastName email')
       .populate('doctor', 'profile firstName lastName email doctorInfo');

      return updatedAppointment;
    },

    updateAppointmentStatus: async (_, { id, status }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'admin' && user.role !== 'doctor') {
        throw new ForbiddenError('Only admins and doctors can update appointment status');
      }

      const appointment = await Appointment.findById(id);
      if (!appointment) {
        throw new Error('Appointment not found');
      }

      const updatedAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).populate('patient', 'profile firstName lastName email')
       .populate('doctor', 'profile firstName lastName email doctorInfo');

      return updatedAppointment;
    }
  }
};

module.exports = appointmentResolvers;
