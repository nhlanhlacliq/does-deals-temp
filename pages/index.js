import React, { useState } from 'react';
import { client } from '../lib/client';

import { Product, Deal, FooterBanner, HeroBanner } from '../components';  
import { parseDays } from '../utils/helpers';
import Select from 'react-select';
import { dayFilterOptions } from '../utils/helpers';

const Home = ({ products, deals, bannerData }) => {
  const [ filteredDeals, setFilteredDeals ] = useState(deals);

  // console.log(deals.map(d => d.food))

  const filterDealsByDay = (day) => {
    const dealsFiltered = day.value === 'all-specials' 
    ? deals
    : deals.filter(d => 
        JSON.stringify(parseDays(d.days)).includes(JSON.stringify(day))
      );
    
    setFilteredDeals(dealsFiltered);
  };

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading' >
        <h2> Best Deals </h2>
        <p>In and around Stellenbosch</p>
      </div>

      {/* {TODO: styling || Show all | show today} */}
      <div className="filter-section">
        <Select options={dayFilterOptions} onChange={filterDealsByDay} />
      </div>

      <div className='products-container' >
        {filteredDeals?.map(
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