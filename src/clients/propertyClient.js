
'use server'
import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


async function getPropertyById(id, accessToken) {
    console.log(accessToken);
    console.log(id);
    return get(`${API_CLIENT_URL}/get/property/by/property/id/${id}`, {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }
    });
}

//Returns Property configuration like: 1bhk, 2bhk etc
function getPropertyConfigurations() {
    return get(`${API_CLIENT_URL}/get/all/property/configuration`, { next: { revalidate: 3600 } });
}

//Returns furnishing details like: Semi Furnished, furnished
function getPropertyFurnishingStatus() {
    return get(`${API_CLIENT_URL}/get/all/property/furnishing/status`, { next: { revalidate: 3600 } });
}

//Returns possession status like: New Launch, Delivered, Under Construction
function getPossessionStatus() {
    return get(`${API_CLIENT_URL}/get/all/possession/status`, { next: { revalidate: 3600 } });
}

//Returns property type like: Residential and Commercial
function getPropertyType() {
    return get(`${API_CLIENT_URL}/get/all/property/type`, { next: { revalidate: 3600 } });
}

//Returns property listing type like: Apartment, Independent Floor
function getPropertyListingType() {
    return get(`${API_CLIENT_URL}/get/all/property/listing/type`, { next: { revalidate: 3600 } });
}

function getAllProperties() {
    return get(`${API_CLIENT_URL}/get/all/properties`, { next: { revalidate: 3600 } });
}

async function getPropertyPostData(sessionToken) {
    return Promise.allKeys({
        propertyConfigurations: getPropertyConfigurations(),
        furnishingStatus: getPropertyFurnishingStatus(),
        possessionStatus: getPossessionStatus(),
        propertyType: getPropertyType(),
        propertyListingType: getPropertyListingType()
    })
}


export {
    getPropertyById,
    getPropertyPostData,
    getAllProperties
}