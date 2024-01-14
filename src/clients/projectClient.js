import { get } from './fetchWrapper';

const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
const PROJECT_STATUS = Object.freeze({
    UPCOMING: "UPCOMING",
    TRENDING: "TRENDING",
    FEATURED: "FEATURED"
});

function getProjectsByStatus(status) {
    return get(`${API_CLIENT_URL}/get/project/by/project/status/${status}`, { next: { revalidate: 3600 } });
}


function getProjectById(id) {
    return get(`${API_CLIENT_URL}/get/Project/by/project/id/${id}`, { cache: 'no-store' });
}


function getAllProjects() {
    return get(`${API_CLIENT_URL}/get/all/projects`, { cache: 'no-store' });
}


function getProjectsByCityId(cityId, accessToken) {
    return get(`${API_CLIENT_URL}/get/projects/by/city/id?` + new URLSearchParams({
        city_id: cityId
    }), {
        cache: 'no-store',
        headers: {
            'X-Auth-Token': accessToken
        }
    });
}

export {
    PROJECT_STATUS,
    getProjectsByStatus,
    getProjectById,
    getAllProjects,
    getProjectsByCityId
}