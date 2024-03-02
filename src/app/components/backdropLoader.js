"use client"
import * as React from 'react';
import Image from "next/image"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function BackdropLoader({ open }) {

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: 10 }}
                open={open}
            >
                 <CircularProgress sx={{color:"#DC143C"}} />
            </Backdrop>
        </div>
    );
}