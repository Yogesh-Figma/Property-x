import React from 'react';
import './header.scss'
import NextLinkButton from '@/app/components/nextLinkButton';
import Login from "./login"
import Image from 'next/image';
import propertyXLogo from '@/app/icons/property_x.svg'
import Link from 'next/link'

const Header = ({}) => {

    return <div className='header d-flex justify-content-between container-fluid sub-heading align-items-center'>
        <div className="property-x"><Link href="/"><Image src={propertyXLogo} width={120} height={23}/></Link></div>
        <div className='links'>
            <span>Download the App</span>
            <span>Post a Property</span>
            <NextLinkButton text={"Login"} href={"?login=true"}/>
            <Login />
        </div>
    </div>
}
export default Header;