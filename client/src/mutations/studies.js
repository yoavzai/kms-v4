import { gql } from "@apollo/client";


export const CREATE_STUDY= gql`
mutation studyCreateOne($record: CreateOneStudyInput!){
	studyCreateOne(record: $record)
  {
    record {
      _id
      creator_id
      date_created
      date_updated
      is_deleted
      individual_details {
        type
        key
        mandatory
        value
        min_num
        max_num
        dropdown_options
      }
      study_details {
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
    }
  }
}
`