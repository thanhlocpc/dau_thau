import * as Actions from './constants'

export const getRecentProducts = (id)=>{
    return{
        type:Actions.GET_RECENT_PRODUCTS,
        payload:id
    }
}

export const removeRecentProduct = (uid, pid)=>{
    return{
        type:Actions.REMOVE_RECENT_PRODUCT,
        payload:{uid,pid}
    }
}

export const addRecentProduct = (uid,product)=>{
    return{
        type:Actions.ADD_RECENT_PRODUCT,
        payload:{uid,product}
    }
}
