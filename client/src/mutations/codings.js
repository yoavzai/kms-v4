import { gql } from "@apollo/client";

export const CREATE_APPROVED_CODING = gql`
  mutation ApprovedCodingsCreateOne($record: CreateOneApproved_CodingsInput!) {
    approved_codingsCreateOne(record: $record) {
      recordId
    }
  }
`;

export const DELETE_APPROVED_CODING_BY_ID = gql`
  mutation ApprovedCodingsRemoveById($id: String!) {
    approved_codingsRemoveById(_id: $id) {
      recordId
    }
  }
`;
