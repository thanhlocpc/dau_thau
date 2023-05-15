import { FA5Style } from 'react-native-vector-icons/fontawesome5'
import * as Actions from './constants'



export const initState = {
    isLoading: false,
    user: null,
    login_error: "",
    isLogin: false,
    tryLoginLocal: false,
}

export default authReducer = (state = initState, action) => {

    const { type, payload } = action

    switch (type) {
        case Actions.LOGIN_LOADING:
            return { ...state, isLoading: true }
        case Actions.LOGIN_SUCESS:
            return { ...state, isLoading: false, user: payload, login_error: '', isLogin: true }
        case Actions.LOGIN_FAIL:
            return { ...state, isLoading: false, login_error: payload }
        case Actions.SIGNUP_LOADING:
            return { ...state, isLoading: true }
        case Actions.SIGNUP_SUCESS:
            return { ...state, isLoading: false, user: payload, login_error: '', isLogin: true }
        case Actions.SIGNUP_FAIL:
            return { ...state, isLoading: false, login_error: payload }
        case Actions.TRY_LOGIN_LOCAL_START:
            return { ...state, tryLoginLocal: true }
        case Actions.TRY_LOGIN_LOCAL_END:
            return { ...state, tryLoginLocal: false }
        case Actions.LOGOUT_SUCCESS:
            return { ...state, user:null, isLogin:false }
        default:
            return state;
    }

}