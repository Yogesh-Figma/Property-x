import React from 'react';
import './header.scss'
import Logo from '@/app/icons/logo.svg'
import Link from 'next/link'
import CompactSearchBar from './components/ui/compactSearchBar';
import HeaderMobileDrawer from './headerMobileDrawer';
import UserAuthHeader from '@/app/userAuthHeader';
import { getAllCities } from '@/clients/cityClient'
import MobileSearchBar from './headerComponents/mobileSearchBar'; 


const Header = async ({ }) => {
    const cities = await getAllCities();
    const LOCATIONS = cities.map(item => { return ({ label: item.name, value: item.id, id: item.id }) });
    return <div className='header position-relative'>
            <div className='position-relative d-flex justify-content-between container-fluid sub-heading align-items-center'>
                <div className="property-x d-flex align-items-center">
                    <HeaderMobileDrawer />
                    <Link href="/" className='logo-link'><Logo width={121} height={23} />
                    </Link>
                </div>
                <div className='header-search-container'>
                    <CompactSearchBar height='30px' className={"d-none d-md-inline-flex"} showLocationMenu={true} maxWidth={516} width='100%' locations={LOCATIONS} />
                </div>
                <div className='links'>
                    {/* <span className='heading-normal d-none d-xl-inline-block'>Download the App</span> */}
                    <span className='heading-normal d-none d-xl-inline-block'> <Link href="/post-a-property" className='text-decoration-none'>List a Property</Link></span>
                    <MobileSearchBar locations={LOCATIONS}/>
                    <UserAuthHeader />
                </div>
            </div>           
        </div>
}
export default Header;