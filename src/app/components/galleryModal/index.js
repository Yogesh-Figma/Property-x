"use client"
import React, { useEffect } from 'react';
import { TextField, Modal } from "@mui/material";
import Gallery from '../gallery';
import { useSearchParams } from 'next/navigation'
import CloseIcon from '@/app/icons/icon_close-small.svg?url'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import "./styles.scss"
import Backdrop from '@mui/material/Backdrop';

const GALLERY_TABS = [{value:"virtualTour", label:"Virtual Tour"},{value:"photos", label:"Photos"},{value:"videos", label:"Videos"},{value:"floorPlan", label:"Floor Plan"} ];

const GalleryModal = ({ data, title, logo }) => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const galleryEnabled = searchParams.get('gallery') || false

    const disableBodyScroll = () => {
        if (galleryEnabled && document.body.style.overflow !== "hidden") {
          document.body.style.overflow = "hidden";
          document.body.style.position = "fixed";
        } else {
          document.body.style.overflow = "scroll";
          document.body.style.position = "";
        }
    };

    useEffect(disableBodyScroll, [galleryEnabled]);

    const handleClose = () => {
        router.back();
    }


    return (
        <Backdrop open={galleryEnabled} sx={{zIndex:3, background:"#fff", marginTop:"76px", display:"block"}}>
        <div className='gallery-image-modal'>
            <div className='property-header d-flex align-items-center justify-content-between'>
                <div className='prop-name d-flex align-items-center'>
                    <Image src={logo||""} width={90} height={50} />
                    <div className='project-title heading'>{title}</div>
                </div>
                <div className='close-icon'>
                    <Image src={CloseIcon} width={30} height={30} className='close-icon' role="button" onClick={handleClose} />
                </div>
            </div>
            <Gallery galleryTabs={GALLERY_TABS} data={data}/>
        </div>
        </Backdrop>)

}

export default GalleryModal