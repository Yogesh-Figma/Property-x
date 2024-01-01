import React from 'react';
import './header.scss'
import Logo from '@/app/icons/logo.svg'
import Link from 'next/link'
import CompactSearchBar from './components/ui/compactSearchBar';
import HeaderMobileDrawer from './headerMobileDrawer';
import UserAuthHeader from '@/app/userAuthHeader';
import SearchIcon from '@/app/icons/iconamoon_search.svg'
import { getAllCities } from '@/clients/cityClient'


const Header = async ({ }) => {
    const cities = await getAllCities();
    const LOCATIONS = cities.map(item => { return ({label:item.cityName,value:item.cityId}) });
    return <div className='header d-flex justify-content-between container-fluid sub-heading align-items-center'>
        <div className="property-x d-flex align-items-center"> 
        <HeaderMobileDrawer />
            <Link href="/" className='logo-link'><Logo width={121} height={23} />
            </Link>
        </div>
        <div className='header-search-container'>
            <CompactSearchBar height='30px' className={"d-none d-md-inline-flex"} showLocationMenu={true} maxWidth={516} width='100%' locations = {LOCATIONS}/>
        </div>
        <div className='links'>
            {/* <span className='heading-normal d-none d-xl-inline-block'>Download the App</span> */}
            <span className='heading-normal d-none d-xl-inline-block'> <Link href="/post" className='text-decoration-none'>List a Property</Link></span>
            <SearchIcon className="d-inline-flex d-md-none search-small-icon" />
            <UserAuthHeader />
        </div>
    </div>
}
export default Header;