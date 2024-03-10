import "./styles.scss"
import * as React from 'react';
import LeadsDetails from "./leadsDetails";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Image from 'next/image';
import { getAllLeads, getUserContactDetailsByQueryId } from '@/clients/leadClient'
import { getPropertyById } from '@/clients/propertyClient';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import { PostedPropertyCard } from '@/app/components/ui/propertyCard'


export default async function CheckLeads({ params: { id, type } }) {
    const sessionData = await getServerSession(authOptions);

    if (sessionData == null) {
        return;
    }

    const {user, token } = sessionData;
    const property = await getPropertyById(id);

    const leads = await getAllLeads(id, token);



    return (
        <div className='checklead-page container-fluid '>
            <LeadsDetails property={property} leads={leads}/>
        </div>
    );
}