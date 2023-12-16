import React from 'react';
import Overview from '@/app/buy/[type]/[id]/overview';
import Description from '@/app/buy/[type]/[id]/description';
import Amenities from '@/app/buy/[type]/[id]/amenities';
import Image from 'next/image'
import PropertyHeader from '@/app/buy/[type]/[id]/propertyHeader';
import { getProjectById } from '@/clients/projectClient'

const PropertyDetails = async ({ id }) => {
    const type = "project"
    const data = await getProjectById(id);
    return (<>
        <div className='dev-project-image-cnt position-relative'>
            <Image className='dev-project-image' src={"/mahunDeveloperImg.png"} fill={true} />
        </div>
        <PropertyHeader type={type} data={data}/>
        <Overview  data={data} type={type}/>
        <Description data={data} type={type}/>
        <Amenities data={data} type={type}/>
        {/* <div className='map-container'>
    <Map lat={28.5355} long={77.391029} apiKey={API_KEY}/>
</div>
<Card className="contact-us-card">
    <div className='contact-support text-center sub-heading-2'>Contact Support</div>
    <ContactUsForm />
</Card> */}</>)
}

export default PropertyDetails;