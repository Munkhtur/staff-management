export const typeDefs = `#graphql
  type User {
    id: Int!
    email: String
    name: String
    phone: String
    address: String
    dateOfBirth: String
    role: String
    password: String
    resetToken: String
    resetTokenExpiry: String
  }

  type LoginRes {
    user: User,
    token: String
  }
  scalar Date

  enum Role {
    Admin, Staff
  }
  type Query{
    user(id:Int!): User
    users : [User]
    adminUsers: [User]
    staffUsers: [User]

  }
  type Mutation {
    login(email:String! , password:String!): LoginRes
    register(email: String!, password: String!, role: String) : LoginRes
    upDateUser(id:Int!, input: UserEditInput) : User
    deleteUser(id:Int!) :User
    requestPasswordReset(email: String!): Boolean
  resetPassword(token: String!, newPassword: String!): Boolean
  }

  input UserEditInput {
    email:String
    name: String
    phone:String
    dateOfBirth:Date
    role:Role
    password:String
    gender:String
    address:String
  
  }
`;