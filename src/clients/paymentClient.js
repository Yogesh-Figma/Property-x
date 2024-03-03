import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


function getPaymentPlanByProjectId(id) {
    // return get(`${API_CLIENT_URL}/get/payment/schedule/by/project/id/${id}?isCurrent=true`, { cache:'no-store' } );
    return get(`${API_CLIENT_URL}/get/all/payment/schedule`, {
        headers: {
            'x-auth-token': "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJHUF9BRE1JTiJ9XSwic3ViIjoiODgwMDc2OTI2NiIsImlhdCI6MTcwODk2MTA3NSwiZXhwIjoxNzEwMjU3MDc1fQ.MIfW1jNITM_fW-gINNQj9pBAQPm5zyJN0n-ZLLMh00lHUvEAy9VnQdZfM5RiUK-juDCfUTgJTtwK2t0-Oy6JqA"
        }
    })
}


export {
    getPaymentPlanByProjectId
}

