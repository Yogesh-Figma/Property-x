
import { get } from './fetchWrapper';

const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;

function getAllCities() {   
    return get(`${API_CLIENT_URL}/get/all/city`, {revalidate: 3600});
}

export {
    getAllCities
}