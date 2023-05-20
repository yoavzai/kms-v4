import { gql } from "@apollo/client";

export const GET_TRANSLATIONS = gql`
    query TranslationMany($filter: FilterFindManyTranslationInput) {
        translationMany(filter: $filter) {
            _id
            input_id
            language
            value
        }
    }
`