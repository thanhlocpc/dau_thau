import { FA5Style } from 'react-native-vector-icons/fontawesome5'
import * as Actions from './constants'



export const initState = {
    isLoading: false,
    cart: [],
    totalAmount: 0,
    numberOfProduct: 0
}

export default cartReducer = (state = initState, action) => {

    const { type, payload } = action
    // const {cart, totalAmount, numberOfProduct} = payload

    switch (type) {
        case Actions.GET_CART_START:
            return { ...state, isLoading: true }
        case Actions.ADD_TO_CART_START:
            return { ...state, isLoading: true }
        case Actions.ADD_TO_CART_SUCCESS:
            return { ...state, isLoading: false }
        case Actions.GET_CART_END:
            return { ...state, isLoading: false }
        case Actions.GET_CART_SUCCESS:
            return { ...state, isLoading: false, cart: payload.cart, totalAmount: payload.totalAmount, numberOfProduct: payload.numberOfProduct }
        default:
            return state;
    }

}