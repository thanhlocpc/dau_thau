import { baseUrl } from "../../uitls/domain";
import Global from "../../uitls/Global";

export const insertTenderContract = async (data) => {
    return await fetch(`${baseUrl}/tender_contracts`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Global.getToken()}`,
        },
        body: JSON.stringify(data),
    })
        .then(res => res)
        .catch(e => {
            console.log(e, "insertTenderContract")
            return e
        })
}

export const joinTenderContract = async (email) => {
    return await fetch(`${baseUrl}/bids`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Global.getToken()}`,
        },
        body: JSON.stringify(data),
    })
        .then(res => res.json())
        .catch(e => {
            console.log(e, "joinTenderContract")
            return e
        })
}

export const getBids = async (email) => {
    return await fetch(`${baseUrl}/bids?_owner_email=${email}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${Global.getToken()}`,
        },
    })
        .then(res => res.json())
        .catch(e => {
            console.log(e, "get bids")
            return e
        })
}

