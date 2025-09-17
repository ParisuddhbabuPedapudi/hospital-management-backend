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

  type Query {
    me: User
  }

  type Mutation {
    login(input: LoginInput!): AuthPayload!
    updateProfile(input: UserProfileInput!): User!
  }
`;

module.exports = typeDefs;
