
import React from 'react';
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import shareIcon from '@/app/icons/share.svg?url'
import heartIcon from '@/app/icons/heart.svg?url'
import googleMapIcon from '@/app/icons/google_map.svg?url'
import Rating from '@/app/components/rating';
import nearByIcon from '@/app/icons/near_by.svg?url';
import './styles.scss'

export default ({ }) => {
    return (<div className='property-header'>
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
                    <Image src={heartIcon} width={20} height={20} className='heart-icon'></Image>
                    <Image src={shareIcon} width={24} height={24} className='share-icon'></Image>
                </div>
                <div className=''><span className='best-buy-txt'>Best Buy</span>Price Range</div>
                <div className="price-range-cnt">
                    <div className="price sub-heading-2">₹83.17 L - 1.22 Cr</div>
                    <div className="taxes-applicable">+ Taxes applicable</div>
                </div>
            </div>
        </div>
        <div className='d-flex align-items-center justify-content-between btn-cnt'>
            <div>
                <NextLinkButton variant="outlined" className="talk-to-consultation" text='Talk to Consultant' height={30} rounded={true} href="/" />
                <NextLinkButton variant="outlined" className="schedule-visit" text='Schedule a Visit' height={30} rounded={true} href="/" />
            </div>
            <div>
                <NextLinkButton className="e-visit" text='e-Visit' height={30} rounded={true} href="/" />
                <NextLinkButton text='Book Now' height={30} rounded={true} href="/" />
            </div>
        </div>
    </div>)
}