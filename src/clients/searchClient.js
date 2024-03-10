import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
//Returns property listing type like: Apartment, Independent Floor
function getSearchData(searchTerm, cityName, onlyProject, propertyCategory) {
    searchTerm = searchTerm;
    let searchUrl = `${API_CLIENT_URL}/filter/search?searchTerm=${searchTerm}`;
    if(!!cityName) {
        searchUrl = addSearchParam(searchUrl,"city=" + cityName)
    }
    if(!!onlyProject) {
        searchUrl = addSearchParam(searchUrl, "onlyProject=true")
    }
    if(!!propertyCategory){
        searchUrl = addSearchParam(searchUrl, "propertyCategory=" + propertyCategory);
    }
    return get(searchUrl, { next: { cache: false }});
}

function getProjectComparisionData(ids=[]) {
    let url = `${API_CLIENT_URL}/filter/compare-projects?projectIds=${ids.join("&projectIds=")}`;
    return get(url, { next: { cache: false }});
}

function getPropertyComparisionData(ids=[]) {
    let url = `${API_CLIENT_URL}/compare-properties?propertiesIds=${ids.join("&propertiesIds=")}`;
    return get(url, { next: { cache: false }});
}

function searchProjects(keyword) {
    let url = `${API_CLIENT_URL}/filter/search/projects?name=${keyword}`;
    return get(url, { next: { cache: false }});
}

function searchProperties(keyword) {
    let url = `${API_CLIENT_URL}/filter/search/properties?name=${keyword}`;
    return get(url, { next: { cache: false }});
}

function addSearchParam(url, param){
    return url + (url.indexOf("?") > -1 ? "&":"?") + param;
}

export {
    getSearchData,
    getProjectComparisionData,
    getPropertyComparisionData,
    searchProjects,
    searchProperties
}