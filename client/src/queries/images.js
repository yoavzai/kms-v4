import { gql } from "@apollo/client";

export const IMAGE_BY_ID = gql`
  query ImageById($id: String!) {
    imageById(_id: $id) {
      _id
      name
      bindata
    }
  }
`;
