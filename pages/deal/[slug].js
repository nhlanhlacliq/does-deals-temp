import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar }from 'react-icons/ai'
import { Deal } from '../../components';

const DealDetails = ({ deal, deals }) => {
    const { image, restaurant, special, days, location } = deal;
    const [ index, setIndex ] = useState(0);

    return (
    <div>
        <div className='product-detail-container' >
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
                <div className='product-detail-desc' >
                    <h1>{restaurant}</h1>
                    
                    {/* TODO: */}
                    <div className='reviews' >
                        <div>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                        </div>
                        <p>
                            (20)
                        </p>
                    
                    </div>
                    <h4>Details: </h4>
                    <p>{special}</p>
                    
                    {/* TODO: */}
                    <p className='price' > {days.map(day => (
                        day === days[days.length - 1] ?
                        day.label :
                        day.label + ', '
                    ))} </p>
                    

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
                    {console.log(location)}

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

        <div className='maylike-products-wrapper' >
            <h2>You may also like</h2>
            <div className='marquee' >
                <div className='maylike-products-container track' >
                    {deals.map((d) => ( deal._id !== d._id 
                        ? <Deal key={d._id} deal={d} /> 
                        : null
                    ))}
                </div>
            </div>
        </div>

    </div>
  )
}

export const getStaticPaths = async () => {
    const query =  `*[_type == "product"] {
        slug {
            current
        }
    }
    `;
    
    const products = await client.fetch(query);
    
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
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