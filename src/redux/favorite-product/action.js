import * as Actions from './constants'

export const getFavoriteProducts = (id)=>{
    return{
        type:Actions.GET_FAVORITE_PRODUCTS,
        payload:id
    }
}

export const removeFavoriteProduct = (uid, pid)=>{
    return{
        type:Actions.REMOVE_FAVORITE_PRODUCT,
        payload:{uid,pid}
    }
}

export const addFavoriteProduct = (uid,data)=>{
    return{
        type:Actions.ADD_FAVORITE_PRODUCT,
        payload:{uid,data}
    }
}
// export const hideTabbar = ()=>{
//     return{
//         type:Actions.HIDE_TABBAR,
//     }
// }