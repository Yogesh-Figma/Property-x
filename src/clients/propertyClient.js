
import { get } from './fetchWrapper';

function getPropertyById(id) {
    return get("https://653680cdbb226bb85dd23b51.mockapi.io/property", { next: { revalidate: 3600 }});
}

export {
    getPropertyById
}