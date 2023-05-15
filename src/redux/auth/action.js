import * as Actions from './constants'


export const login = (payload)=>{
    return{
        type:Actions.LOGIN,
        payload
    }
}


export const getUser = (payload)=>{
    return{
        type:Actions.GET_USER,
        payload
    }
}

export const signup = (payload)=>{
    return{
        type:Actions.SIGNUP,
        payload
    }
}
export const updateAddress = (uid, address)=>{
    return{
        type:Actions.UPDATE_ADDRESS,
        payload:{uid, address}
    }
}

export const updateName = (uid, name)=>{
    return{
        type:Actions.UPDATE_NAME,
        payload:{uid, name}
    }
}

export const updatPhone = (uid, phone)=>{
    return{
        type:Actions.UPDATE_PHONE,
        payload:{uid, phone}
    }
}

export const updateGender = (uid, gender)=>{
    return{
        type:Actions.UPDATE_GENDER,
        payload:{uid, gender}
    }
}

export const updateBirthday = (uid, birthday)=>{
    return{
        type:Actions.UPDATE_BIRTHDAY,
        payload:{uid, birthday}
    }
}
export const updateAvatar = (uid, urlAvt)=>{
    return{
        type:Actions.UPDATE_URLAVT,
        payload:{uid, urlAvt}
    }
}