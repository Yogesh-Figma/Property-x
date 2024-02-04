import { get, post } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


async function getUserWishlist(id, accessToken) {
    return get(`${API_CLIENT_URL}/get/wishlist/by/user/id/${id}`, {
        next: { cache: false },
        headers: { 'x-auth-token': accessToken }
    })
}

function postWishlist(userId, data, accessToken) {
    return post(`${API_CLIENT_URL}/save/wishlist/by/user/id/${userId}`, data, {
        next: { cache: false },
        headers: { 'x-auth-token': accessToken }
    })
}

export {
    getUserWishlist,
    postWishlist
}