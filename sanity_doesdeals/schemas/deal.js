import { BiRightArrow } from 'react-icons/bi';
import { asyncSlugifier, capitalize } from './helper/helpers';

export default  {
    name: 'deal',
    title: 'Deal',
    type: 'document',
    icon: BiRightArrow,

    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true,
            },
            description: 'You can use Unsplash(Add item, then click on select, then unsplash) if pictures aren\'t avalilable. Or alternatively, the company logo',
            validation: Rule => Rule.required()
        },
        {
            name: 'restaurant',
            title: 'Restaurant',
            type: 'reference',
            to: [{type: 'restaurant'}]
        },
        {
            name: 'special',
            title: 'Special',
            type: 'string',
            validation: Rule => Rule.required().warning()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            description: 'Click \'Generate\'. This will be the deal\'s URL',
            options: {
                source: (doc, options) => ({ doc, options }),
                slugify: asyncSlugifier,
                maxLength: 90,
            }
        },
        {
            name: 'days',
            title: 'Days',
            type: 'tags',
            options: {
                predefinedTags: [
                    {label: 'Monday', value: 'monday'},
                    {label: 'Tuesday', value: 'tuesday'},
                    {label: 'Wednesday', value: 'wednesday'},
                    {label: 'Thursday', value: 'thursday'},
                    {label: 'Friday', value: 'friday'},
                    {label: 'Saturday', value: 'saturday'},
                    {label: 'Sunday', value: 'sunday'},
                    {label: 'Mon-Fri', value: 'mon-fri'},
                    {label: 'Weekend only', value: 'weekend'},
                    {label: 'Whole week', value: 'whole-week'},
                ],
                allowCreate: false
            }
        },
        {
            name: 'food',
            title: 'Food type',
            type: 'reference',
            to: [{type: 'foodType'}],
            validation: Rule => Rule.required().warning(),
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
            validation: Rule => Rule.required().warning(),
        },
        {
            name: 'details',
            title: 'Details',
            description: 'Any extra details on the special',
            type: 'text',
        },
    ],
    preview: {
        select: {
            title: 'special',
            slug: 'slug'
        },
        prepare(selection) {
            const {title, slug} = selection
            return {
                title: capitalize(slug.current.split('--')[0]).replaceAll('-',' '),
                subtitle: title,
                media: 'image'
            }
        }
    }
}