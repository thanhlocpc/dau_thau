import * as Actions from './constants'

export const showTabbar = ()=>{
    return{
        type:Actions.SHOW_TABBAR,
    }
}
export const hideTabbar = ()=>{
    return{
        type:Actions.HIDE_TABBAR,
    }
}