import sanityClient from 'part:@sanity/base/client';

export const asyncSlugifier = async (input) => {
  const client = sanityClient.withConfig({
      // Using the Sanity client without specifying the API version is deprecated
    apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2021-07-21', 
  });
  // a GROQ query, feel free to change this up to match what you need
  const restaurantQuery = '*[_id == $id][0]'; 
  const restaurantQueryParams = {
    id: input.doc.restaurant?._ref || '',
  };
  const restaurant = await client.fetch(
        restaurantQuery,
        restaurantQueryParams,
    );
    // if there's no parent assign an empty string, it will make the function return the current slug as the root
    const restaurantSlug = restaurant?.slug?.current ? `${restaurant.slug.current}` : ''; 
  
    const dealSlug = input.doc.special
    .toLowerCase()
    .replace(/\s+/g, '-') // slugify the title using a simple regex
    .slice(0, 200)
    .replaceAll('%', '');

  return `${restaurantSlug}--${dealSlug}`;
}

export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * @param {*} ref reference object to search for
 * @returns Title and subtitle for preview 
 */
export const getDealInfo = async (ref) => {
    const client = sanityClient.withConfig({
        apiVersion: process.env.SANITY_STUDIO_API_VERSION || '2021-07-21', 
    });
    const query = '*[_id == $id][0]'; 
    const queryParams = {
        id: ref?._ref || '',
    };
    const deal = await client.fetch(
        query,
        queryParams,
    );
    
    const result = {
        // title: capitalize(deal.slug.current.split('/')[0]).replace('-', ' '),
        title: capitalize(deal.restaurant.name),
        subtitle: capitalize(deal.special)
    }

    return result
}