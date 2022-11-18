import Head from 'next/head'
import Image from 'next/image'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    productData {
      _id
      cost
      description
      image
      name
      price
      reviews {
        title
      }
    }
  }
`;

export default function App({posts}) {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <h3>{process.env.NEXT_PUBLIC_APP_ID}</h3>
      <br/>
      <DisplayLocations />
    </div>
  );
}

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  if (data) { console.log(data)}

  console.log(process.env.NEXT_PUBLIC_APP_ID)

  return data.productData.map(({ _id, name, description, image }) => (
    <div key={_id}>
      <h3>{_id}</h3>
      <img width="400" height="250" alt="location-reference" src={`${image}`} />
      <br />
      <b>About this location:</b>
      <p>{description}</p>
      <br />
    </div>
  ));
}