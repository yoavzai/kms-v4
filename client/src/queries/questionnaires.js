
import { gql } from "@apollo/client";


export const QUESTIONNAIRES_BY_STUDY_ID = gql`
    query QuestionnaireMany($study_id: String!) {
    questionnaireMany(sort: date_updated, filter: {study_id: $study_id, is_deleted: false}) {
    _id
    study_id
    individual_details {
      type
      key
      mandatory
      value
      min_num
      max_num
      dropdown_options
    }
    questionnaire_details {
      type
      key
      mandatory
      value
      min_num
      max_num
      dropdown_options
    }
    date_created
    date_updated
    is_deleted
    }
}
`