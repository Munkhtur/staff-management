import { gql } from "@apollo/client";

enum Role {
  Admin,
  Staff,
}

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $role: String) {
    register(email: $email, password: $password, role:$role){
        token 
        user{
            name
            email
            
        }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password){
        token
        user{
            name
            email
            password
        }
    }

  }
`;

export const GET_USERS = gql`
  query Users {
    users {
      id
      email
      name
      phone
      address
      dateOfBirth
      role
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query user($id:Int!) {
    user(id: $id) {
      id
      email
      name
      phone
      address
      dateOfBirth
      role
    }
  }
`;
export const UPDATE_USER = gql`
  mutation upDateUser($id:Int!, $input: UserEditInput) {
    upDateUser(id: $id, input: $input) {
      id
      email
      name
      phone
      address
      dateOfBirth
      role
    }
  }
`;

export const REQUEST_PASS = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;
export const RESET_PASS = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;
