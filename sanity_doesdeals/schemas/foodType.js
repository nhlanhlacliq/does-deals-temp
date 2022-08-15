import { BiFoodMenu } from "react-icons/bi";

export default  {
    name: 'foodType',
    title: 'Food Type',
    type: 'document',
    icon: BiFoodMenu,

    fields: [
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            validation: Rule => Rule.required().warning()
        }
    ]
}