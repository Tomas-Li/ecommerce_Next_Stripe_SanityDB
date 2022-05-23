import Head from 'next/head';
import { Layout } from '../components';
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast'; //This is for the notification pop ups! (we need this on every page)

import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
  //<Component /> -> This refers to the page component that is being rendered! Like Home when rendering the main page
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </>
  )
}