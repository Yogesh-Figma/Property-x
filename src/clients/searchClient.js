import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
//Returns property listing type like: Apartment, Independent Floor
function getSearchData(searchTerm) {
    return get(`${API_CLIENT_URL}/filter/search?searchTerm=${searchTerm}`, { next: { cache: false }});
}

export {
    getSearchData
}