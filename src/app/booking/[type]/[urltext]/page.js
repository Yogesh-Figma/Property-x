import BookingForm from './bookingForm';
import { getServerSession } from "next-auth/next";
import { getPropertyById, getPropertyByUrlText } from '@/clients/propertyClient';
import { getProjectConfigurationById, getProjectByUrlText, getProjectTowerByUrlText } from '@/clients/projectClient';
import { authOptions } from "@/lib/auth"
import { getServerSessionToken } from '@/lib/session';

export default async ({ params: { type, urltext } }) => {
    const token = await getServerSessionToken();
    const isProperty = type == "property";
    const { data = {}, projectTowers = [] } = await Promise.allKeys({
        data: isProperty ? await getPropertyByUrlText(urltext, token) : await getProjectByUrlText(urltext),
        projectTowers: isProperty ?[]: await getProjectTowerByUrlText(urltext, token)
    });
    const projectConfigurations = !isProperty ? await getProjectConfigurationById(data?.id) : [];
    console.log("projectTowers", projectTowers);
    console.log("token", token);

    return (<div className='booking-form'>
        <BookingForm
            data={data}
            type={type}
            projectTowers={projectTowers}
            configurations={projectConfigurations.map(item => item.propertyConfiguration)} />
    </div>)
}