const dayOptions = [
    { label: 'Monday',      value: 'monday'     },
    { label: 'Tuesday',     value: 'tuesday'    },
    { label: 'Wednesday',   value: 'wednesday'  },
    { label: 'Thursday',    value: 'thursday'   },
    { label: 'Friday',      value: 'friday'     },
    { label: 'Saturday',    value: 'saturday'   },
    { label: 'Sunday',      value: 'sunday'     },
]

export const dayFilterOptions = [
        { label: 'All specials', value: 'all-specials'}
    ].concat(dayOptions);

/**
 * Parses days object from Sanity and 
 * Returns a list containing days of week objects
 */
export const parseDays = (array) => {
    
    let res = [];

    for (let index = 0; index < array.length; index++) {
        const object = array[index];
        
        switch (object.value) {
            case 'whole-week': 
                res = res.concat(dayOptions);
                break;
            case 'weekend':
                res = res.concat(dayOptions.slice(5));
                break;
            case 'mon-fri':
                res = res.concat(dayOptions.slice(0, 5));
                break;
            default :
                res = res.concat(object);
                break;
        }
    }

    return res;
};

export const parseFoodTypes = (deals) => {
    const foodTypes = deals.map(d => {
            return d.food
        }).flat();
    
    // Done to remove duplicates
    const foodTypeList = Array.from(new Set(foodTypes.map(t => t.value)));

    const types = [
        { label: 'All food types', value: 'all-types'}
        ].concat(foodTypeList.map(t => {
        return {
            label: `${t}`,
            value: `${t.replace(' ', '-')}`
        }
    }))

    return types
}

export const parseAreas = (deals) => {
    
    // Done to remove duplicates
    const areasList = Array.from(new Set(deals.map(d => d.area)))
    
    const areas = [
        { label: 'All areas', value: 'all-areas'}
        ].concat(areasList.map(a => {
            return {
                label: `${a}`,
                value: `${a.replace(' ', '-').toLowerCase()}`
            }
        })); 
    
    return areas; 
}