import { get } from './fetchWrapper';

const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
const PROJECT_STATUS = Object.freeze({
    UPCOMING:"UPCOMING",
    TRENDING:"TRENDING",
    FEATURED:"FEATURED"
});

function getProjectsByStatus(status) {
    return get(`${API_CLIENT_URL}/get/project/by/project/status/${status}`, { next: { revalidate: 3600 }});
}


export {
    PROJECT_STATUS,
    getProjectsByStatus
}