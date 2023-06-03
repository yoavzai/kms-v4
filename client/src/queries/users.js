import { gql } from "@apollo/client";

export const ALL_USERS = gql`
  query UserMany {
    userMany {
      _id
      date_created
      date_updated
      email
      first_name
      is_deleted
      last_name
      passhash
      role
      username
    }
  }
`;
