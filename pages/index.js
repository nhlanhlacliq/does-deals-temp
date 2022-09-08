import React, { useEffect, useState } from 'react';
import { client } from '../lib/client';

import { Deal, FooterBanner, HeroBanner } from '../components';  
import Select from 'react-select';
import { parseDays, dayFilterOptions, parseFoodTypes, parseAreas } from '../utils/helpers';
import { customStylesHome } from '../utils/styles'; 

const Home = ({ deals, bannerDeal, siteSettings }) => {
  // To add default image in case deal does not have image published from backend
  deals.forEach(deal => deal.image = deal.image || [siteSettings[0].imageDefault]);

  const [ filteredDeals, setFilteredDeals ] = useState(deals);
  
  const foodFilterOptions = parseFoodTypes(filteredDeals);
  const [ dayFilter, setDayFilter ] = useState(dayFilterOptions[0]);
  const [ foodFilter, setFoodFilter ] = useState(foodFilterOptions[0]);
  
  const areaFilterOptions = parseAreas(filteredDeals);
  const [ areaFilter, setAreaFilter ] = useState(areaFilterOptions[0]);
  
  /**
  * Currently disabled
  * 
  */ 
   
  // const [ location, setLocation ] = useState(null);

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     console.log("Available");
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setLocation({
  //         'lat': position.coords.latitude,
  //         'lng': position.coords.longitude
  //       });
  //       console.log(location);
  //     }, 

  //     (error) => {
  //       error.message === 'User denied Geolocation' 
  //       ? window.alert('Please enable your location permissions to use location filtering.')
  //       : console.log('Location error:' + error.message);
  //     });

  //   } else {
  //     console.log("Not Available");
  //   }
  // }, [])

  // console.log(location);


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
        d.food.type.includes(foodFilter.value)
      );
    }

    if (areaFilter.value !== 'all-areas'){
      filterList = filterList.filter(d => 
        d.restaurant.area.area.includes(areaFilter.label)
      );
    }

    setFilteredDeals(filterList);
  }
  
  return (
    <>
      <HeroBanner heroBanner={bannerDeal.length && bannerDeal[0]} />
      <div className='products-heading' >
        <h2>{siteSettings[0].homeTitle}</h2>
        <p>{siteSettings[0].homeSubtitle}</p>
      </div>

      <div className="filter-section">
        <Select 
          options={dayFilterOptions} 
          onChange={filterDealsByDay} 
          value={dayFilter}
          styles={customStylesHome(dayFilterOptions, foodFilterOptions, areaFilterOptions)}
          isSearchable={false}
        />

        <Select
          options={foodFilterOptions} 
          onChange={filterDealsByFoodType} 
          value={foodFilter}
          styles={customStylesHome(dayFilterOptions, foodFilterOptions, areaFilterOptions)}
        />
        
        <Select 
          options={areaFilterOptions} 
          onChange={filterDealsByArea} 
          value={areaFilter} 
          styles={customStylesHome(dayFilterOptions, foodFilterOptions, areaFilterOptions)}
        />
      </div>

      <div className='products-container' >
        {filteredDeals?.map(
          (deal) => <Deal 
          key={deal._id} deal={deal}/>)
        }
      </div>

      <FooterBanner footerBanner={bannerDeal && bannerDeal[0]}/>
    </>
  )
}

export const getServerSideProps  = async () => {
  const dealsQuery = `*[_type == "deal"] {
      ...,
      food->,
      restaurant->{
        ...,
        area->
      }
    }`;
  const deals = await client.fetch(dealsQuery);
  
  const bannerQuery = `*[_type == "banner"]{
    ...,
    deal->{
      ...,
      food->,
      restaurant->{
        ...,
        area->
      }
    }
  }`;
  const bannerDeal = await client.fetch(bannerQuery);

  const settingsQuery = `*[_type == "siteSettings"] {
      ...
    }`;
  const siteSettings = await client.fetch(settingsQuery);

  return {
    props: { deals, bannerDeal, siteSettings }
  }
}

export default Home;