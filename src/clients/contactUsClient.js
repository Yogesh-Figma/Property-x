
import { post } from './fetchWrapper';

const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;

function postContactUsForm(data) {   
    return post(`${API_CLIENT_URL}/save/new/contact/us/form`, data);
}

export {
    postContactUsForm
}