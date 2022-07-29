import React from 'react';
import { client } from '../lib/client';

import { Product, Deal, FooterBanner, HeroBanner } from '../components';  

const Home = ({ products, deals, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading' >
        <h2> Best Deals </h2>
        <p>In and around Stellenbosch</p>
      </div>


      {/* <div className='products-container' >
        {products?.map(
          (product) => <Product 
          key={product._id} product={product}/>
        )}
        </div> */}

      <div className='products-container' >
        {deals?.map(
          (deal) => <Deal 
          key={deal._id} deal={deal}/>
        )}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  )
}

export const getServerSideProps  = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  
  const dealsQuery = '*[_type == "deal"]';
  const deals = await client.fetch(dealsQuery);
  
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, deals, bannerData }
  }
}

export default Home;