import { gql } from "@apollo/client";

export const GET_APPROVED_CODINGS = gql`
  query Approved_CodingsMany {
    approved_codingsMany {
      _id
      referent
      meaning_value
      sr
      reflvl
      dim
      tr
      fr
      fe
      ss
      mm
      comment
      status
    }
  }
`;
