//External Imports
import { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';

//Local Imports
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

/**
 * Cart Component. Called from NavBar. Is an Sticky screen that transitions from outside the screen into the page. It's information is constantly being updated and is all being stored in the Context API.
 */
const Cart = () => {
  //Hooks
  const cartRef = useRef();
  const { totalPrice,
     totalQuantities, 
     cartItems, 
     showCart, 
     setShowCart, 
     toggleCartItemQuantity, 
     onRemove } = useStateContext();

  /**
   * Main objective is to redirect us to the Cehckout if everything works well with Stripe.
   * First it calls a Stripe Promise from lib/getStripe/getStripe().
   * Then it fetches the Stripe Session data from pages/api/stripe.
   * If everything went correctly, we pass our session to our Promise and we get redirected to the Checkout.
   */
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if(response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className={`cart-wrapper ${showCart ? 'translation' : ''}`} ref={cartRef}>
      <div className='cart-container'>
        <button type="button" className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Shopping bag empty</h3>
            <Link href="/">
              <button type="button" className='btn' onClick={() => setShowCart(false)}>
                Continue Shopping!
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className='cart-product-image' alt="cart-product-image"/>
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className="quantity-desc">
                      <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                      <span className="num">{item.quantity}</span>
                      <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                    </p>
                  </div>
                  <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button type='button' className='btn' onClick={handleCheckout}>Pay With Stripe</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart