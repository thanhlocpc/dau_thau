import * as Actions from './constants'

export const addToCart = (data) => {
    return { type: Actions.ADD_TO_CART, payload:data }
}

export const updateCart = (data) => {
    return { type: Actions.UPDATE_CART, payload:data }
}


export const clearCart = (id) => {
    return { type: Actions.CLEAR_CART, payload:id }
}
