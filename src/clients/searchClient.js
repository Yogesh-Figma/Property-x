import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
//Returns property listing type like: Apartment, Independent Floor
function getSearchData(searchTerm, cityName, onlyProject, propertyCategory) {
    searchTerm = searchTerm.replace("-"," ");
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
    console.log(" searchUrl", searchUrl);
    return get(searchUrl, { next: { cache: false }});
}

function getProjectComparisionData(ids=[]) {
    let url = `${API_CLIENT_URL}/filter/compare-projects?projectIds=${ids.join("&projectIds=")}`;
    return get(url, { next: { cache: false }});
}

function getPropertyComparisionData(ids=[]) {
    let url = `${API_CLIENT_URL}/filter/compare-projects?propertiesIds=${ids.join("&propertiesIds=")}`;
    return get(url, { next: { cache: false }});
}


function addSearchParam(url, param){
    return url + (url.indexOf("?") > -1 ? "&":"?") + param;
}

export {
    getSearchData,
    getProjectComparisionData,
    getPropertyComparisionData
}