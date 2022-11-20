import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {ApolloProvider} from '@apollo/client';
import Link from "next/link";
import client from "../apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className={'min-h-[100vh] relative bg-darkShade text-light'}>
        <nav className={'bg-darkGray  flex'}>
          <Link href="/" className={'py-3.5 px-4 bg-primary'}>The Wandering Eye</Link>
        </nav>
        <main className={'pb-16'}>
          <Component {...pageProps} />
        </main>
        <footer className={'p-4 bg-darkGray absolute bottom-0 w-full h-auto text-light'}>
          Copyright Twin Silver Web Design
        </footer>
      </div>
    </ApolloProvider>
  )
}
