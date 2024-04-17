import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


async function getQueryByUser(id, accessToken) {
    return get(`${API_CLIENT_URL}/get/query/by/user/id/${id}`, {
        next: { cache: false },
        headers: { 'x-auth-token': accessToken }
    })
}


export {
    getQueryByUser
}