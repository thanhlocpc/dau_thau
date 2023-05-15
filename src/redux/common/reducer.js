import { FA5Style } from 'react-native-vector-icons/fontawesome5'
import * as Actions from './constants'



export const initState = {
    isShowTabbar: true
}

export default commonReducer = (state = initState, action) => {

    const { type, payload } = action

    switch (type) {
        case Actions.SHOW_TABBAR:
            return { ...state, isShowTabbar: true }
        case Actions.HIDE_TABBAR:
            return { ...state, isShowTabbar: false }
        default:
            return state;
    }

}