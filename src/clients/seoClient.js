import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;


function getGenericKeywords() {
    return get(`${API_CLIENT_URL}/generic/keywords/get/all`, { next: { revalidate: 3600 } })
}

async function getGenericKeywordByPath(path) {
    let data = {}
    try {
        data = await get(`${API_CLIENT_URL}/generic/keywords/get/by/path/${path}`, { next: { revalidate: 3600 } })
    }
    catch (e) { }
    return data;
}


export {
    getGenericKeywords,
    getGenericKeywordByPath
}