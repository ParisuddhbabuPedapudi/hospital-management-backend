const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    email: String!
    role: UserRole!
    profile: UserProfile!
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
  }

  enum UserRole {
    admin
    doctor
    patient
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input UserProfileInput {
    firstName: String!
    lastName: String!
    phone: String
    dateOfBirth: Date
  }

  type EmergencyContact {
    name: String!
    relationship: String!
    emergencyContact: String!
  }

  input EmergencyContactInput {
    name: String!
    relationship: String!
    emergencyContact: String!
  }
  
  type Patient {
    id: ID!
    firstName: String!
    lastName: String!
    phoneNumber: String
    age: Int!
    gender: String
    email: String!
    address: String!
    city: String!
    state: String!
    zipCode: String!
    createdAt: Date!
    updatedAt: Date!
    country: String!
    bloodGroup: String!
    assaingnedDoctor: Doctor!
    emergencyContact: EmergencyContact!
    isActive: Boolean!
  }

  input CreatePatientInput {
  firstName: String!
  lastName: String!
  phoneNumber: String
  email: String!
  age: Int!
  gender: String!
  address: String!
  city: String!
  state: String
  zipCode: String!
  country: String!
  bloodGroup: String!
  assaingnedDoctor: ID!
  emergencyContact: EmergencyContactInput!
  }

  input UpdatePatientInput {
  firstName: String!
  lastName: String!
  phoneNumber: String
  email: String!
  age: Int!
  gender: String!
  address: String!
  city: String!
  state: String
  zipCode: String!
  
  country: String!
  bloodGroup: String!
  assaingnedDoctor: ID!
  emergencyContact: EmergencyContactInput!
  }

  type Hospital {
    id: ID!
    hospitalName: String!
    address: String!
    phoneNumber: String!
    email: String!
    website: String
    numberOfBeds: Int!
    establishedYear: Int!
    departments: [String!]!
    isActive: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateHospitalInput {
    hospitalName: String!
    address: String!
    phoneNumber: String!
    email: String!
    website: String
    numberOfBeds: Int!
    establishedYear: Int!
    departments: [String!]!
  }

  input UpdateHospitalInput {
    hospitalName: String
    address: String
    phoneNumber: String
    email: String
    website: String
    numberOfBeds: Int
    establishedYear: Int
    departments: [String!]
  }

  type Doctor {
    id: ID!
    firstName: String!
    lastName: String!
    phoneNumber: String
    experiance: Int
    specialization: String
    qualification: String
    isSurgeon: Boolean
    shifttiming: String
    email: String!
    createdAt: Date!
    updatedAt: Date!
    age: Int!
    gender: String!
    isActive: Boolean!
  }

  input CreateDoctorInput {
    firstName: String!
    lastName: String!
    phoneNumber: String
    experiance: Int
    specialization: String
    qualification: String
    isSurgeon: Boolean
    shifttiming: String
    email: String!
    age: Int!
    gender: String!
  }

  input UpdateDoctorInput {
    firstName: String
    lastName: String
    phoneNumber: String
    experiance: Int
    specialization: String
    qualification: String
    isSurgeon: Boolean
    shifttiming: String
    email: String
    age: Int
    gender: String
  }
  type Staff {
    id: ID!
    staffType: String!
    qualification: String
    experiance: Int!
    salary: Float!
    isActive: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }
    
  input CreateStaffInput {  
    staffType: String!
    qualification: String
    experiance: Int!
    salary: Float!
  }

  input UpdateStaffInput {  
    staffType: String
    qualification: String
    experiance: Int
    salary: Float
  }

  type Query {
    me: User
    doctors: [Doctor!]!
    doctor(id: ID!): Doctor
    patients: [Patient!]!
    hospitals: [Hospital!]!
    hospital(id: ID!): Hospital
    staffList: [Staff!]!
    staff(id: ID!): Staff
  }

  type Mutation {
    login(input: LoginInput!): AuthPayload!
    updateProfile(input: UserProfileInput!): User!
    createDoctor(input: CreateDoctorInput!): Doctor!
    updateDoctor(id: ID!, input: UpdateDoctorInput!): Doctor!
    deleteDoctor(id: ID!): Boolean!
    setDoctorStatus(id: ID!, isActive: Boolean!): Doctor!
    createPatient(input: CreatePatientInput!): Patient!
    updatePatient(id: ID!, input: UpdatePatientInput!): Patient!
    deletePatient(id: ID!): Boolean!
    setPatientStatus(id: ID!, isActive: Boolean!): Patient!
    createHospital(input: CreateHospitalInput!): Hospital!
    updateHospital(id: ID!, input: UpdateHospitalInput!): Hospital!
    deleteHospital(id: ID!): Boolean!
    setHospitalStatus(id: ID!, isActive: Boolean!): Hospital!
    CreateStaffInput(input: CreateStaffInput!): Staff!
    UpdateStaffInput(id: ID!, input: UpdateStaffInput!): Staff!
    deleteStaff(id: ID!): Boolean!
    setStaffStatus(id: ID!, isActive: Boolean!): Staff!
  }
`;

module.exports = typeDefs;
