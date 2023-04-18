import { gql } from "@apollo/client";

export const FIELDS = gql`
  fragment Fields on Fields{
    _id
    name
    fields
        {
            type
            key
            mandatory
            value
            min_num
            max_num
            dropdown_options
        }
    }
`;


export const GET_CODINGS_FIELDS = gql`
    ${FIELDS}
    query fieldsOne{
	fieldsOne(filter: {name: "codings"}) {
        ...Fields
    }

}
`       
export const GET_STUDY_DETAILS_FIELDS = gql`
    ${FIELDS}
    query fieldsOne{
	fieldsOne(filter: {name: "study_details"}) {
        ...Fields
    }

}
`       
export const GET_INDIVIDUAL_DETAILS_FIELDS = gql`
    ${FIELDS}
    query fieldsOne{
	fieldsOne(filter: {name: "individual_details"}) {
        ...Fields
    }

}
`       
export const GET_QUESTIONNAIRE_DETAILS_FIELDS = gql`
    ${FIELDS}
    query fieldsOne{
	fieldsOne(filter: {name: "questionnaire_details"}) {
        ...Fields
    }

}
` 