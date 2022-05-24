//External imports
import { useState } from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
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
      <div className='search-container'>
        {/* <div style={{width: '35px', height: '50px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div> */}
        <input 
          className='search-bar' 
          type='text' 
          placeholder='search' 
          value={search} 
          onChange={handleChange} 
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className='cart-button-container'>
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