import React from 'react';
import Overview from '../property/[id]/overview';
import Description from '../property/[id]/description';
import Amenities from '../property/[id]/amenities';
import Image from 'next/image'
import PropertyHeader from '../property/[id]/propertyHeader';

const PropertyDetails = ({ }) => {
    return (<>
        <div className='dev-project-image-cnt position-relative'>
            <Image className='dev-project-image' src={"/mahunDeveloperImg.png"} fill={true} />
        </div>
        <PropertyHeader />
        <Overview />
        <Description />
        <Amenities />
        {/* <div className='map-container'>
    <Map lat={28.5355} long={77.391029} apiKey={API_KEY}/>
</div>
<Card className="contact-us-card">
    <div className='contact-support text-center sub-heading-2'>Contact Support</div>
    <ContactUsForm />
</Card> */}</>)
}

export default PropertyDetails;