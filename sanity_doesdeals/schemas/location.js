import {AiOutlineEnvironment} from 'react-icons/ai'

export default {
    name: 'location',
    title: 'Location',
    type: 'document',
    icon: AiOutlineEnvironment,

    fields: [
        {
            name: 'area',
            title: 'Area/Location',
            type: 'string',
            validation: Rule => Rule.required().warning(),
        },
        {
            name: 'location',
            title: '(GoogleMap) Area/Location',
            type: 'geopoint',
        },
        {
            name: 'details',
            title: 'Details',
            description: 'Any extra details on the location',
            type: 'text',
        }
    ]
}