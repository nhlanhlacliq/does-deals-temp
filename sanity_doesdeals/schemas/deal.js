export default  {
    name: 'deal',
    title: 'Deal',
    type: 'document',
    description: 'Keep track of a restaurant\'s deals',

//filterby loc, date, foodtype
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true,
            },
            description: 'A nice picture of the deal (or something related) so users can whet their appetites',
            validation: Rule => Rule.required().warning()
        },
        {
            name: 'restaurant',
            title: 'Restaurant',
            type: 'string',
           
            // type: 'tag',
            // Errors: No 'min' on object. This is due to using the tag object. 
            // validation: Rule => Rule.required().min(2).warning("Minimum of 2 characters are required"),
            // options: {
            //     includeFromRelated: true
            // }
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
                source: doc => `${doc.restaurant}-${doc.special}`,
                maxLength: 90,
            }
        },
        {
            name: 'location',
            title: 'Restaurant Location',
            type: 'geopoint',
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
            type: 'tags',
        },
        {
            name: 'details',
            title: 'Details',
            description: 'Any extra details on the special',
            type: 'text',
        }
    ]
}