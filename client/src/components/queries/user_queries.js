import { gql } from "@apollo/client";


const USER_FIELDS = gql`
  fragment UserFields on User{
      _id
      username
      passhash
      email
      first_name
      last_name
      role
      date_created
      date_updated
      is_deleted
    }
`;

export const GET_USER = gql`
  ${USER_FIELDS}
  query GetUser($email: String!, $password: String!) {
    userOne(filter: {email: $email, passhash: $password}) {
      ...UserFields
    }
  }
`   

export const GET_ALL_USERS = gql`
  ${USER_FIELDS}
  query getAllUsers{
    userMany
    {
      ...UserFields
    }
  }
`   

