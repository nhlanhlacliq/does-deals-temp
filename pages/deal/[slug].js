import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiFillStar, AiOutlineStar, AiFillCalendar, AiFillEnvironment }from 'react-icons/ai'
import Select from 'react-select';

import { Deal } from '../../components';
import { BiFoodMenu } from 'react-icons/bi';
import { useEffect } from 'react';
import { customStylesSlug } from '../../utils/styles';

import { Modal } from '../../components';
import { MapModal } from '../../components';


const DealDetails = ({ deal, deals }) => {
    const { _id, 
            image, 
            restaurant, 
            special,
            food, 
            days, 
            rating, 
            details } = deal;
    const [ index, setIndex ] = useState(0);

    let starRating = Array.from('1'.repeat(Number(rating.value)));
    while (starRating.length < 5) {
        starRating.push(0);
    }

    const dealsInSameShop = deals.filter(d => 
        (d.restaurant.name === restaurant.name) && (d._id !== _id)
    );

    const dealsInSameArea = deals.filter(d => 
        (d.restaurant.area.area === restaurant.area.area) && (d._id !== _id)
    );

    const dealsWithSameFood = deals.filter(d => 
        (d.food.type === food.type) && (d._id !== _id)
    );

    /**
     * State for modal. Temporary
     */
    const [ modalOpen, setModalOpen ] = useState(false);

    const toggleModal = () => {
      setModalOpen(!modalOpen)
    }

    /**
     * React select
     */
    const otherOptions = []
    .concat(restaurant.area.area)
    .concat(food.type)

    const shownDealOptions = [{
        label: 'Other', value: 'Other'
    }].concat(otherOptions.map(o => ({
        label: `${o}`,
        value: `${o}`,
        isDisabled: o == restaurant.area.area 
        ?   dealsInSameArea.length > 0 ? false : true
        :   dealsWithSameFood.length > 0 ? false : true
    })))
    const [ shownDeals, setShownDeals ] = useState(shownDealOptions[0]);
    
    
    /**
     * Deal filterings
     */
    const coveredDealIds = [_id]
        .concat(dealsInSameShop.map(d => d._id))
        .concat(dealsInSameArea.map(d => d._id))
        .concat(dealsWithSameFood.map(d => d._id));

    const otherDeals = deals.filter(d =>
        !coveredDealIds.includes(d._id)
    );

    const onSelectChange = (e) => { 
        if (e.value === food.type){
            // setShownDeals(dealsWithSameFood);
            setShownDeals(shownDealOptions[2]);
        }
        else if (e.value === restaurant.area.area) {
            // setShownDeals(dealsInSameArea);
            setShownDeals(shownDealOptions[1]);
        }
        else {
            // setShownDeals(otherDeals);
            setShownDeals(shownDealOptions[0]);
        }
        // console.log(shownDeals);
    }

    const [filteredDeals, setFilteredDeals] = useState(otherDeals);

    useEffect(() => {

        if (shownDeals.value === food.type) {
            setFilteredDeals(dealsWithSameFood);
        }
        else if (shownDeals.value === restaurant.area.area) {
            setFilteredDeals(dealsInSameArea);
        }
        else {
            setFilteredDeals(otherDeals);
        }

    },[shownDeals ]);


    const setMarqueeElements = () => {
        if (typeof window !== "undefined") {
            const root = document.documentElement;
            // const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue('--marquee-elements');

            root.style.setProperty('--marquee-elements', filteredDeals.length );
        }
    }

    return (
    <div>
        <div className='product-detail-container' >
            { image ? 
            <div>
                <div className='image-container' >
                    <img src={urlFor(image && image[index])} className='product-detail-image' />
                </div>
                <div className='small-image-container' >
                    {image?.map((item, i) => (
                        <img key={i}
                        src={urlFor(item)}
                        className={i === index ? 
                            'small-image selected-image' :
                            'small-image'}
                            onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                </div>
            </div>
            : <p> Loading images... </p>
            }
                <div className='product-detail-desc' >
                    <h1>{restaurant.name}</h1>
                    
                    <div className='reviews' >
                        <div>
                            {starRating.map(star => 
                                star ? <AiFillStar/>
                                : <AiOutlineStar/>)
                            }
                        </div>
                    {/* <p> (20) </p> */}
                    </div>
                    <p><BiFoodMenu/>{food.type}</p>
                    <br/>
                    <h4>Details: </h4>
                    <p>{special}</p>
                    {details && <p><em> {details} </em></p>}
                    
                    {/* TODO: */}
                    <div className='days' >
                        <p className='price' > 
                            <AiFillCalendar/> <span></span>
                            {days.map(day => (
                                day === days[days.length - 1] ?
                                day.label :
                                day.label + ', '
                            ))}
                        </p>
                    </div>

                    <div className='area' >
                            <p className='price'> 
                                <AiFillEnvironment/> <span></span>
                                {restaurant.area.area}
                            </p>
                    </div>

                    {/* TODO: */}
                    <div className='buttons' >
                        <a href={restaurant.website} target='_blank'>
                            <button type='button' className='add-to-cart'>
                                View site
                            </button>
                        </a>
                        <a href='#' >
                            <button type='button' className='buy-now'
                            onClick={() => toggleModal()}
                            >
                                Visit now
                            </button>
                        </a>
                        
                    </div>
                </div>
        </div>

        { modalOpen && <MapModal deal={deal} closeModal={() => toggleModal()} /> }
        
        
        { dealsInSameShop.length > 0 && 
            <div className='other-products-wrapper'>
                <h2>Our other deals</h2>
                <div className='products-container' >
                    {dealsInSameShop?.map((deal) => 
                    <Deal key={deal._id} deal={deal}/>
                    )}
                </div>
            </div>
        }

        <div className='maylike-products-wrapper' >
            <h2>
                <Select 
                    options={shownDealOptions} 
                    onChange={onSelectChange} 
                    value={shownDeals}
                    styles={customStylesSlug}
                    isSearchable={false}
                />
                deals 
            </h2>
            
            <div className='marquee' >
                <div className={filteredDeals.length > 3 
                ? 'maylike-products-container track'
                : 'maylike-products-container'}
                style={{"--marquee-elements": filteredDeals.length}}>
                    {setMarqueeElements()}
                    {filteredDeals.map((d) => (
                        <Deal key={d._id} deal={d} /> 
                    ))}
                    
                    {/* Duplicated to prevent scrolling deals from having
                        whitespace gap inbetween last and fist deal */}
                    
                    {filteredDeals.length > 3 && filteredDeals.map((d) => (
                        <Deal key={d._id} deal={d} /> 
                    ))}
                </div>
            </div>
        </div>

    </div>
  )
}

//TODO:
export const getStaticPaths = async () => {
    const query =  `*[_type == "deal"] {
        slug {
            current
        }
    }
    `;
    
    const deals = await client.fetch(query);
    
    const paths = deals.map((deal) => ({
        params: {
            slug: deal.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
} 

export const getStaticProps = async ({ params: { slug } }) => {
    const dealQuery = `*[_type == "deal" && slug.current == '${slug}'][0]{
        ...,
        food->,
        restaurant->{
            ...,
            area->
        }
    }`;
    const dealsQuery =  `*[_type == "deal"]{
        ...,
        food->,
        restaurant->{
            ...,
            area->
        }
    }`;

    const deal = await client.fetch(dealQuery);
    const deals = await client.fetch(dealsQuery);

    return {
      props: { deal, deals }
    }
}

export default DealDetails