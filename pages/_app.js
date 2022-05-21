import { Layout } from '../components';
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast'; //This is for the notification pop ups! (we need this on every page)

import '../styles/global.css';

export default function MyApp({ Component, pageProps }) {
  //<Component /> -> This refers to the page component that is being rendered! Like Home when rendering the main page
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}