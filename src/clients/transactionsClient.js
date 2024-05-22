import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


function getTransactionsByUserId(accessToken, userId) {
    return get(`${API_CLIENT_URL}/get/booking/transactions/by/user/id/${userId}`, {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }});
}

export {
    getTransactionsByUserId
}