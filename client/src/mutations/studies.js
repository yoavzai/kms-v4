import { gql } from "@apollo/client";

export const CREATE_STUDY = gql`
  mutation studyCreateOne($record: CreateOneStudyInput!) {
    studyCreateOne(record: $record) {
      recordId
    }
  }
`;
export const DELETE_STUDY_BY_ID = gql`
  mutation StudyRemoveById($id: String!, $record: UpdateByIdStudyInput!) {
    studyRemoveById(_id: $id, record: $record) {
      recordId
    }
  }
`;
export const UPDATE_STUDY_BY_ID = gql`
  mutation StudyUpdateById($id: String!, $record: UpdateByIdStudyInput!) {
    studyUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;
