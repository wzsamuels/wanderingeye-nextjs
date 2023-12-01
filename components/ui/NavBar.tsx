import {ICartContext, useCart} from "../../CartProvider";
import Link from "next/link";
import {ShoppingCartIcon} from "@heroicons/react/24/solid";

export default function NavBar() {
  const {cartSize} = useCart() as ICartContext

  return (
    <nav className={'bg-darkGray flex justify-between'}>
      <Link href="/Users/wzsam/source/repos/wanderingeye-nextjs/pages" className={'py-3.5 px-4 bg-primary hover:bg-gray'}>The Wandering Eye</Link>
      <Link href={'/shopping'} className={'flex py-3.5 px-4 hover:bg-gray'}>
        <ShoppingCartIcon className={'w-6 h-6 mr-4'}/> {cartSize}
      </Link>
    </nav>
  )
}