import {AiOutlineEnvironment} from 'react-icons/ai'

export default {
    name: 'location',
    title: 'Location',
    type: 'document',
    icon: AiOutlineEnvironment,

    fields: [
        {
            name: 'area',
            title: 'Area',
            type: 'string',
            validation: Rule => Rule.required().warning(),
            description: 'General area name, shown next to deal.'
        },
        {
            name: 'address',
            title: 'Address',
            type: 'string',
            validation: Rule => Rule.required().warning(),
            description: 'Specific address, shown on Google maps. E.g. \"Food Lover\'s Market Willowbridge, Belville\". Use the restaurant\'s name if a deal is National or similar - This is the search term Google maps will need.',
        }
    ],
    preview: {
        select: {
          title: 'area',
          subtitle: 'address'
        }
    }
}