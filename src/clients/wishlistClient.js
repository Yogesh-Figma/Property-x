
'use server'
import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


async function getUserWishlist(id, accessToken) {
    return get(`${API_CLIENT_URL}/get/wishlist/by/user/id/${id}`, {
        next: { cache: false },
        headers: { 'x-auth-token': accessToken }
    })
}


export {
    getUserWishlist
}