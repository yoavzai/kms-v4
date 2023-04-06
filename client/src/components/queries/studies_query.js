import { gql } from "@apollo/client";
import { FIELDS } from "./fields_query";



export const GET_STUDIES_BY_CREATOR_ID = gql`
  ${FIELDS}
  query studyMany($creator_id: String!){
	studyMany(filter: {creator_id: $creator_id})
  {
    _id
    creator_id
    study_details 
    {
      ...Fields
    }
    individal_details 
    {
      ...Fields
    }
    questionnaire_details 
    {
      ...Fields
    }
    date_created
    date_updated
    is_deleted
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