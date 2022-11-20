import Image from 'next/image'
import { gql, useQuery } from '@apollo/client';
import Product from "../types/products";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";

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
        text
        stars
      }
    }
  }
`;

export default function Home() {
  return (
    <div className={'flex flex-wrap items-center justify-center py-8'}>
      <Products/>
    </div>
  );
}

function Products() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <LoadingSpinner className={'p-8'}/>
  if (error) return <p>Error : {error.message}</p>;
  if (data) { console.log(data)}

  return data.productData.map(({ _id, name, description, image } : Product) => (
    <div
      className="my-8 mx-4 text-darkShade bg-light w-[400px] rounded-md shadow-3xl"
      key={_id}
    >
      <Link href={`/products/${_id}`}>
        <div className={'mt-[-2rem] mx-4 h-[250px]'}>
          <Image className={'shadow-3xl object-cover rounded-md bg-light h-full w-full'} width={500} height={800} alt="location-reference" src={`${image}`} />
        </div>
        <div className={'p-4'}>
          <h2 className={'text-2xl'}>{name}</h2>
          <p className={'truncate'}>{description}</p>
        </div>
      </Link>
      <div className={'p-4'}>
        <button className={'py-2 px-4 w-full bg-primary text-light uppercase tracking-widest'}>Add to Cart</button>
      </div>
    </div>
  ));
}