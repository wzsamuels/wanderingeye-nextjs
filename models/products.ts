interface Product {
  _id: string
  name: string
  description: string
  image: string
  cost: number
  price: number
  reviews?: ProductReview[]
}

export interface ProductReview {
  title: string
  text: string
  stars: number
}

export default Product
export type Products = Product[];