import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {CartItem} from "./models/cart";
import Product from "./models/products";
import {id} from "postcss-selector-parser";

export interface ICartContext {
  cart: CartItem[];
  cartSize: number;
  addCartItem: (product: Product) => void
  updateCartQuantity: ({productId, quantity} : {productId: string, quantity: number}) => void
}

export const CartContext = createContext<ICartContext | null>(null);
export const useCart = () => useContext(CartContext)

interface Props {
  children: ReactNode
}

export default function CartProvider({children} : Props) {
  const [cart, setCart] = useState<CartItem[]>([])
  const cartSize = useMemo(() => {
    if(cart && cart.length > 0) {
      return cart.reduce((total: number, item) => total + item.quantity, 0)
    }
    return 0;
  }, [cart]);

  const addCartItem = (product: Product) => {
    let cartItem = cart.find(item => product._id === item.product._id);
    let newCart = [...cart]

    if(cartItem) {
      cartItem.quantity += 1;
      // Update the cart by replacing the old item
      newCart = newCart.filter(item => item.product._id !== product._id)
    }
    else (
      cartItem = {quantity: 1, product: product}
    )

    setCart([...newCart, cartItem])
  }

  const updateCartQuantity = ({productId, quantity} : {productId: string, quantity: number}) => {
    let cartItem = cart.find(item => item.product._id === productId);
    if(!cartItem) return;
    let newCart = [...cart]
    cartItem.quantity = quantity
    // Update the cart by replacing the old item
    newCart = newCart.filter(item => item.product._id !== productId)
    setCart([...newCart, cartItem])
    console.log(newCart)
  }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  const cartContext: ICartContext = {
    cart,
    addCartItem,
    cartSize,
    updateCartQuantity
  }

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  )
}