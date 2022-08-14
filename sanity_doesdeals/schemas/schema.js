import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import banner from './banner';
import deal from './deal';
import foodType from './foodType';
import location from './location';
import restaurant from './restaurant';

export default createSchema({
  name: 'Deals',
  types: schemaTypes.concat([
    banner, 
    deal,
    restaurant,
    location,
    foodType
  ]),
})
