// Also found in styles.css as var 'main'
const mainColor = '#207f7f';

const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
  
    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
});

export const customStylesHome = (dayFilterOptions, foodFilterOptions, areaFilterOptions) => {
    return {
        singleValue: (styles, { data }) => {
            const dataStr = JSON.stringify(data);
            const dayFilters = JSON.stringify(dayFilterOptions)
            const foodFilters = JSON.stringify(foodFilterOptions)
            const areaFilters = JSON.stringify(areaFilterOptions)
            
            const style = (defaultSelected) => {
                return defaultSelected 
                ? { ...styles }
                : { ...styles, ...dot(mainColor) }
            }

            if (dayFilters.includes(dataStr)) {
                return style(JSON.stringify(data) === JSON.stringify(dayFilterOptions[0]));
            }
            
            if (foodFilters.includes(dataStr)) {
                return style(JSON.stringify(data) === JSON.stringify(foodFilterOptions[0]));
            }

            if (areaFilters.includes(dataStr)) {
                return style(JSON.stringify(data) === JSON.stringify(areaFilterOptions[0]));
            }
        }
    }
}

export const customStylesSlug = {
    container: (provided, state) => ({
        ...provided,
        paddingRight: 10,
    }),
    control: (provided, state) => ({
        ...provided,
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: '#324d67', // ????
    })
}

