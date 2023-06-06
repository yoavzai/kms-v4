import { gql } from "@apollo/client";

export const CREATE_IMAGE = gql`
  mutation ImageCreateOne($record: CreateOneImageInput!) {
    imageCreateOne(record: $record) {
      recordId
    }
  }
`;

export const DELETE_IMAGE_BY_ID = gql`
  mutation ImageRemoveById($id: String!) {
    imageRemoveById(_id: $id) {
      recordId
    }
  }
`;
