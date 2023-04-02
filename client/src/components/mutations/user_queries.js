import { gql } from "@apollo/client";




export function getUserByNameQuery(name, fields) {
  
  const query = `
  query getUser{
      userOne(filter: {username: ${name})
      {
        ${fields}
      }
    }
  `   
  return (
    gql(query)
  )

}

export const GET_USER_BY_NAME = gql`
query getUser($name: String!){
    userOne(filter: {username: $name})
    {
      first_name
      last_name
      role
    }
  }
`   

export const GET_ALL_USERS = gql`
query getUsers{
    userMany
    {
      _id
      first_name
      last_name
      role
    }
  }
`   