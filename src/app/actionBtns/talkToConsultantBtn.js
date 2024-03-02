"use client"
import React from 'react'
import { saveTalkToConslt } from '@/clients/talkConsultantClient';
import { signIn, signOut, useSession } from "next-auth/react";
import Button from '../components/button';
import Dialog from '@/app/components/dialog';
import { useSearchParams, useRouter } from 'next/navigation'
import TickMark from '@/app/icons/tickMark.svg';
import CloseIcon from '@/app/icons/icon_close-small.svg'


const TalkToConsulantBtn = ({ width = 22, height = 34, id, isProperty, className = "overview-btn", variant = "outlined-noborder" }) => {

    const { data: session } = useSession();
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const registerTalkToConslt = async () => {
        if (!session) {
            return router.push('?login=true');
        }
        else {
            const reqObj = {
                "exclusive": true
            }
            reqObj[isProperty ? "propertyId" : "projectId"] = id;
            await saveTalkToConslt(session.user.id, reqObj, session.token);
        }
        setOpen(true);
    }

    return (<>
        <Button variant={variant} className={className} text='Talk to Consultant' height={height} rounded={true} onClick={registerTalkToConslt} />
        <Dialog
            open={open}
            severity="success"
            variant="filled"
            onClose={setOpen}
            title={"Thank You"}
            message1={"For reaching us out to us"}
            message2={"Our expert consultants will reach out to you shortly"}
        />
    </>)
}


export default TalkToConsulantBtn;