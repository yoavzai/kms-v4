import { gql } from "@apollo/client";

export const GET_TEMPLATES = gql`
    query TemplateMany {
        templateMany {
            _id
            name
            inputs_ids
        }
    }
`