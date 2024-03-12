import { post } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
//Returns property listing type like: Apartment, Independent Floor
function verifyEmailOtp(email, otp) {
    return post(`${API_CLIENT_URL}/verify/email-otp?email=${email}&otp=${otp}`, {}, { next: { cache: false } });
}

function sendEmailVerificationOtp({userId, email}) {
    return post(`${API_CLIENT_URL}/send/email-otp/${userId}?email=${email}`, {}, { next: { cache: false } });
}

export {
    verifyEmailOtp,
    sendEmailVerificationOtp
}