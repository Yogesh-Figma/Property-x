import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;

function getTermsAndConditions() {
    return get(`${API_CLIENT_URL}/site/get/term/and/condition/policies`, { next: { revalidate: 3600 }});
}

function getPrivacyPolicy() {
    return get(`${API_CLIENT_URL}/site/get/privacy/policy`, { next: { revalidate: 3600 }});
}

function getAboutUsDetails() {
    return get(`${API_CLIENT_URL}/site/get/about/us/info`, { next: { revalidate: 3600 }});
}

function getContactUsInfo() {
    return get(`${API_CLIENT_URL}/get/all/contact/us/data`, { next: { revalidate: 3600 }});
}

function getRefundPolicy() {
    return get(`${API_CLIENT_URL}/site/get/refund/policies`, { next: { revalidate: 3600 }});
}

export {
    getTermsAndConditions,
    getPrivacyPolicy,
    getAboutUsDetails,
    getContactUsInfo,
    getRefundPolicy
}

