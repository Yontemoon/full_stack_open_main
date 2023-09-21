const filterReducer = (state = null, action) => {

    //REDUCER
    switch (action.type) {
        case 'SET_FILTER': 
            return action.filter
        default: 
            return state
    }
}
//ACTION?
export const filterChange = (filter) => {
    return {
        type: 'SET_FILTER',
        filter: filter,
    }
}

export default filterReducer