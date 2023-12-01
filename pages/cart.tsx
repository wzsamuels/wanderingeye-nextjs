import {ICartContext, useCart} from "../CartProvider";
import {ChangeEvent, SyntheticEvent, useMemo, useState} from "react";
import Image from "next/image";
import {createArray} from "./products/[id]";

export default function Cart() {
  const { cart, updateCartQuantity } = useCart() as ICartContext

  const subtotal = useMemo(() => {
    if(cart && cart.length > 0) {
      return cart.reduce((total: number, item) => total + (item.product.price * item.quantity), 0)
    }
  }, [cart])

  const [quantities, setQuantities] = useState([0])

  const handleChange = (id: string, event) => {
    updateCartQuantity({productId: id, quantity: event.target.value})
  }

  return (
    <div className='max-w-[800px] w-full mx-auto'>
      {cart.map(item =>
        <div className={'flex rounded-md text-darkShade justify-between w-full my-4 bg-light'} key={item.product._id}>
          <div className={'flex'}>
            <div className={' w-[200px] w-full h-[200px]'}>
              <Image className={'object-cover rounded-l-md h-full w-full'} src={item.product.image} width={250} height={250} alt={item.product.name}/>
            </div>
            <div className="flex flex-col p-4 justify-between">
              <div className={'text-xl'}>{item.product.name}</div>
              <div>
                <label className={'mr-4'}>Quantity:</label>
                { item.quantity < 10 ?
                  <select
                    className={'text-darkShade rounded-md border-darkShade border px-4'}
                    defaultValue={item.quantity}
                    onChange={e => handleChange(item.product._id, e)}
                  >
                    {createArray(10).map((n, i) =>
                      <option
                        className={'p-4 appearance-none'}
                        key={i}
                        value={i}

                      >
                        {i}
                      </option>
                    )}
                  </select>
                  :
                  <input/>
                }
              </div>
            </div>
          </div>
          <div className={'p-4'}>Price: ${item.product.price}</div>
        </div>
      )}
      <hr/>
      <div className={'text-right py-4'}>
        Subtotal ${subtotal}
      </div>
    </div>
  )
}