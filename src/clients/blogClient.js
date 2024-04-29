import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
//Returns property listing type like: Apartment, Independent Floor
function getAllBlogs(isFeatured, size, page) {
    let url = new URL(`${API_CLIENT_URL}/get/all/blogs`)
    if (isFeatured) {
        url.searchParams.set("isFeatured", true)
    }
    if(page > 0) {
        url.searchParams.set("page", page)
    }
    if(size > 0){
        url.searchParams.set("size", size)
    }
    return get(url.toString(), { next: { revalidate: 3600 }});
}

function getBlogById(blog_id) {
    return get(`${API_CLIENT_URL}/get/blogs/by/id/${blog_id}`, { next: { revalidate: 3600 }});
}

function getBlogByUrlText(urlText) {
    return get(`${API_CLIENT_URL}/get/blogs/by/url/${urlText}`, { next: { revalidate: 3600 }});
}


export {
    getAllBlogs,
    getBlogById,
    getBlogByUrlText
}