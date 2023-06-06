import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { baseUrl } from '../../uitls/domain';
import Global from '../../uitls/Global';

export const login = async (username, password) => {
    return await fetch(`${baseUrl}/auth/authenticate`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ username, password }),
        redirect: 'follow'
    }).then(res => res.json())
        .catch(e => {
            console.log(e, "login");
            return e
        })
}

export const signup = async (email, firstName, lastName, address, phoneNumber, password) => {
    return await fetch(`${baseUrl}/auth`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify({ email, firstName, lastName, address, phoneNumber, password }),
    }).then(res => res.json())
        .catch(e => {
            console.log(e, "signup")
            return e
        })
}


export const getUser = async (email) =>
    await fetch(`${baseUrl}/users?_email=${email}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Global.getToken()}`
        },
    })
        .then(res => res.json())
        .catch(e => {
            console.log(e, "get user")
            return e
        })


