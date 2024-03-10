
import React from 'react';
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import ShareIcon from '@/app/icons/share.svg'
import GoogleMapIcon from '@/app/icons/google_map.svg'
import Rating from '@/app/components/rating';
import nearByIcon from '@/app/icons/near_by.svg?url';
import ScheduleCalendar from '@/app/scheduleCalender';
import './styles.scss'
import TalkToConsulantBtn from '@/app/actionBtns/talkToConsultantBtn';
import WishListBtn from '@/app/actionBtns/wishListBtn';
import Helper from '@/common/helper';

export default ({ data, type }) => {
    const isProperty = type == "property";
    return (<div className='property-header'>
        <div className='row g-0'>
            <div className='property-sub-info col-8'>
                <div className='d-flex'>
                    <div className='dev-logo-cnt'>
                        <Image src={data.logo||""} width={90} height={50}></Image>
                    </div>
                    <div>
                        <div className='project-title heading'>{data["name"]}</div>
                        <div className='project-address'>{data["address"]}</div>
                    </div>
                </div>
            </div>
            <div className='property-price-info col-4 text-end'>
                <div className='property-share-icons d-none d-md-flex align-items-center justify-content-end'>
                    <GoogleMapIcon width={24} height={24}/>
                    <WishListBtn width={22} height={20} id={data.id} isProperty={isProperty}/>
                    <ShareIcon width={24} height={24} />
                </div>
            </div>
        </div>
        <div className='row g-0'>
            <div className='property-sub-info col-md-8 col-12'>
                <div className='dev-by'>Developed By {data.developerName}</div>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='rating d-flex align-items-center'>
                        <span className='rating-value'>{data.ratingAverage}</span>
                        <Rating value={Number(data.ratingAverage||0)} />
                        <span className='rating-count'>({data.ratingCount} Ratings)</span>
                    </div>
                    <div className='property-share-icons d-flex d-md-none align-items-center justify-content-end'>
                        <GoogleMapIcon width={24} height={24}/>
                        <WishListBtn width={22} height={20} id={data.id} isProperty={isProperty}/>
                        <ShareIcon width={24} height={24} />
                    </div>
                </div>
                <div className="near-by-details d-flex align-items-center">
                    <Image src={nearByIcon} width={20} height={20}></Image>
                    <span className="near-by-text">{data["nearbyLandmarks"]}</span>
                </div>
                <div className='btn-cnt'>
                    <TalkToConsulantBtn className="talk-to-consultation" height={30} id={data.id} isProperty={isProperty}/>
                    <NextLinkButton variant="outlined-noborder" className="schedule-visit" text='Schedule a Visit' height={30} rounded={true} href={`?schedule=${data.id}`} />
                </div>
            </div>
            <div className='property-price-info col-md-4 text-md-end mt-4 mt-md-0'>
                <div className=''><span className='best-buy-txt'>Best Buy at</span></div>
                <div className="price-range-cnt">
                    <div className="price sub-heading-2">{isProperty ? (Helper.currencyFormatter(data.totalPrice)): (Helper.currencyFormatter(data.minPrice) + "-" + Helper.currencyFormatter(data.maxPrice))}</div>
                    <div className="taxes-applicable">+ Taxes applicable</div>
                </div>
                <div className='btn-cnt'>
                    <NextLinkButton text='Book Now' height={30} rounded={true} href={`/booking/${type}/${data.url}`} />
                </div>
            </div>
        </div>       
    </div>)
}