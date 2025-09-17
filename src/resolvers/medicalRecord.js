const MedicalRecord = require('../models/MedicalRecord');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const medicalRecordResolvers = {
  Query: {
    medicalRecords: async (_, { patientId }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      // Check permissions
      if (user.role === 'patient' && user._id.toString() !== patientId) {
        throw new ForbiddenError('Patients can only view their own medical records');
      }

      if (user.role === 'doctor' && user._id.toString() !== patientId) {
        // Doctors can view records of patients they've treated
        const hasTreatedPatient = await MedicalRecord.findOne({
          patient: patientId,
          doctor: user._id
        });

        if (!hasTreatedPatient) {
          throw new ForbiddenError('You can only view medical records of patients you have treated');
        }
      }

      return await MedicalRecord.find({ patient: patientId })
        .populate('patient', 'profile firstName lastName email')
        .populate('doctor', 'profile firstName lastName email doctorInfo')
        .populate('appointment')
        .sort({ visitDate: -1 });
    },

    medicalRecord: async (_, { id }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const medicalRecord = await MedicalRecord.findById(id)
        .populate('patient', 'profile firstName lastName email')
        .populate('doctor', 'profile firstName lastName email doctorInfo')
        .populate('appointment');

      if (!medicalRecord) {
        throw new Error('Medical record not found');
      }

      // Check permissions
      if (user.role === 'patient' && 
          medicalRecord.patient._id.toString() !== user._id.toString()) {
        throw new ForbiddenError('You can only view your own medical records');
      }

      if (user.role === 'doctor' && 
          medicalRecord.doctor._id.toString() !== user._id.toString()) {
        throw new ForbiddenError('You can only view medical records you created');
      }

      return medicalRecord;
    }
  },

  Mutation: {
    createMedicalRecord: async (_, { input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      if (user.role !== 'doctor' && user.role !== 'admin') {
        throw new ForbiddenError('Only doctors can create medical records');
      }

      const { patientId, appointmentId, visitDate, symptoms, diagnosis, treatment, prescription, vitalSigns, labResults, notes, followUpRequired, followUpDate } = input;

      // Validate patient exists
      const patient = await User.findOne({ _id: patientId, role: 'patient', isActive: true });
      if (!patient) {
        throw new Error('Patient not found or inactive');
      }

      // Validate appointment if provided
      if (appointmentId) {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
          throw new Error('Appointment not found');
        }

        if (appointment.patient._id.toString() !== patientId) {
          throw new Error('Appointment does not belong to the specified patient');
        }
      }

      const medicalRecord = new MedicalRecord({
        patient: patientId,
        doctor: user._id,
        appointment: appointmentId,
        visitDate: new Date(visitDate),
        symptoms,
        diagnosis,
        treatment,
        prescription,
        vitalSigns,
        labResults,
        notes,
        followUpRequired: followUpRequired || false,
        followUpDate: followUpDate ? new Date(followUpDate) : undefined
      });

      await medicalRecord.save();

      return await MedicalRecord.findById(medicalRecord._id)
        .populate('patient', 'profile firstName lastName email')
        .populate('doctor', 'profile firstName lastName email doctorInfo')
        .populate('appointment');
    },

    updateMedicalRecord: async (_, { id, input }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in');
      }

      const medicalRecord = await MedicalRecord.findById(id);
      if (!medicalRecord) {
        throw new Error('Medical record not found');
      }

      // Check permissions
      if (user.role !== 'admin' && 
          medicalRecord.doctor._id.toString() !== user._id.toString()) {
        throw new ForbiddenError('Only the doctor who created the record or admin can update it');
      }

      const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(
        id,
        input,
        { new: true, runValidators: true }
      ).populate('patient', 'profile firstName lastName email')
       .populate('doctor', 'profile firstName lastName email doctorInfo')
       .populate('appointment');

      return updatedMedicalRecord;
    }
  }
};

module.exports = medicalRecordResolvers;
