import Head from 'next/head';
import Footer from './Footer';

import Navbar from './Navbar';

/**
 * Layout component for defining <Head> (main <title>) and organizing the main layout as <NavBar> - <Specific Component for the page> - <Footer>;
 * @param {Object} param0 - <Specific Component for the page that is being rendered>
 */
const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>M-Musician</title>
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