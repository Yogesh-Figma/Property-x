import React from 'react';
import './header.scss'
import NextLinkButton from '@/app/components/nextLinkButton';
import Login from "./login"
import Logo from '@/app/icons/logo.svg'
import Link from 'next/link'
import CompactSearchBar from './components/ui/compactSearchBar';
import AccountMenu from '@/app/accountMenu'
import Notification from '@/app/icons/notification.svg';
import NotificationMenu from '@/app/notificationMenu';

const locations = []
const Header = ({ }) => {

    return <div className='header d-flex justify-content-between container-fluid sub-heading align-items-center'>
        <div className="property-x"><Link href="/"><Logo width={121} height={23} /></Link></div>
        <div className='header-search-container'>
            <CompactSearchBar height='30px' showLocationMenu={true} maxWidth={383} width='100%'/>
        </div>
        <div className='links'>
            <span className='heading-normal d-none d-xl-inline-block'>Download the App</span>
            <span className='heading-normal'> <Link href="/property/post" className='text-decoration-none'>Post a Property</Link></span>
            {true ? <><NotificationMenu/><AccountMenu /></> : <><NextLinkButton rounded={true} height={26} text={"Login"} href={"?login=true"} />
                <Login /></>}
        </div>
    </div>
}
export default Header;