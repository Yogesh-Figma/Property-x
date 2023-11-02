"use client"
import "./styles.scss"
import Image from 'next/image'
import React from 'react'
import MyProfile from './myProfile'
import Transactions from './transactions'
import Bookings from './bookings'
import ScheduledVisits from './visits'
import PostedProperties from './postedProperties'
import { useSearchParams } from 'next/navigation'
import Wishlist from './wishlist'
import Heading from '@/app/components/heading';
import Link from 'next/link'

export const TABS = [{ label: "Profile", value: "myprofile" },
{ label: "Transactions", value: "transactions" },
{ label: "Bookings", value: "bookings" },
{ label: "Visits", value: "visits" },
{ label: "Posted Properties", value: "postedProperties" },
{ label: "Wishlist", value: "wishlist" }]

export default ({ }) => {
    const searchParams = useSearchParams()
    const selectedTabFromParam = searchParams.get('t');
    let selectedTabIndex;
    selectedTabIndex = (selectedTabIndex = TABS.findIndex(x => x.value == selectedTabFromParam)) == -1 ?  0 : selectedTabIndex;

    const userProfileData = {
        fullName: "Rahul Verma",
        email: "rahul.verma@gmail.com",
        mobileNo: "+91 9876 543 210",
        aadharNo: "1234-5678-9876",
        panNo: "ABCDE1234F"
    }

    const getActiveTab = () => {
        switch (selectedTabIndex) {
            case 0: return <MyProfile userProfileData={userProfileData} />;
            case 1: return <Transactions />;
            case 2: return <Bookings />;
            case 3: return <ScheduledVisits />;
            case 4: return <PostedProperties />;
            case 5: return <Wishlist />;
        }
    }

    return (<div className='profile-page container-fluid'>
        <div className="d-flex additional-page-padding">
            <div className="profile-tabs">
                <div className="profile-short-info d-flex flex-column align-items-center">
                    <div className="profile-image">
                        <Image src={"/propertyStatsImg.jpeg"} width={120} height={120} />
                    </div>
                    <div className='name'>Rahul verma</div>
                    <div className='email'>rahulverma@gmail.com</div>
                    <div className='phone-no'>+91 9876 543 210</div>
                </div>
                <div className='tabs'>
                    {TABS.map((item, index) => <Link href={"/profile?t=" + item.value}> {index == selectedTabIndex ? <Heading className='tab-items cursor-pointer' label={item.label} /> :
                        <div className='tab-items cursor-pointer'>{item.label}</div>}</Link>)}
                </div>
            </div>
            <div className='active-tab-container'>
                <div className="tab-name heading">{TABS[selectedTabIndex].label}</div>
                {getActiveTab()}
            </div>
        </div>
    </div>)
}