import Image from 'next/image'
import Product from "../models/products";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";
import {ICartContext, useCart} from "../CartProvider";
import {ErrorBoundary} from "react-error-boundary";
import Button from "../ui/Button";
import {endpoint, token} from "../graph-request";
import { withUrqlClient } from 'next-urql';
import { useQuery } from 'urql';

const GET_PRODUCTS = `
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

function Index() {
  return (
    <div className={'flex flex-wrap items-center justify-center py-8'}>
      <ErrorBoundary fallback={<div>Error Loading Products</div>}>
        <ProductList/>
      </ErrorBoundary>
    </div>
  );
}

function ProductList() {
  const { addCartItem} = useCart() as ICartContext
  const [result] = useQuery({query: GET_PRODUCTS})
  const {data, fetching} = result

  if(fetching) return <LoadingSpinner className={'p-8'}/>;

  return data.productData.map((product : Product) => (
    <div
      className="my-8 mx-4 text-darkShade bg-light w-[400px] rounded-md shadow-3xl"
      key={product._id}
    >
      <Link href={`/products/${product._id}`}>
        <div className={'mt-[-2rem] mx-4 h-[250px]'}>
          <Image className={'shadow-3xl object-cover rounded-md bg-light h-full w-full'} width={500} height={800} alt="location-reference" src={`${product.image}`} />
        </div>
        <div className={'p-4'}>
          <h2 className={'text-2xl'}>{product.name}</h2>
          <p className={'truncate'}>{product.description}</p>
        </div>
      </Link>
      <div className={'p-4'}>
        <Button onClick={() => addCartItem(product)} className={'w-full'}>
          Add to Cart
        </Button>
      </div>
    </div>
  ));
}

export default withUrqlClient(
  () => ({
    url: endpoint,
    fetchOptions: () => {
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      };
    },
  }),
  { ssr: true }
)(Index);