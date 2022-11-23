import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Link from "next/link";
import {endpoint, token} from "../graph-request";
import CartProvider, {ICartContext, useCart} from "../CartProvider";
import {ShoppingCartIcon} from "@heroicons/react/24/solid";
import {withUrqlClient} from "next-urql";

function App({ Component, pageProps }: AppProps) {

  return (
      <CartProvider>
        <div className={'min-h-[100vh] max-w-full relative bg-darkShade text-light w-screen'}>
          <NavBar/>
          <main className={'pb-16'}>
            <Component {...pageProps} />
          </main>
          <footer className={'p-4 bg-darkGray absolute bottom-0 w-full h-auto text-light'}>
            Copyright Twin Silver Web Design
          </footer>
        </div>
      </CartProvider>
  )
}

function NavBar() {
  const {cartSize} = useCart() as ICartContext

  return (
    <nav className={'bg-darkGray flex justify-between'}>
      <Link href="/" className={'py-3.5 px-4 bg-primary hover:bg-gray'}>The Wandering Eye</Link>
      <Link href={'/shopping'} className={'flex py-3.5 px-4 hover:bg-gray'}>
        <ShoppingCartIcon className={'w-6 h-6 mr-4'}/> {cartSize}
      </Link>
    </nav>
  )
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
  { ssr: false }
)(App);
