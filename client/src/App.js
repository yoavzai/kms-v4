import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
query GetProducts {
  products {
    id
    description
    price
    reviews {
      rating
      comment
    }
  }
}
`;

function DisplayProducts() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.products.map(({ id, description, price, reviews }) => (
    <div key={id}>
      <h3>{description}</h3>
      <p>price: {price}</p>
      <ul>
        {reviews.map((review, idx) => {
          return (
            <li key={idx}>
              <span>rating: {review.rating}</span><br/>
              <span>comment: {review.comment}</span>
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
      <DisplayProducts/>
    </div>
  );
}