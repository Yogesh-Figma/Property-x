"use client"
import React from 'react'
import { saveTalkToConslt } from '@/clients/talkConsultantClient';
import { signIn, signOut, useSession } from "next-auth/react";
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '../components/button';
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
            onClose={() => setOpen(false)}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}>
                <div className='p-4 position-relative'>
            <CloseIcon width={30} height={30} style={{right:15, top:15}} className='position-absolute close-icon' role="button" onClick={() => setOpen(false)} />
            <div className='d-flex flex-column align-items-center'>
                <TickMark />
                <div style={{fontSize:24}} className='heading mt-2'>Thank You</div>
                <div>For reaching us out to us</div>
                <div>Our expert consultants will reach out to you shortly</div>
            </div>
            </div>
        </Dialog>
    </>)
}


export default TalkToConsulantBtn;