import BookingForm from './bookingForm';
import { getServerSession } from "next-auth/next";
import { getPropertyById } from '@/clients/propertyClient';
import { getProjectById } from '@/clients/projectClient';
import { authOptions } from "@/lib/auth"

export default async ({ params: { type, id } }) => {
    const session = await getServerSession(authOptions)
    const data = type == "property" ? await getPropertyById(id, session?.token) : await getProjectById(id);
    return (<div className='booking-form'>
        <BookingForm data={data} type={type}/>
    </div>)
}