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

var raw = JSON.stringify({
    "title": "a",
    "description": "a",
    "technicalInfo": "a",
    "requirements": "a",
    "startDateTime": "2023-05-26T03:30:00",
    "endDateTime": "2023-05-01T00:00:00",
    "minimumAmount": "5",
    "category": "HANGHOA",
    "files": []
});