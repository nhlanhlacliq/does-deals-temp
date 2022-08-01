export const dayOptions = [
    { label: 'Monday',      value: 'monday'     },
    { label: 'Tuesday',     value: 'tuesday'    },
    { label: 'Wednesday',   value: 'wednesday'  },
    { label: 'Thursday',    value: 'thursday'   },
    { label: 'Friday',      value: 'friday'     },
    { label: 'Saturday',    value: 'saturday'   },
    { label: 'Sunday',      value: 'sunday'     },
]

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