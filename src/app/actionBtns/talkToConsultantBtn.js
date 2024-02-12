"use client"
import React from 'react'
import { saveTalkToConslt } from '@/clients/talkConsultantClient';
import { signIn, signOut, useSession } from "next-auth/react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '../components/button';
import { useSearchParams, useRouter } from 'next/navigation'


const TalkToConsulantBtn = ({ width = 22, height = 34, id, isProperty, className="overview-btn", variant="outlined-noborder" }) => {

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
        <Button variant={variant} className={className} text='Talk to Consultant' height={height} rounded={true} onClick={registerTalkToConslt}/>
        <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
            <Alert
                onClose={() => setOpen(false)}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}>
                <AlertTitle>Success</AlertTitle>
                Your request was registered successfully. Our agent will get back to you soon.
            </Alert>
        </Snackbar>
    </>)
}


export default TalkToConsulantBtn;