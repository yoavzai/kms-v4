import { gql } from "@apollo/client";

export const CREATE_IMAGE = gql`
  mutation ImageCreateOne($record: CreateOneImageInput!) {
    imageCreateOne(record: $record) {
      recordId
    }
  }
`;
