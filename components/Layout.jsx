import Head from 'next/head';
import Footer from './Footer';

import Navbar from './Navbar';


const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>Next-Stripe Project</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout