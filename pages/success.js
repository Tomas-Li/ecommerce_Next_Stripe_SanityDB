import { useEffect } from 'react'
import { BsBagCheckFill } from 'react-icons/bs';
import Link from 'next/link';

import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  //We have to clean Context and the localStorage... and run the fireworks
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'><BsBagCheckFill /></p>
        <h2>Thank you for your order!</h2>
        <p className='email-msg'>Check your email inbox for the recipe.</p>
        <p className='description'>
          If you have any questions, please email <a className='email' href='mailto:fakeMail@mail.com'>fakeMail@mail.com</a>
        </p>
        <Link href="/">
          <button type='button' width="300px" className='btn'> Continue Shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default Success