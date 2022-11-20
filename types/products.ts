type ProductType = {
  _id: string
  name: string
  description: string
  image: string
  cost: number
  price: number
  reviews?: ProductReview[]
}

type ProductReview = {
  title: string
  text: string
  stars: number
}

export default ProductType