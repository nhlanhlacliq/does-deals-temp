import { AiFillSetting } from "react-icons/ai";

export default  {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    icon: AiFillSetting,
    description: 'Settings that can be used to dynamically customize the site without needing code changes. You can suggest things you\'d like to control in the site from this menu',

    fieldsets: [
        {
          name: 'overhead',
          title: 'Overhead Settings',
        },
        {
            name: 'deal',
            title: 'Deal settings',
            options: {columns: 1},
        },
        {
            name: 'home',
            title: 'Home page settings',
            options: {columns: 2},
        }
    ],

    fields: [
        {
            name: 'name',
            title: 'Site name/title',
            type: 'string',
            description: 'The Website\'s name',
            fieldset: 'overhead'
        },
        {
            name: 'description',
            title: 'Meta description',
            type: 'text',
            fieldset: 'overhead'
        },
        {
            name: 'icon',
            title: 'Site Icon',
            type: 'image',
            fieldset: 'overhead'
        },
        {
            name: 'homeName',
            title: 'Home page name',
            type: 'string',
            description: '(Top left) Default is "Doesdeals\"',
            fieldset: 'home'
        },
        {
            name: 'homeTitle',
            title: 'Home page title',
            type: 'string',
            description: '(After banner) Default is "Best Deals\"',
            fieldset: 'home'
        },
        {
            name: 'homeSubtitle',
            title: 'Home page subtitle',
            type: 'string',
            description: 'Default is "In and around Stellenbosch\"',
            fieldset: 'home'
        },
        {
            name: 'imageDefault',
            title: 'Deal image default',
            type: 'image',
            validation: Rule => Rule.required().warning(),
            description: 'The default image shown in case a deal\'s image is missing',
            fieldset: 'deal'
        },
    ]
}