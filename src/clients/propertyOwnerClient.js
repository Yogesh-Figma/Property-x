
import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


async function getPostedProperties(id, accessToken) {
    return get(`${API_CLIENT_URL}/get/properties/owners/by/user/id/${id}`, {
        next: { cache: false },
        headers: { 'x-auth-token': accessToken }
    })
}


export {
    getPostedProperties
}