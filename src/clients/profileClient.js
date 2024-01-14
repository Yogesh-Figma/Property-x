import { get, post } from './fetchWrapper';
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next"
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


function getUserProfile(id) {
    // const session = await getServerSession(authOptions);
    // const accessToken = session?.token;
    //console.log(session)

    return get(`${API_CLIENT_URL}/get/user-profile/by/user/id/${id}`, {
        next: { cache: false },
        // headers: {
        //     'x-auth-token': accessToken
        // }
    });
}

function postUserProfile(id, data, accessToken) {
    return post(`${API_CLIENT_URL}/save/user/profile/by/user/by/id/${id}`, data, {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }
    });
}

export {
    getUserProfile,
    postUserProfile
}