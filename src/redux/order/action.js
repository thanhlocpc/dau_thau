import * as Actions from './constants'

export const getOrders = (id)=>{
    return{
        type:Actions.GET_ORDERS,
        payload:id
    }
}
export const getOrdersNoShowLoading = (id)=>{
    return{
        type:Actions.GET_ORDERS_NO_SHOW_LOADING,
        payload:id
    }
}
export const createOrder = (id, order)=>{
    return{
        type:Actions.CREATE_ORDER,
        payload:{id,order}
    }
}