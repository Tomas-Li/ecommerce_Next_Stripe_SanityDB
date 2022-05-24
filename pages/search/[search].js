import { Product } from '../../components';
import { client } from '../../lib/client';

const Search = ({ products }) => {
  

  return (
    <div className="maylike-products-wrapper">
      <div className="marquee">
        <div className={`maylike-products-container ${products.length<=5 ? 'track-short' : 'track'}`}>
          {products.map((item) => (<Product key={item._id} product={item} />))}
        </div>
      </div>
    </div>
  )
}



export const getServerSideProps = async({ params: { search }}) => {

  console.log(search)
  const query = `*[_type == "product" && name match '${ search }']`;
  const products = await client.fetch(query);

  console.log(products)
  
  return {
    props: {products}
  }
}


export default Search