//External Imports
import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import Head from 'next/head';

//LocalImports
import { useStateContext } from '../../context/StateContext';
import { client, urlFor } from "../../lib/client"
import { Product } from "../../components";


const ProductDetails = ({ product, products }) => {
  //Context
  const { setShowCart, decQty, incQty, qty, onAdd } = useStateContext();
  
  //State
  const [index, setIndex] = useState(0);
  
  //Props desctructure
  const { image, name, details, price } = product;

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  return (
    <div>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div className='product-detail-container'>

        {/* Main Image && Carrousel */}
        <div>
          <div>
            <img className='product-detail-image' src={urlFor(image && image[index])} alt="main product image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img src={urlFor(item)}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
                key={item._key}
                alt={`image ${i}`}
               />
            ))}
            {/* onMouseEnter is used to change the image being show when hovering over an image in the carrousel! */}
          </div>
        </div>

        {/* Title, desc && Buying options */}
        <div className="product-detail-desc">
          <h1>{name}</h1>
          {/* Review Section, is static at the moment, but should be dynamic and recovered from the DB */}
          <div className="reviews">
            <div> 
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>
              (20) {/* Number of reviews */}
            </p>
          </div>
          {/* Description */}
          <h4>Details: </h4>
          <p>{details}</p>
          {/* Price and Quantity */}
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
            </p>
          </div>
          {/* Buttons */}
          <div className="buttons">
              <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
              <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      {/* Recommended Products! */}
      <div className="maylike-products-wrapper">
        <h2>You may also like!</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (<Product key={item._id} product={item} />))}
          </div>
        </div>
      </div>
    </div>
  )
}

//I'm using a staticProp in this case because the data should aldready be known as the user is clicking on a Link inside the homePage to get here! That's why we need to make a *getStaticPaths* function so Next can built this pages before-hand
export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query); //We recover the individual product for the slug
  const products = await client.fetch(productsQuery); //We recover all the products

  return {
    props: { product, products }
  }; // This will be received inside our component
}

export const getStaticPaths = async() => {
  const query = `*[_type == "product"]{
    slug{
      current
    }
  }
  `

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export default ProductDetails