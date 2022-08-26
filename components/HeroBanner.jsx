import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';


const HeroBanner = ({ heroBanner }) => {
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='banner-small-text'>{heroBanner.smallText}</p>
            <h3 className='banner-mid-text'>{heroBanner.midText}</h3>
            <h1 className='banner-large-text'>{heroBanner.largeText1}</h1>
            <img src={urlFor(heroBanner.deal.image[0])} alt='headphones' className='hero-banner-image' />

            <div>
                <Link href={`/deal/${heroBanner.deal.slug.current}`}>
                    <button type='button'>{heroBanner.buttonText}</button>
                </Link>
                <div className='banner-desc' >
                    <h5>Known for</h5>
                    <p>{heroBanner.desc}</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default HeroBanner