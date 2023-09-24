import React from 'react';
import Overview from '../property/[id]/overview';
import Description from '../property/[id]/description';
import Amenities from '../property/[id]/amenities';
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import shareIcon from '@/app/icons/share.svg'
import instagramSaveIcon from '@/app/icons/save_instagram.svg'
import googleMapIcon from '@/app/icons/google_map.svg'
import downloadIcon from '@/app/icons/download_file.svg'
import Rating from '../components/rating';
import nearByIcon from '@/app/icons/near_by.svg';

const PropertyDetails = ({ }) => {
    return (<>
        <div className='dev-project-image-cnt position-relative'>
            <Image className='dev-project-image' src={"/mahunDeveloperImg.png"} fill={true} />
        </div>
        <div className='row g-0'>
            <div className='property-sub-info col-8'>
                <div className='d-flex'>
                    <div className='dev-logo-cnt'>
                        <Image src={"/devSampleLogo.png"} width={90} height={50}></Image>
                    </div>
                    <div>
                        <div className='project-title heading'>T&T Digitown</div>
                        <div className='project-address'>Siddharth Vihar, Ghaziabad</div>
                    </div>
                </div>

                <div className='dev-by'>Developed By T&T Group</div>
                <div className='rating d-flex align-items-center'>
                    <span className='rating-value'>4.6</span>
                    <Rating value={4.6} />
                    <span className='rating-count'>(246 Ratings)</span>
                </div>
                <div className="near-by-details d-flex align-items-center">
                    <Image src={nearByIcon} width={20} height={20}></Image>
                    <span className="near-by-text">Just a brief 30-minute run away from the nearest metro station.</span>
                </div>
            </div>
            <div className='property-price-info col-4 text-end'>
                <div className='property-share-icons d-flex align-items-center justify-content-end'>
                    <Image src={googleMapIcon} width={24} height={24}></Image>
                    <Image src={instagramSaveIcon} width={20} height={20}></Image>
                    <Image src={shareIcon} width={24} height={24}></Image>
                </div>
                <div className=''>Price Range</div>
                <p className="price-range-cnt">
                    <span className="price sub-heading-2">₹83.17 L - 1.22 Cr</span>
                    <span className="span sub-heading-2">&nbsp;</span>
                    <span className="taxes-applicable">+ Taxes applicable</span>
                </p>
                <NextLinkButton text='Book Now' height={35} rounded={true} href="/" />
            </div>
        </div>
        <div className='d-flex align-items-center justify-content-between btn-cnt'>
            <NextLinkButton className="e-visit" text='e-Visit' height={30} rounded={true} href="/" />
            <NextLinkButton className="schedule-visit-btn" text='Schedule a Visit' height={30} rounded={true} href="/" />
            <NextLinkButton className="talk-consulation-btn" text='Talk to Consultant' height={30} rounded={true} href="/" />
            <NextLinkButton text='Brochure' height={30} rounded={true} variant="outlined" href="/" className="brochure-btn" endIcon={<Image src={downloadIcon} width={12} height={12.5} />} />
        </div>
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