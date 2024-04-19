
'use server'
import { get } from './fetchWrapper';

const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


function getFeaturedDevelopers() {
    return get(`${API_CLIENT_URL}/get/all/featured/developers`, { next: { revalidate: 3600 } });
}

function getAllDevelopers() {
    return get(`${API_CLIENT_URL}/get/all/developers`, { next: { revalidate: 3600 } });
}

function getDeveloperById(id, accessToken) {
    return get(`${API_CLIENT_URL}/get/developer/by/developer/id/${id}`, {
        cache: 'no-store',
        headers: {
            'x-auth-token': accessToken
        }
    });
}

function getDeveloperByUrlText(urlText, accessToken) {
    return get(`${API_CLIENT_URL}/get/developer/by/url/${urlText}`, {
        cache: 'no-store',
        headers: {
            'x-auth-token': accessToken
        }
    });
}

function getAllIndianDevelopers() {
    return get(`${API_CLIENT_URL}/get/indian/developers`, { next: { revalidate: 300 } });
}


export {
    getFeaturedDevelopers,
    getAllDevelopers,
    getDeveloperById,
    getDeveloperByUrlText,
    getAllIndianDevelopers
}