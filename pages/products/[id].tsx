import Image from "next/image";
import Product, {ProductReview} from "../../models/products";
import Star from "../../components/Star";
import {ChangeEvent, SyntheticEvent, useEffect, useState} from "react";
import Button from "../../ui/Button";
import { initUrqlClient } from 'next-urql';
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  useQuery
} from 'urql';
import {endpoint, token} from "../../graph-request";
import {ErrorBoundary} from "react-error-boundary";
import {useRouter} from "next/router";

const GET_PRODUCT = `
  query GetProduct($id: ObjectId!) {
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
`

const ADD_REVIEW = `
  mutation AddProductReview($id: ObjectId!, $text: String!, $title: String!, $stars: Int!) {
    addProductReview(input: {product_id: $id, text: $text, title: $title, stars: $stars}) {
      stars
      text
      title
    }
  }
`

export async function getServerSideProps(ctx: { params: { id: string; }; }) {
  console.log(ctx.params.id)
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: endpoint,
      fetchOptions: () => {
        return {
          headers: { authorization: token ? `Bearer ${token}` : '' },
        };
      },
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false
  );

  // This query is used to populate the cache for the query
  // used on this page.
  await client?.query(GET_PRODUCT, {id: ctx.params.id}).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}

interface Props {
  product: Product
}

const formFields = [
  {
    name: "title",
    type: "text",
    label: "Title",
    required: true
  },
  {
    name: "text",
    type: "textarea",
    label: "Text",
    required: true
  },
]

interface IForm {
  [index: string]: string
}

const formInitialState : IForm = {title: "", text: ""}

export default function ProductDetail() {
  const router = useRouter()
  const { id } = router.query
  const [form, setForm] = useState(formInitialState)
  const [starRating, setStarRating] = useState(0)
  const [res] = useQuery({query: GET_PRODUCT, variables: {id: id}})
  const product = res.data.productDatum

  useEffect(() => {
    console.log(res)
    console.log(product)
    console.log(id)
  },[id, product, res])

  const handleFormUpdate = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

  }

  return (
    <div className={'pt-4 pb-8 px-4 w-full flex flex-col justify-center items-center'}>
      <div className={'max-w-[1080px] w-full'}>
        {/* Product Details */}
        <ErrorBoundary fallback={<div>Error loading product data</div>} >
          <section className={'flex flex-col md:flex-row'}>
            <div className={'max-w-[500px] w-full self-center'}>
              <div className={'h-[333px] flex items-center justify-center '}>
                <Image className={'object-cover rounded-md h-full w-full'} src={product.image} width={500} height={800} alt={product.name}/>
              </div>
            </div>
            <div className={'px-4 my-4 md:m-0 self-center md:self-start'}>
              <h1 className="text-5xl-res mb-4 text-center">{product.name}</h1>
              <p>{product.description}</p>
            </div>
          </section>
        </ErrorBoundary>
        <hr className={'my-4'}/>
        <section className={'mt-4'}>
          <h2 className={'text-center text-4xl-res'}>Reviews</h2>
          { product.reviews && product.reviews.length > 0 ? product.reviews.map((review: ProductReview) =>
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
        </section>
        <div>
          <form onSubmit={handleSubmit} className={'mx-auto max-w-[800px] flex flex-col items-center justify-center flex-wrap'}>
            <h2>Create Review</h2>
            {formFields.map(input =>
              <div className={'w-full my-4  flex items-center justify-center flex-wrap'} key={input.name}>
                <label className={'py-4 pr-4 flex-grow flex-shrink-0 basis-[120px] max-w-[200px]'}>
                  {input.label}
                </label>
                {input.type === "textarea" ?
                  <textarea
                    value={form[input.name]}
                    name={input.name}
                    onChange={handleFormUpdate}
                    rows={4}
                    className={'flex-grow basis-[220px] text-darkShade p-2 bg-light'}
                  />
                  :
                  <input
                    value={form[input.name]}
                    name={input.name}
                    type={input.type}
                    onChange={handleFormUpdate}
                    className={'flex-grow basis-[220px] text-darkShade p-2 '}
                  />
                }
              </div>
            )}
            <span>
        {createArray(5).map((n, i) => (
          <Star
            key={i}
            selected={starRating > i}
            onSelect={() => setStarRating(i + 1)}
          />
        ))}
      </span>
            <p>
              {starRating} of {5} stars
            </p>
            <Button className={''} type={'submit'}>Submit Review</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export const createArray = (length: number) => [...Array(length)];