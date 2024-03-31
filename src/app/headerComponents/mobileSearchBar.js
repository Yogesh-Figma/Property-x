
"use client"
import React from 'react';
import SearchIcon from '@/app/icons/iconamoon_search.svg'
import CompactSearchBar from '@/app/components/ui/compactSearchBar';
import Backdrop from '@mui/material/Backdrop';

const MobileSearchBar = ({ locations }) => {
    const [ open, setOpen] = React.useState(false);

    return (
        <>
            <SearchIcon className="d-inline-flex d-md-none search-small-icon" onClick={()=>setOpen(true)}/>
            <div className={`mobile-search-container ${open ? " open": ""}`}>
                <CompactSearchBar mobileSearch={true} showLocationMenu={false} height='30px' className={"d-block d-md-none"} maxWidth={516} width='100%' locations={locations} />
            </div>
            <Backdrop open={open} sx={{ color: '#fff', height: '100vh', top: '120px'}} onClick={()=>setOpen(false)}>
            </Backdrop>
        </>
    )
}

export default MobileSearchBar