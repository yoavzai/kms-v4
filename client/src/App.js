import { useQuery, gql } from '@apollo/client';

const GET_CARS = gql`
query getTrans{
  translationMany(
    filter:{
      OR: [
        {
          input_id:1
        }
        {
          input_id:2
        }
      ]
    }
  )
  {
    value
  }
}
`;

function DisplayCars() {
  const { loading, error, data } = useQuery(GET_CARS);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (!loading) {
    return data.translationMany.map((car, idx) => (
      <div key={idx}>
        <h3>{car.value}</h3>
      </div>
    ));

  }
}

export default function App() {

  return (
    <div>
      <DisplayCars/>
    </div>
  );
}