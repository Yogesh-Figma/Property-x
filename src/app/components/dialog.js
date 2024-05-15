"use client"
import React from 'react'
import {Dialog as MuiDialog} from '@mui/material';
import TickMark from '@/app/icons/tickMark.svg';
import CloseIcon from '@/app/icons/icon_close-small.svg'


const Dialog = ({ open, onClose, title, message1, message2, width, height }) => {

    return (<>
        <MuiDialog
            open={open}
            onClose={() => onClose(false)}
            severity="success"
            variant="filled"
            PaperProps={{
                sx:{
                    width:width,
                    height:height
                }
            }}
            sx={{ width: '100%'}}>
            <div className='p-4 position-relative'>
            <CloseIcon width={30} height={30} style={{right:15, top:15}} className='position-absolute close-icon' role="button" onClick={() => onClose(false)} />
            <div className='d-flex flex-column align-items-center'>
                <TickMark />
                <div style={{fontSize:24}} className='heading mt-2'>{title}</div>
                <div className='text-center'>{message1}</div>
                <div>{message2}</div>
            </div>
            </div>
        </MuiDialog>
    </>)
}


export default Dialog;