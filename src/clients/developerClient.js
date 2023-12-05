
'use server'
import { get } from './fetchWrapper';

const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


function getFeaturedDevelopers() {
    return get(`${API_CLIENT_URL}/get/all/featured/developers`, { next: { revalidate: 3600 }});
}

function getAllDevelopers() {
    return get(`${API_CLIENT_URL}/get/all/developers`, { next: { revalidate: 3600 }});
}


export {
    getFeaturedDevelopers,
    getAllDevelopers
}