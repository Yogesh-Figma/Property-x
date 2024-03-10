import { get, post } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


async function getUserVisits(id, accessToken) {
    return Promise.allKeys({
        upcoming: get(`${API_CLIENT_URL}/get/visit/by/user/id/${id}`, {
            next: { cache: false },
            headers: { 'x-auth-token': accessToken }
        }),
        visited: get(`${API_CLIENT_URL}/get/visited/data/by/user/id/${id}`, {
            next: { cache: false },
            headers: {
                'x-auth-token': accessToken
            }
        })
    })
}

// Sample data : {
//   "projectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "propertyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//   "scheduledDateTime": 0,
//   "exclusive": true,
//   "status": "PLANNED",
//   "type": "E_VISIT"
// }

function scheduleVisit({ userId, data, accessToken }) {
    return post(`${API_CLIENT_URL}/save/visit/by/user/id/${userId}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': accessToken
        }
    });
}


export {
    getUserVisits,
    scheduleVisit
}