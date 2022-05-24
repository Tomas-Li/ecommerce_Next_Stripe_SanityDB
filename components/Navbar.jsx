//External imports
import { useState } from 'react';
import { AiOutlineShopping, AiOutlineSearch } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Local imports
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';


const Navbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      if(search !== ''){
        if(router.pathname.includes('/search/')){
          router.push(`${search}`);
        }else {
          router.push(`search/${search}`)
        }
      }
    }
  }

  return (
    <div className="navbar-container">
      <Link href={'/'}>
        <div className='logo-container'>
          <img src='/BigLogo.png' height={25} alt='logo-img' />
          <a className='logo-name'>Master Musician Store</a>
        </div>
      </Link>
      <div className='flex-center'>
        <div className='search-box'>
          <button className='btn-search'>
            <AiOutlineSearch />
          </button>
          <input 
            className='input-search' 
            type='text' 
            placeholder='search...' 
            value={search} 
            onChange={handleChange} 
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className='flex-center'>
        <button type="button" className='cart-icon' onClick={() => setShowCart(!showCart)}>
          <AiOutlineShopping fontSize={35} />
          <span className='cart-item-qty'>{totalQuantities}</span>
        </button>
      </div>

      {/* Cart is always present but hidden out of screen */}
      <Cart />
    </div>
  )
}


export default Navbar