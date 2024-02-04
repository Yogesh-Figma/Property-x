
import { post } from './fetchWrapper';

const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;

function saveTalkToConslt(userId, data, accessToken) {   
    return post(`${API_CLIENT_URL}/save/query/by/user/id/${userId}`, data, {
        next: { cache: false },
        headers: { 'x-auth-token': accessToken }
    })
}

export {
    saveTalkToConslt
}