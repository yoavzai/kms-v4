import { gql } from "@apollo/client";



export const GET_STUDIES_BY_USER_ID = gql`
query studyMany($id: String!){
	studyMany(filter: {creator_id: $id, is_deleted: false})
  {
    study_details 
    {
      key
      value
    }
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