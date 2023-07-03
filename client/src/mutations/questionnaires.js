import { gql } from "@apollo/client";

export const CREATE_QUESTIONNAIRE = gql`
  mutation QuestionnaireCreateOne($record: CreateOneQuestionnaireInput!) {
    questionnaireCreateOne(record: $record) {
      recordId
    }
  }
`;
export const DELETE_QUESTIONNAIRE_BY_ID = gql`
  mutation QuestionnaireRemoveById(
    $id: String!
    $record: UpdateByIdQuestionnaireInput!
  ) {
    questionnaireRemoveById(_id: $id, record: $record) {
      recordId
    }
  }
`;
export const UPDATE_QUESTIONNAIRE_BY_ID = gql`
  mutation QusetionnaireUpdateById(
    $id: String!
    $record: UpdateByIdQuestionnaireInput!
  ) {
    questionnaireUpdateById(_id: $id, record: $record) {
      recordId
    }
  }
`;
export const UPDATE_QUESTIONNAIRES_NEW_APPROVED_CODING = gql`
  mutation UpdateQuestionnairesNewApprovedCoding($newCoding: CodingInput!) {
    updateQuestionnairesNewApprovedCoding(newCoding: $newCoding) {
      recordIds
    }
  }
`;
export const UPDATE_QUESTIONNAIRES_REMOVE_APPROVED_CODING = gql`
  mutation UpdateQuestionnairesRemoveApprovedCoding($id: String!) {
    updateQuestionnairesRemoveApprovedCoding(id: $id) {
      recordIds
    }
  }
`;
