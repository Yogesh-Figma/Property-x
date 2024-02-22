import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;

//Used on booking screen
function getPropertyFloorByTowerId(towerId, accessToken) {
    let url = new URL(`${API_CLIENT_URL}/get/all/property/floor`)
    if (!!towerId) {
        url.searchParams.set("towerId", towerId)
    }
    return get(url.toString(), {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }
    });
}

export {
    getPropertyFloorByTowerId
}