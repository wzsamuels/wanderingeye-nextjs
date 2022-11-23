import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {CartItem} from "./models/cart";
import Product from "./models/products";

export interface ICartContext {
  cart: CartItem[];
  cartSize: number;
  addCartItem: (product: Product) => void
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
    console.log(cartItem)
    if(cartItem) {
      cartItem.quantity += 1;
      newCart = newCart.filter(item => item.product._id !== product._id)
    }
    else (
      cartItem = {quantity: 1, product: product}
    )
    console.log(cartItem)
    setCart([...newCart, cartItem])
  }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  const cartContext: ICartContext = {
    cart,
    addCartItem,
    cartSize
  }

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  )
}