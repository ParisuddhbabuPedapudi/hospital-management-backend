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

  type Query {
    me: User
    doctors: [Doctor!]!
    doctor(id: ID!): Doctor
    patients: [Patient!]!
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
  }
`;

module.exports = typeDefs;
