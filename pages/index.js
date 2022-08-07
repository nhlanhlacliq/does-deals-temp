import React, { useEffect, useState } from 'react';
import { client } from '../lib/client';

import { Product, Deal, FooterBanner, HeroBanner } from '../components';  
import Select from 'react-select';
import { parseDays, 
  dayFilterOptions, parseFoodTypes, parseAreas } from '../utils/helpers';

const Home = ({ products, deals, bannerData }) => {
  const [ filteredDeals, setFilteredDeals ] = useState(deals);
  
  const foodFilterOptions = parseFoodTypes(filteredDeals);
  const [ dayFilter, setDayFilter ] = useState(dayFilterOptions[0]);
  const [ foodFilter, setFoodFilter ] = useState(foodFilterOptions[0]);
  
  const areaFilterOptions = parseAreas(filteredDeals);
  const [ areaFilter, setAreaFilter ] = useState(areaFilterOptions[0]);
  const [ location, setLocation ] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          'lat': position.coords.latitude,
          'lng': position.coords.longitude
        });
        console.log(location);
      }, 

      (error) => {
        error.message === 'User denied Geolocation' 
        ? window.alert('Please enable your location permissions to use location filtering.')
        : console.log('Location error:' + error.message);
      });

    } else {
      console.log("Not Available");
    }
  }, [])

  // console.log(location);
  // console.log(areaFilterOptions);

  const filterDealsByDay = (day) => {
    setDayFilter(day);
  };

  const filterDealsByFoodType = (type) => {
    setFoodFilter(type);
  }

  const filterDealsByArea = (area) => {
    setAreaFilter(area);
  }

  useEffect(() => {
    filterDeals();
  }, [dayFilter, foodFilter, areaFilter]);

  const filterDeals = () => {
    let filterList = []
    if (dayFilter.value !== 'all-specials'){
      filterList = deals.filter(d => 
        JSON.stringify(parseDays(d.days)).includes(JSON.stringify(dayFilter))
      ); 
    } else {
      filterList = deals;
    }
    
    if (foodFilter.value !== 'all-types'){
      filterList = filterList.filter(d => 
        JSON.stringify(d.food.flat()).includes(JSON.stringify(foodFilter))
      );
    }

    // TODO:
    if (areaFilter.value !== 'all-areas'){
      console.log(areaFilter);
      filterList = filterList.filter(d => 
        d.area.includes(areaFilter.label)
      );
    }

    setFilteredDeals(filterList);
  }

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading' >
        <h2> Best Deals </h2>
        <p>In and around Stellenbosch</p>
      </div>

      {/* {TODO: styling || Show all | show today} */}
      <div className="filter-section">
        <Select options={dayFilterOptions} onChange={filterDealsByDay} value={dayFilterOptions[0]} />
        <Select key={`select-${foodFilter}`} options={foodFilterOptions} onChange={filterDealsByFoodType} value={foodFilterOptions[0]} />
        <Select options={areaFilterOptions} onChange={filterDealsByArea} value={areaFilterOptions[0]} />
      </div>

      <div className='products-container' >
        {filteredDeals?.map(
          (deal) => <Deal 
          key={deal._id} deal={deal}/>)
        }
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