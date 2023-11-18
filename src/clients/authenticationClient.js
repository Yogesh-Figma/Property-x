
import { get, post } from './fetchWrapper';

const API_CLIENT_URL = process.env.API_CLIENT_URL;

function generateToken(username, password) {   
    return post(`${API_CLIENT_URL}/generate-token`, { username, password });
}

function getCurrentUser(accessToken) {
    return get(`${API_CLIENT_URL}/current-user`, {
        headers: {
            'x-auth-token': accessToken
        }
    });
}

export {
    generateToken,
    getCurrentUser
}