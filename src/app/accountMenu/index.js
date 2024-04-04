"use client"
import "./styles.scss"
import * as React from 'react';
import Account from '@/app/icons/account.svg';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { TABS } from '@/app/profile/profile';
import Heading from '@/app/components/heading';
import Image from 'next/image'
import Link from 'next/link'
import facebookIcon from "@/app/icons/ri_facebook-fill.svg?url"
import twitterIcon from "@/app/icons/ri_twitter-x-fill.svg?url"
import linkedinIcon from "@/app/icons/ri_linkedin-fill.svg?url"
import instagramIcon from "@/app/icons/ant-design_instagram-filled.svg?url"
import { signIn, signOut, useSession } from "next-auth/react";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { data: { user } = {} } = useSession();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="d-inline-block account-details-cnt">     
      <IconButton        
        onClick={handleClick}
        size="small"
      >
         <Image alt="stats" width={32} height={32} src={user.photo||"/user.png"} className="account-btn"/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className="account-menu-tabs">
          <div className="profile-short-info d-flex align-items-center">
            <div className="profile-image">
              <Image alt="stats" width={60} height={60} src={user.photo||"/user.png"} />
            </div>
            <div>
              <div className='name'>{(user.firstName||"") + " " + (user.lastName||"")}</div>
              <div className='email'>{user.email}</div>
              <div className='phone-no'>{user.phone}</div>
            </div>
          </div>
          <Divider className="divider" />
          <div className='tabs'>
            {TABS.map((item, index) => <Link href={"/profile?t=" + item.value} key={index}> {index == 0 ? <Heading className='tab-items-heading' label={item.label} /> : <div className="tab-items cursor-pointer">{item.label}</div>}</Link>)}
            <div className="tab-items cursor-pointer" onClick={()=> signOut()}>Logout</div>
          </div>
          <Divider className="divider" />
          <div className="social-btn d-flex flex-column align-items-center">
            <div className="contact-us-link cursor-pointer">Contact Us</div>
            <div className="contact-icons-container">
              <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center cursor-pointer">
                <Image className="img" width={16} height={16} alt="Ri facebook fill" src={facebookIcon} />
              </div>
              <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center cursor-pointer">
                <Image className="img" width={16} height={16} alt="Ri twitter x fill" src={twitterIcon} />
              </div>
              <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center cursor-pointer">
                <Image className="img" width={16} height={16} alt="Ri linkedin fill" src={linkedinIcon} />
              </div>
              <div className="contact-image-wrapper d-inline-flex align-items-center justify-content-center cursor-pointer">
                <Image className="img" width={16} height={16} alt="Ant design instagram" src={instagramIcon} />
              </div>
            </div>
          </div>
        </div>
      </Menu>
    </div>
  );
}