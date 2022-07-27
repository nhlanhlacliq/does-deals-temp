import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Deal = ({ deal: { image, restaurant, special, slug, days } }) => {
  return (
    <div>
      <Link href={`/deal/${slug.current}`} >
        <div className='product-card' >
          <img 
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className='product-image'
          />
          <p className='product-name'>{restaurant}</p>
          <p className='product-price'>{special}</p>
        </div>
      </Link>
    </div>
  )
}

export default Deal;