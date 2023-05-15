import * as Actions from './constants'



export const initState = {
    isLoading: false,
    items: [],
    error: ''
}

export default recentProductReducer = (state = initState, action) => {

    const { type, payload } = action

    switch (type) {
        case Actions.GET_RECENT_PRODUCTS_SUCCESS:
            return { ...state, isLoading: false, items: payload, error: '' }
        case Actions.GET_RECENT_PRODUCTS_FAIL:
            return { ...state, isLoading: false, error: payload }
        case Actions.GET_RECENT_PRODUCTS_START:
            return { ...state, isLoading: true, error: '' }
        default:
            return state;
    }

}