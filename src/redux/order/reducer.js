import { FA5Style } from 'react-native-vector-icons/fontawesome5'
import * as Actions from './constants'



export const initState = {
    isLoading: false,
    orders: [],
    totalAmount: 0,
    numberOfProduct: 0,
    isLoadingOrder: false,
    error: false
}

export default orderReducer = (state = initState, action) => {

    const { type, payload } = action

    switch (type) {
        case Actions.GET_ORDERS_START:
            return { ...state, isLoading: true }
        case Actions.GET_ORDERS_SUCCESS:
            return { ...state, isLoading: false, orders: payload.order }
        case Actions.CREATE_ORDER_SUCCESS:
            return { ...state, isLoadingOrder: false, error: false }
        case Actions.CREATE_ORDER_START:
            return { ...state, isLoadingOrder: true }
        case Actions.GET_ORDERS_ERROR:
            return { ...state, error: true }
        default:
            return state;
    }

}