import React from 'react';
import './header.scss'
import Logo from '@/app/icons/logo.svg'
import Link from 'next/link'
import CompactSearchBar from './components/ui/compactSearchBar';
import HeaderMobileDrawer from './headerMobileDrawer';
import UserAuthHeader from '@/app/userAuthHeader';


const locations = []
const Header = ({ }) => {

    return <div className='header d-flex justify-content-between container-fluid sub-heading align-items-center'>
        <div className="property-x d-flex align-items-center"> <HeaderMobileDrawer /><Link href="/" className='logo-link'><Logo width={121} height={23} /></Link></div>
        <div className='header-search-container'>
            <CompactSearchBar height='30px' showLocationMenu={true} maxWidth={383} width='100%' />
        </div>
        <div className='links'>
            <span className='heading-normal d-none d-xl-inline-block'>Download the App</span>
            <span className='heading-normal d-none d-xl-inline-block'> <Link href="/property/post" className='text-decoration-none'>Post a Property</Link></span>
            <UserAuthHeader />
        </div>
    </div>
}
export default Header;