
import { get } from './fetchWrapper';

const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;

function getAllCountries() {   
    return get(`${API_CLIENT_URL}/get/all/country`, {revalidate: 3600});
}

function getStateByCountry(countryId) {   
    return get(`${API_CLIENT_URL}/get/states/by/country/id/${countryId}`, {revalidate: 3600});
}

function getCityByStateId(stateId) {   
    return get(`${API_CLIENT_URL}/get/city/by/state/id/${stateId}`, {revalidate: 3600});
}

function getLocalityByCityId(cityId) {   
    return get(`${API_CLIENT_URL}/get/locality/by/city/id/${cityId}`, {revalidate: 3600});
}

export {
    getAllCountries,
    getStateByCountry,
    getCityByStateId,
    getLocalityByCityId
}