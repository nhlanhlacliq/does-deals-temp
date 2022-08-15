import { RiAdvertisementLine } from "react-icons/ri";
import { getDealInfo } from './helper/helpers';

export default {
    name: 'banner',
    title: 'Banner Deal',
    type: 'document',
    icon: RiAdvertisementLine,
    fields: [
        {
            name: 'deal',
            Title: 'Deal',
            type: 'reference',
            to: [{type: 'deal'}]
        },
        // {
        //     name: 'slug',
            
        // },
        {
            name: 'buttonText',
            title: 'ButtonText',
            type: 'string',
        },
        {
            name: 'smallText',
            title: 'SmallText',
            type: 'string',
        },
        {
            name: 'midText',
            title: 'MidText',
            type: 'string',
        },
        {
            name: 'largeText1',
            title: 'LargeText1',
            type: 'string',
        },
        {
            name: 'largeText2',
            title: 'LargeText2',
            type: 'string',
        },
        {
            name: 'discount',
            title: 'Discount',
            type: 'string',
        },
        {
            name: 'saleTime',
            title: 'SaleTime',
            type: 'string',
        },
        {
            name: 'desc',
            title: 'Desciption',
            type: 'string'
        }
    ],
    preview: {
        select: {
            title: 'smallText',
        },
    }
};