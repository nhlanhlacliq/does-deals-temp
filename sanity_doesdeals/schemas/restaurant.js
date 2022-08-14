import { AiOutlineShop } from 'react-icons/ai'

export default  {
    name: 'restaurant',
    title: 'Restaurant',
    type: 'document',
    icon: AiOutlineShop,
    description: 'Keep track of a restaurant\'s deals',

    fields: [ 
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'The restaurant\'s brand logo if available',
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: Rule => Rule.required().warning()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Click \'Generate\'. This is needed for the deal\'s URL',
            options: {
                // source: doc => `${console.log(doc.restaurant)}}-${doc.special}`,
                source: (doc) => (doc.name),
            },
            validation: Rule => Rule.required().warning()
        },
        {
            name: 'area',
            title: 'Area',
            type: 'reference',
            validation: Rule => Rule.required().warning(),
            to: [{type: 'location'}]
        },
        {
            name: 'menu',
            title: 'Menu',
            type: 'file',
            description: 'PDF'
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'tag',
            options: {
                predefinedTags: [
                    {label: '1', value: '1'},
                    {label: '2', value: '2'},
                    {label: '3', value: '3'},
                    {label: '4', value: '4'},
                    {label: '5', value: '5'},
                ],
            },
            // validation: Rule => Rule.required().warning(),
        },
        {
            name: 'telephone',
            title: 'Telephone',
            type: 'string'
        },
        {
            name: 'website',
            title: 'Website',
            type: 'url'
        },
        {
            name: 'details',
            title: 'Details',
            description: 'Any extra details on the restaurant',
            type: 'text',
        }
    ]
}