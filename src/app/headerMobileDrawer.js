"use client"
import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Hamburger from '@/app/icons/hamburger.svg'
import { Divider } from '@mui/material';
import Link from 'next/link'

const MENU_ITEMS = [{name:"List a Property", link:"/post-a-property"}];
const HeaderMobileDrawer = ({ }) => {
    const [drawerEnabled, setDrawerEnabled] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerEnabled(open);
    };

    const list = () => (
        <Box
            sx={{ width: 'auto' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            className='ham-list'
        >
            <div>
                {MENU_ITEMS.map((item, index) => (
                    <div key={index}>
                        <Link href={item.link} key={index} className='ham-item cursor-pointer d-inline-block'>
                            {item.name}
                        </Link>
                        <Divider />
                    </div>
                ))}
            </div>
        </Box>
    );

    return (
        <div className='d-inline-flex d-xl-none'>
            <Hamburger role="button" onClick={toggleDrawer(true)} />
            <Drawer
                anchor="left"
                open={drawerEnabled}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
}

export default HeaderMobileDrawer;