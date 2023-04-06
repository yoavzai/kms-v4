import { gql } from "@apollo/client";
import { FIELDS } from "../queries/fields_query";



export const CREATE_STUDY= gql`
${FIELDS}
mutation studyCreateOne($creator_id: String!, $study_details: [Fields], $individual_details: [Fields], $questionnaire_details: [Fields]){
	studyCreateOne(
    record:
    {
      creator_id: $creator_id
      study_details: $study_details
      individual_details: $individual_details
      questionnaire_details: $questionnaire_details
    }
  )
  {
    recordId
  }
}
`       

export const GET_STUDY_BY_ID = gql`
query studyById($id: String!){
	studyById(_id: $id)
  {
    creator_id
  }
}
`       