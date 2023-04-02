import { gql } from "@apollo/client";



export const CREATE_STUDIY= gql`
mutation studyCreateOne($creator_id: String!){
	studyCreateOne(
    record:
    {
      creator_id: $creator_id
      study_details:
      [
        {
          type: slider
          key: "a"
          value: "10"
        },
        {
          type: dropdown
          key: "b"
          value: "b"
          dropdown_options: ["a","b","c"]
        },
        {
          type:text
          key: "c"
        },
        {
          type: number
          key: "d"
          value: "4.5"
          min_num: "3"
          max_num: "5"
        }
    	]
      individual_details:
      [
        {
          type: text
          key: "e"
          value: "eeeeeeee"
        }
      ]
      questionnaire_details:
      [
        {
          type: boolean
          key: "f"
          value: "true"
        },
        {
          type: date
          key: "interview date"
        }
      ]
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