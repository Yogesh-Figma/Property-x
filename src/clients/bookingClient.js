import { get, post } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;

function bookProperty(data, accessToken) {
    return post(`${API_CLIENT_URL}/save/new/booking/with/owners`, data, {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }
    });
}


export {
    bookProperty
}