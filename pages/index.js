import { Product, FooterBanner, HeroBanner} from '../components'

//DB
import { client } from '../lib/client';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p style={{paddingTop: '10px'}}>Feel the music as you have never felt it before</p>
      </div>

      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"][0...10]';
  const products = await client.fetch(query); //We recover all the products

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }; // This will be received inside our component
}

export default Home