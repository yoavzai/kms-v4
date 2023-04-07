import { useQuery, gql } from '@apollo/client';

const GET_FIELDS = gql`
  query {
    fieldsOne(filter: {name: "study_details"}){
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
  }
`;

export default function() {
  const { loading, error, data } = useQuery(GET_FIELDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
