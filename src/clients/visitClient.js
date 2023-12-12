
'use server'
import { get } from './fetchWrapper';
import { authOptions } from "@/lib/auth"
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


async function getUserVisits(id, accessToken) {
    return Promise.allKeys({
        upcoming: get(`${API_CLIENT_URL}/get/visit/by/user/id/${id}`, {
            next: { cache: false },
            headers: { 'x-auth-token': accessToken }
        }),
        visited: get(`${API_CLIENT_URL}/get/visited/data/by/user/id/${id}`, {
            next: { cache: false },
            headers: {
                'x-auth-token': accessToken
            }
        })
    })
}


export {
    getUserVisits
}