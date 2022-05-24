import { Product } from '../../components';
import { client } from '../../lib/client';

/**
 * Page ServerSide rendered after search queries
 * @param {Object} param0 - {products: List of matching results from the DB}
 */
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


/**
 * @param {Object} param0 - We get the search query parameter for querying the DB from the url
 * @returns {Object} props - {products: a list of matching products}
 */
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