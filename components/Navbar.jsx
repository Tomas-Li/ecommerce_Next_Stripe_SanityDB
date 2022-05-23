//External imports
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

//Local imports
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {

  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <Link href={'/'}>
        <div className='logo-container'>
          <img src='/BigLogo.png' height={25} alt='logo-img' />
          <a className='logo-name'>Master Musician Store</a>
        </div>
      </Link>
      <button type="button" className='cart-icon' onClick={() => setShowCart(!showCart)}>
        <AiOutlineShopping fontSize={35} />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      <Cart />
    </div>
  )
}

export default Navbar