import { get } from './fetchWrapper';
const API_CLIENT_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;

const TRANSACTION_TYPE = Object.freeze({
    PENDIND:"PENDING",
    COMPLETED:"COMPLETED",
    INPROGRESS:"INPROGRESS",
    REQUESTED:"REQUESTED"
});


function getTransactionsByUserId(accessToken, userId, transactionType) {
    let url = new URL(`${API_CLIENT_URL}/get/booking/transactions/by/user/id/${userId}`);
    url.searchParams.set("bookingStatus", transactionType)
    return get(url.toString(), {
        next: { cache: false },
        headers: {
            'x-auth-token': accessToken
        }});
}

export {
    getTransactionsByUserId,
    TRANSACTION_TYPE
}