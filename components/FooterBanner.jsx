import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const FooterBanner = ({ footerBanner: { 
  discount, largeText1, largeText2, saleTime, smallText, 
  midText, deal, desc, buttonText } }) => {
  
    return (
    <div className='footer-banner-container' >
      <div className='footer-banner-desc' >
        <div className='left' >
          <p>{deal.special}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{deal.details}</p>
        </div>
        <div className='right' >
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/deal/${deal.slug.current}`} >
            <button type='button'>{buttonText}
            </button>
          </Link>
        </div>

        {/* <img src={urlFor(deal.image[0])} className='footer-banner-image' /> */}
      </div>
    </div>
  )
}

export default FooterBanner