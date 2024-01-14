import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
//Returns property listing type like: Apartment, Independent Floor
function getAllLocalities() {
    return get(`${API_CLIENT_URL}/get/all/locality`, { next: { revalidate: 3600 }});
}

function getLocalityByCityId(cityId) {
    return get(`${API_CLIENT_URL}/get/locality/by/city/id/${cityId}`, { cache:'no-store' } );
}


export {
    getAllLocalities,
    getLocalityByCityId
}

