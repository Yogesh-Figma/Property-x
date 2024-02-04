import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
//Returns property listing type like: Apartment, Independent Floor
function getSearchData(searchTerm, cityName) {
    searchTerm = searchTerm.replace("-"," ");
    let searchUrl = `${API_CLIENT_URL}/filter/search?searchTerm=${searchTerm}`;
    if(!!cityName) {
        searchUrl = searchUrl + "&city=" + cityName
    }
    return get(searchUrl, { next: { cache: false }});
}

export {
    getSearchData
}