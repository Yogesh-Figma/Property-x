import { post, put } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
//Returns property listing type like: Apartment, Independent Floor
function updateUserData({ userId, data, accessToken }) {
    return put(`${API_CLIENT_URL}/user/update/by/${userId}`, data, {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }
    });
}

export {
    updateUserData
}