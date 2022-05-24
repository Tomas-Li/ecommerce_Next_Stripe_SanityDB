import Link from 'next/link'
import React from 'react'

import { urlFor } from '../lib/client'

/**
 * Top Banner Component
 * @param {Object} param0 - gets the Banner Data from the DB as a prop
 */
const HeroBanner = ({ heroBanner }) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{heroBanner.saleTime}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <img src={urlFor(heroBanner.image)} className='hero-banner-image' alt="headphones-images"  />

        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>{heroBanner.desc}</h5>
            <p className='beats-solo'>{heroBanner.smallText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner