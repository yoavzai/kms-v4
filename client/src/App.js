import { useQuery, gql } from '@apollo/client';

const GET_CARS = gql`
query GetCars{
  carMany {
    brand
    year
    engines {
      name
      year
      volume
    }
    wheels {
      name
      sizes
    }
  }
}
`;

function DisplayCars() {
  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return <p>Loading...</p>;
  console.log(data.carMany[0].engines[0]._id)
  if (error) return <p>Error : {error.message}</p>;

  return data.carMany.map((car, idx) => (
    <div key={idx}>
      <h3>{car.brand}</h3>
      <p>year: {car.year}</p>
      <ul>
        {car.engines.map((engine, idx) => {
          return (
            <li key={idx}>
              <span>name: {engine.name}</span><br/>
              <span>year: {engine.year}</span><br/>
              <span>volume: {engine.volume}</span><br/>
              <span>id: {engine._id}</span>
            </li>
          )
        })}
      </ul>
    </div>
  ));
}

export default function App() {

  return (
    <div>
      <DisplayCars/>
    </div>
  );
}