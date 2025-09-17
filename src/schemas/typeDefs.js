const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    email: String!
    role: UserRole!
    profile: UserProfile!
    doctorInfo: DoctorInfo
    patientInfo: PatientInfo
    isActive: Boolean!
    lastLogin: Date
    createdAt: Date!
    updatedAt: Date!
  }

  type UserProfile {
    firstName: String!
    lastName: String!
    phone: String
    dateOfBirth: Date
    address: Address
  }

  type Address {
    street: String
    city: String
    state: String
    zipCode: String
    country: String
  }

  type DoctorInfo {
    licenseNumber: String
    specialization: String
    department: String
    experience: Int
    education: [String]
    consultationFee: Float
    availableSlots: [AvailableSlot]
  }

  type AvailableSlot {
    day: String!
    startTime: String!
    endTime: String!
  }

  type PatientInfo {
    medicalHistory: [String]
    allergies: [String]
    emergencyContact: EmergencyContact
    insuranceInfo: InsuranceInfo
  }

  type EmergencyContact {
    name: String
    phone: String
    relationship: String
  }

  type InsuranceInfo {
    provider: String
    policyNumber: String
  }

  type Appointment {
    id: ID!
    patient: User!
    doctor: User!
    appointmentDate: Date!
    appointmentTime: String!
    duration: Int!
    status: AppointmentStatus!
    type: AppointmentType!
    reason: String!
    notes: String
    prescription: String
    diagnosis: String
    followUpRequired: Boolean!
    followUpDate: Date
    paymentStatus: PaymentStatus!
    amount: Float!
    createdAt: Date!
    updatedAt: Date!
  }

  type Department {
    id: ID!
    name: String!
    description: String!
    head: User
    location: Location
    contactInfo: ContactInfo
    services: [String]
    isActive: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type Location {
    floor: String
    room: String
    building: String
  }

  type ContactInfo {
    phone: String
    email: String
  }

  type MedicalRecord {
    id: ID!
    patient: User!
    doctor: User!
    appointment: Appointment
    visitDate: Date!
    symptoms: [String]
    diagnosis: String!
    treatment: String!
    prescription: [Prescription]
    vitalSigns: VitalSigns
    labResults: [LabResult]
    notes: String
    followUpRequired: Boolean!
    followUpDate: Date
    attachments: [String]
    createdAt: Date!
    updatedAt: Date!
  }

  type Prescription {
    medication: String!
    dosage: String!
    frequency: String!
    duration: String!
    instructions: String
  }

  type VitalSigns {
    bloodPressure: String
    heartRate: Int
    temperature: Float
    weight: Float
    height: Float
    oxygenSaturation: Int
  }

  type LabResult {
    testName: String!
    result: String!
    normalRange: String!
    date: Date!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type DashboardStats {
    totalPatients: Int!
    totalDoctors: Int!
    totalAppointments: Int!
    todayAppointments: Int!
    pendingAppointments: Int!
    completedAppointments: Int!
    revenue: Float!
  }

  enum UserRole {
    admin
    doctor
    patient
  }

  enum AppointmentStatus {
    scheduled
    confirmed
    in_progress
    completed
    cancelled
    no_show
  }

  enum AppointmentType {
    consultation
    follow_up
    emergency
    routine_checkup
  }

  enum PaymentStatus {
    pending
    paid
    partial
    refunded
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    role: UserRole!
    profile: UserProfileInput!
    doctorInfo: DoctorInfoInput
    patientInfo: PatientInfoInput
  }

  input UserProfileInput {
    firstName: String!
    lastName: String!
    phone: String
    dateOfBirth: Date
    address: AddressInput
  }

  input AddressInput {
    street: String
    city: String
    state: String
    zipCode: String
    country: String
  }

  input DoctorInfoInput {
    licenseNumber: String
    specialization: String
    department: String
    experience: Int
    education: [String]
    consultationFee: Float
    availableSlots: [AvailableSlotInput]
  }

  input AvailableSlotInput {
    day: String!
    startTime: String!
    endTime: String!
  }

  input PatientInfoInput {
    medicalHistory: [String]
    allergies: [String]
    emergencyContact: EmergencyContactInput
    insuranceInfo: InsuranceInfoInput
  }

  input EmergencyContactInput {
    name: String
    phone: String
    relationship: String
  }

  input InsuranceInfoInput {
    provider: String
    policyNumber: String
  }

  input AppointmentInput {
    patientId: ID!
    doctorId: ID!
    appointmentDate: Date!
    appointmentTime: String!
    duration: Int
    type: AppointmentType!
    reason: String!
    notes: String
    amount: Float!
  }

  input MedicalRecordInput {
    patientId: ID!
    appointmentId: ID
    visitDate: Date!
    symptoms: [String]
    diagnosis: String!
    treatment: String!
    prescription: [PrescriptionInput]
    vitalSigns: VitalSignsInput
    labResults: [LabResultInput]
    notes: String
    followUpRequired: Boolean
    followUpDate: Date
  }

  input PrescriptionInput {
    medication: String!
    dosage: String!
    frequency: String!
    duration: String!
    instructions: String
  }

  input VitalSignsInput {
    bloodPressure: String
    heartRate: Int
    temperature: Float
    weight: Float
    height: Float
    oxygenSaturation: Int
  }

  input LabResultInput {
    testName: String!
    result: String!
    normalRange: String!
    date: Date!
  }

  type Query {
    # Auth queries
    me: User
    
    # User queries
    users(role: UserRole): [User!]!
    user(id: ID!): User
    doctors: [User!]!
    patients: [User!]!
    
    # Appointment queries
    appointments(
      patientId: ID
      doctorId: ID
      status: AppointmentStatus
      date: Date
    ): [Appointment!]!
    appointment(id: ID!): Appointment
    myAppointments: [Appointment!]!
    doctorAppointments(doctorId: ID!, date: Date): [Appointment!]!
    
    # Department queries
    departments: [Department!]!
    department(id: ID!): Department
    
    # Medical Record queries
    medicalRecords(patientId: ID!): [MedicalRecord!]!
    medicalRecord(id: ID!): MedicalRecord
    
    # Dashboard queries
    dashboardStats: DashboardStats!
  }

  type Mutation {
    # Auth mutations
    login(input: LoginInput!): AuthPayload!
    register(input: RegisterInput!): AuthPayload!
    
    # User mutations
    updateProfile(input: UserProfileInput!): User!
    updateDoctorInfo(input: DoctorInfoInput!): User!
    updatePatientInfo(input: PatientInfoInput!): User!
    deactivateUser(id: ID!): User!
    activateUser(id: ID!): User!
    
    # Appointment mutations
    createAppointment(input: AppointmentInput!): Appointment!
    updateAppointment(id: ID!, input: AppointmentInput!): Appointment!
    cancelAppointment(id: ID!): Appointment!
    completeAppointment(id: ID!): Appointment!
    updateAppointmentStatus(id: ID!, status: AppointmentStatus!): Appointment!
    
    # Medical Record mutations
    createMedicalRecord(input: MedicalRecordInput!): MedicalRecord!
    updateMedicalRecord(id: ID!, input: MedicalRecordInput!): MedicalRecord!
    
    # Department mutations
    createDepartment(name: String!, description: String!): Department!
    updateDepartment(id: ID!, name: String, description: String): Department!
    deleteDepartment(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
