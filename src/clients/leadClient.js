import { get } from './fetchWrapper';

const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;

function getLeadsByProjectId(id, accessToken) {
    return get(`${API_CLIENT_URL}/get/all/queries/for/project/by/project/id/${id}`, {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }})
}


function getLeadsByPropertyId(id, accessToken) {
    return get(`${API_CLIENT_URL}/get/all/queries/for/property/by/property/id/${id}`, {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }})
}

function getUserContactDetailsByQueryId(id, accessToken) {
    return get(`${API_CLIENT_URL}/get/user/contact/details/by/query/id/${id}`, {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }})
}

function getAllLeads(){
    return get(`${API_CLIENT_URL}/get/all/query`);
}


export {
    getLeadsByProjectId,
    getLeadsByPropertyId,
    getAllLeads,
    getUserContactDetailsByQueryId
}