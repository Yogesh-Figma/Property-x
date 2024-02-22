import { getAllCities } from './cityClient';
import { get, post } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;

async function getPropertyById(id) {
    return get(`${API_CLIENT_URL}/get/property/by/property/id/${id}`, {
        cache: 'no-store'
    });
}

function getPropertyByUrlText(urlText) {
    return get(`${API_CLIENT_URL}/get/property/by/url/name/${urlText}`, {
        cache: 'no-store'
    });
}

//Returns Property configuration like: 1bhk, 2bhk etc
function getPropertyConfigurations() {
    return get(`${API_CLIENT_URL}/get/all/property/configuration`, { next: { revalidate: 3600 } });
}


function getPropertyConfigurationType() {
    return get(`${API_CLIENT_URL}/get/all/property/configuration/type`, { next: { revalidate: 3600 } });
}


//Returns furnishing details like: Semi Furnished, furnished
function getPropertyFurnishingStatus() {
    return get(`${API_CLIENT_URL}/get/all/property/furnishing/status`, { next: { revalidate: 3600 } });
}

//Returns possession status like: New Launch, Delivered, Under Construction
function getPossessionStatus() {
    return get(`${API_CLIENT_URL}/get/all/possession/status`, { next: { revalidate: 3600 } });
}


//Returns property listing type like: RENT OR SALE
function getPropertyListingType() {
    return get(`${API_CLIENT_URL}/get/all/property/listing/type`, { next: { revalidate: 3600 } });
}

function getAllProperties() {
    return get(`${API_CLIENT_URL}/get/all/properties`, { next: { revalidate: 3600 } });
}

function getPropertyByStatus(status) {
    return get(`${API_CLIENT_URL}/get/property/by/property/status/${status}`, { next: { revalidate: 3600 } });
}

function getPropertySpecifications() {
    return get(`${API_CLIENT_URL}/get/all/specifications`, { next: { revalidate: 3600 } });
}

function getAllAmenities() {
    return get(`${API_CLIENT_URL}/get/all/amenities`, { next: { revalidate: 3600 } });
}

function getAllPropertyCategory() {
    return get(`${API_CLIENT_URL}/get/all/property/category`, { next: { revalidate: 3600 } });
}

function getPropertyTypeByCategoryId(categoryId, accessToken) {
    return get(`${API_CLIENT_URL}/get/property/type/by/property/category/id/${categoryId}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': accessToken
        }
    })
}

function getPropertyZones(accessToken) {
    return get(`${API_CLIENT_URL}/get/all/zone/type`, {
        headers: {
            'x-auth-token': accessToken
        }
    })
}

function getConstructionStatus() {
    return get(`${API_CLIENT_URL}/get/all/construction/status`)
}

function getPropertyOwnershipDetails() {
    return new Promise((res, rej) => {
        res([{ label: "Freehold", value: "FREEHOLD" }, { label: "Leasehold", value: "LEASEHOLD" },
        { label: "Cooperative society", value: "COOPERATIVE_SOCIETY" }, { label: "Power of attorney", value: "POWER_OF_ATTORNEY" }])
    })
}

function getPropertyFacing() {
    return new Promise((res, rej) => {
        res([{ label: "NORTH", value: "NORTH" }, { label: "SOUTH", value: "SOUTH" },
        { label: "EAST", value: "EAST" },
        { label: "WEST", value: "WEST" }, { label: "NORTH-EAST", value: "NORTH-EAST" },
        { label: "NORTH-WEST", value: "NORTH-WEST" }, { label: "SOUTH-EAST", value: "SOUTH-EAST" },
        { label: "SOUTH-WEST", value: "SOUTH-WEST" }])
    })
}

async function getProjectConfigurationById(projectId, accessToken) {
    const data = await get(`${API_CLIENT_URL}/get/project/configuration/by/project/id/${projectId}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': accessToken
        }
    })
    return data.map(item => item.propertyConfiguration);
}

async function getPropertyConfigurationByType(configTypeId, projectId, accessToken) {
    const data = await get(`${API_CLIENT_URL}/get/all/property/configuration?propertyConfigTypeId=${configTypeId}&projectId=${projectId}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': accessToken
        }
    })
    return data;
}

async function getPropertyPostData(type, categoryId, sessionToken) {
    let parallelRequests = {
        constructionStatus: getConstructionStatus(),
        propertyType: getPropertyTypeByCategoryId(categoryId, sessionToken),
        propertyListingType: getPropertyListingType(),
        specifications: [],
        amenities: getAllAmenities(),
        cities: getAllCities(),
        facings: getPropertyFacing(),
        propertyConfigurationType: [],
        zones: [],
        ownerships: [],
        furnishingStatus: getPropertyFurnishingStatus()
    }

    if (type.toLowerCase() == "commercial") {
        parallelRequests.zones = getPropertyZones(sessionToken);
        parallelRequests.ownerships = getPropertyOwnershipDetails();
    }
    else {
        parallelRequests.specifications = getPropertySpecifications();
        parallelRequests.propertyConfigurationType = getPropertyConfigurationType()
    }

    return Promise.allKeys(parallelRequests)
}

function postProperty(id, data, accessToken) {
    return post(`${API_CLIENT_URL}/add/new/property/by/user/id/${id}`, data, {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }
    });
}

//Used on booking screen
function getPropertiesByProjectId(id, accessToken, filters={}) {
    let { towerId, configId, floorId } = filters
    let url = new URL(`${API_CLIENT_URL}/get/property/by/project/${id}`)
    if (!!towerId) {
        url.searchParams.set("towerId", towerId)
    }
    if (!!configId) {
        url.searchParams.set("configId", configId)
    }
    if (!!floorId) {
        url.searchParams.set("floorId", floorId)
    }
    return get(url.toString(), {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }
    });
}

function getPostedPropertiesByUserId(id, accessToken) {
    return get(`${API_CLIENT_URL}/get/posted/property/by/user/id?user_id=${id}`, {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }
    })
}


export {
    getPropertyById,
    getPropertyPostData,
    getAllProperties,
    getPropertyByStatus,
    getPropertyTypeByCategoryId,
    getAllPropertyCategory,
    getPropertyByUrlText,
    postProperty,
    getProjectConfigurationById,
    getPropertyConfigurationByType,
    getPropertiesByProjectId,
    getPostedPropertiesByUserId
}