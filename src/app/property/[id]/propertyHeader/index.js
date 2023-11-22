
import React from 'react';
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import ShareIcon from '@/app/icons/share.svg'
import HeartIcon from '@/app/icons/heart.svg'
import GoogleMapIcon from '@/app/icons/google_map.svg'
import Rating from '@/app/components/rating';
import nearByIcon from '@/app/icons/near_by.svg?url';
import ScheduleCalendar from '@/app/scheduleCalender';
import './styles.scss'

export default ({ id }) => {
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
            </div>
            <div className='property-price-info col-4 text-end'>
                <div className='property-share-icons d-none d-md-flex align-items-center justify-content-end'>
                    <GoogleMapIcon width={24} height={24}/>
                    <HeartIcon width={22} height={20}/>
                    <ShareIcon width={24} height={24} />
                </div>
            </div>
        </div>
        <div className='row g-0'>
            <div className='property-sub-info col-md-8 col-12'>
                <div className='dev-by'>Developed By T&T Group</div>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='rating d-flex align-items-center'>
                        <span className='rating-value'>4.6</span>
                        <Rating value={4.6} />
                        <span className='rating-count'>(246 Ratings)</span>
                    </div>
                    <div className='property-share-icons d-flex d-md-none align-items-center justify-content-end'>
                        <GoogleMapIcon width={24} height={24}/>
                        <HeartIcon width={22} height={20}/>
                        <ShareIcon width={24} height={24} />
                    </div>
                </div>
                <div className="near-by-details d-flex align-items-center">
                    <Image src={nearByIcon} width={20} height={20}></Image>
                    <span className="near-by-text">Just a brief 30-minute run away from the nearest metro station.</span>
                </div>
                <div className='btn-cnt'>
                    <NextLinkButton variant="outlined-noborder" className="talk-to-consultation" text='Talk to Consultant' height={30} rounded={true} href="/" />
                    <NextLinkButton variant="outlined-noborder" className="schedule-visit" text='Schedule a Visit' height={30} rounded={true} href="?schedule=123" />
                </div>
            </div>
            <div className='property-price-info col-md-4 text-md-end mt-4 mt-md-0'>
                <div className=''><span className='best-buy-txt'>Best Buy at</span></div>
                <div className="price-range-cnt">
                    <div className="price sub-heading-2">₹83.17 L - 1.22 Cr</div>
                    <div className="taxes-applicable">+ Taxes applicable</div>
                </div>
                <div className='btn-cnt'>
                    <NextLinkButton variant="outlined" className="e-visit" text='e-Visit' height={30} rounded={true} href="/" />
                    <NextLinkButton text='Book Now' height={30} rounded={true} href={`/property/booking/${id}`} />
                </div>
            </div>
        </div>       
    </div>)
}