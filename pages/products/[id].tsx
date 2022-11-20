import client from "../../apollo-client";
import {gql} from "@apollo/client";
import Image from "next/image";
import ProductType from "../../types/products";
import Star from "../../components/Star";

export async function getServerSideProps(ctx: { params: { id: string; }; }) {

  console.log(ctx.params.id)
  const { data } = await client.query({
    query: gql`
      query GetProducts($id: ObjectId!) {
        productDatum(query: {_id: $id}) {
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
    `,
    variables: {id: ctx.params.id}
  });

  console.log(data)

  return {
    props: {
      product: data.productDatum,
    },
  };
}

interface Props {
  product: ProductType
}

export default function Product({ product } : Props) {

  console.log(product)

  return (
    <div className={'pt-4 pb-8 px-4 w-full'}>
      <div className={'grid grid-cols-1 md:grid-cols-2 text-light'}>
        <div className={'flex items-center justify-center w-full'}>
            <Image className={'rounded-md'} src={product.image} width={500} height={800} alt={product.name}/>
        </div>
        <div className={'px-4 my-4 md:m-0'}>
          <h1 className="text-5xl-res mb-4 ">{product.name}</h1>
          <p>{product.description}</p>
        </div>
      </div>
      <hr className={'my-4'}/>
      <div className={'mt-4'}>
        <h2 className={'text-center text-4xl-res'}>Reviews</h2>
        { product.reviews && product.reviews.length > 0 ? product.reviews.map(review =>
          <div key={review.title}>
            <h3 className={'text-3xl-res pb-2'}>{review.title}</h3>
            <span>
              {createArray(5).map((n, i) =>
                <Star key={i} selected={review.stars > i} />
              )}
            </span>
            <p className={'py-6'}>{review.text}</p>
          </div>
          ) :
          <h3 className={'text-3xl-res'}>No reviews yet!</h3>
        }
      </div>
    </div>
  )
}

export const createArray = (length: number) => [...Array(length)];