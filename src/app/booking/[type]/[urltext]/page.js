import BookingForm from './bookingForm';
import { getServerSession } from "next-auth/next";
import { getPropertyById, getPropertyByUrlText } from '@/clients/propertyClient';
import { getProjectConfigurationById, getProjectByUrlText, getProjectTowerById, getProjectTowerByUrlText } from '@/clients/projectClient';
import { authOptions } from "@/lib/auth"
import { getServerSessionToken } from '@/lib/session';

export default async ({ params: { type, urltext } }) => {
    const token = await getServerSessionToken();
    const isProperty = type == "property";
    const data =  isProperty ? await getPropertyByUrlText(urltext, token): await getProjectByUrlText(urltext, token);

    console.log(" getPropertyByUrlText", data);

    const { projectConfigurations = [], projectTowers = [] } = await Promise.allKeys({
        projectConfigurations: !isProperty ? await getProjectConfigurationById(data?.id) : [],
        projectTowers: !isProperty ? await getProjectTowerById(data?.id, token): []
    });

    console.log("projectTowers", projectTowers);
    console.log("token", token);
    const configurations = projectConfigurations.map(item => item.propertyConfiguration);
    configurations.push({id:null, name:"No Configuration"});

    return (<div className='booking-form'>
        <BookingForm
            data={data}
            type={type}
            projectTowers={projectTowers}
            configurations={configurations} />
    </div>)
}