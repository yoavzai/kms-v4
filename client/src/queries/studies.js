import { gql } from "@apollo/client";



export const STUDIES_BY_CREATOR_ID = gql`
    query StudyMany($creator_id: String!) {
    studyMany(sort: date_updated, filter: {creator_id: $creator_id, is_deleted: false}) {
    _id
    study_details {
        type
        mandatory
        key
        value
        min_num
        max_num
        dropdown_options
    }
    }
}
`

export const STUDY_BY_ID = gql`
    query StudyById($id: String!) {
    studyById(_id: $id) {
        _id
        creator_id
        date_created
        date_updated
        is_deleted
        custom_templates {
            _id
            name
            language
            inputs {
                input_id
                name
            }
        }
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
        study_details {
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
`

export const STUDY_BASIC_DETAILS_BY_ID = gql`
    query StudyById($id: String!) {
    studyById(_id: $id) {
        _id
        creator_id
        date_created
        date_updated
        is_deleted
        study_details {
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
`