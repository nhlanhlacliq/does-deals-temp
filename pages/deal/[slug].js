import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiFillStar, AiOutlineStar, AiFillCalendar, AiFillEnvironment }from 'react-icons/ai'

import { Deal } from '../../components';

const DealDetails = ({ deal, deals }) => {
    const { _id, 
            image, 
            restaurant, 
            special, 
            days, 
            location,
            area,
            rating, details } = deal;
    const [ index, setIndex ] = useState(0);
    
    let starRating = Array.from('1'.repeat(Number(rating.value)));
    while (starRating.length < 5) {
        starRating.push(0);
    }

    const similarDeals = deals.filter(d => 
        d.restaurant === restaurant && d._id !== _id
    )
    
    const otherDeals = deals.filter(d => 
        d.restaurant !== restaurant
    )

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
                    <h1>{restaurant}</h1>
                    
                    <div className='reviews' >
                        <div>
                            {starRating.map(star => 
                                star ? <AiFillStar/>
                                : <AiOutlineStar/>)
                            }
                        </div>
                    {/* <p> (20) </p> */}
                    </div>
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
                                {area}
                            </p>
                    </div>
                    
                    {/* TODO: */}
                    {/* <div className='quantity'>
                        <h3>Quantity:</h3>
                        <p className='quantity-desc' >
                            <span className='minus' onClick=''>
                                <AiOutlineMinus/>
                            </span>
                            <span className='num'>
                                0
                            </span>
                            <span className='plus' onClick=''>
                                <AiOutlinePlus/>
                            </span>
                        </p>
                    </div> */}
                    {/* {console.log(location)} */}

                    {/* TODO: */}
                    <div className='buttons' >
                        <button type='button' className='add-to-cart' onClick=''>
                            Visit now
                        </button>
                        <button type='button' className='buy-now' onClick=''>
                            Visit now
                        </button>
                    </div>

                </div>
        </div>
        
        { similarDeals && 
            <div className='other-products-wrapper'>
                <h2>Other deals</h2>
                <div className='products-container' >
                    {similarDeals?.map((deal) => 
                    <Deal key={deal._id} deal={deal}/>
                    )}
                </div>
            </div>
        }

        <div className='maylike-products-wrapper' >
            <h2>You may also like</h2>
            <div className='marquee' >
                <div className='maylike-products-container track' >
                    {otherDeals.map((d) => (
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
    const dealQuery = `*[_type == "deal" && slug.current == '${slug}'][0]`;
    const dealsQuery =  '*[_type == "deal"]';

    const deal = await client.fetch(dealQuery);
    const deals = await client.fetch(dealsQuery);

    return {
      props: { deal, deals }
    }
}

export default DealDetails