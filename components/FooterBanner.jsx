import Link from 'next/link';

import { urlFor } from '../lib/client';

//todo{Eliminar la imagen del footer o cambiar el className, pero es un asco de momento}

const FooterBanner = ({ footerBanner: {discount, desc, smallText, midText, largeText1, largeText2, saleTime, product, buttonText, image} }) => {
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
            <p>{smallText}</p>
            <h3>{midText}</h3>
            <p>{desc}</p>
            <Link href={`/product/${product}`}>
              <button type="button">{buttonText}</button>
            </Link>
        </div>
        <img src={urlFor(image)} height={250} className='footer-banner-image' alt="footer-banner-image" />
      </div>
    </div>
  )
}

export default FooterBanner