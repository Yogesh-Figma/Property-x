import Card from '@/app/components/card';
import Heading from '@/app/components/heading';
import AbstractShapeIcon from '@/app/icons/abstract_shape.svg'
import ApartmentIcon from '@/app/icons/apartment.svg'
import PropertyIcon from '@/app/icons/property.svg'
import StartDateIcon from '@/app/icons/start_date.svg'
import HouseIcon from '@/app/icons/house.svg'
import SkyscrapperIcon from '@/app/icons/skyscrapper.svg'
import CallIcon from '@/app/icons/call.svg'
import ShareIcon from '@/app/icons/share.svg'
import HeartIcon from '@/app/icons/heart.svg'
import ScheduleIcon from '@/app/icons/schedule.svg'
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import ScheduleCalendar from '@/app/scheduleCalender';
import "./styles.scss"

export default ({ showBtn, data, type }) => {
    return (
        <div id="overview">
            <ScheduleCalendar id={data.id} type={type}/>
            <Heading label={"Overview"} />
            <Card className='property-overview'>
                <div className='property-short-info-cnt'>
                    {<div className='overview-sub-info d-inline-flex'>
                        <ApartmentIcon />
                        <div>
                            <div className='sub-heading-2'>{data["configuration"]?.name|| data.configurations}</div>
                            <div className='sub-info'>Configuration Available</div>
                        </div>
                    </div>}
                    <div className='overview-sub-info d-inline-flex'>
                        <StartDateIcon />
                        <div>
                            <div className='sub-heading-2'>{data["possessionDue"]}</div>
                            <div className='sub-info'>Possession Starts</div>
                        </div>
                    </div>
                    <div className='overview-sub-info d-inline-flex'>
                        <AbstractShapeIcon />
                        <div>
                            <div className='sub-heading-2'>{data["superArea"]}</div>
                            <div className='sub-info'>Sizes</div>
                        </div>
                    </div>
                    {data.totalTowers > 0 && <div className='overview-sub-info d-inline-flex'>
                        <SkyscrapperIcon />
                        <div>
                            <div className='sub-heading-2'>{data.totalTowers}</div>
                            <div className='sub-info'>No of towers</div>
                        </div>
                    </div>}
                   {data.totalUnits > 0 && <div className='overview-sub-info d-inline-flex'>
                        <HouseIcon />
                        <div>
                            <div className='sub-heading-2'>{data.totalUnits}</div>
                            <div className='sub-info'>Total Units</div>
                        </div>
                    </div>}
                    <div className='overview-sub-info d-inline-flex'>
                        <PropertyIcon />
                        <div>
                            <div className='sub-heading-2'>UPRERAPRJ336575</div>
                            <div className='sub-info'>RERA ID</div>
                        </div>
                    </div>
                </div>
                {showBtn && <div className='btn-container d-sm-flex justify-content-end align-items-center'>
                    <span className='overview-btn-cnt'>
                        <NextLinkButton variant="outlined-noborder" className="overview-btn" text='Talk to Consultant' height={40} rounded={true} href="/" />                   
                        <NextLinkButton variant="outlined-noborder" className="overview-btn" text='Schedule a Visit' height={40} rounded={true} href="?schedule=123" />
                    </span>
                    <NextLinkButton text='Book Now' className="overview-btn book-btn" rounded={true} height={40} href={`/booking/${type}/${data.id}`} />
                    <HeartIcon width={22} height={20} className='heart-icon d-none d-md-inline' />
                    <ShareIcon width={24} height={24} className='share-icon d-none d-md-inline' />
                </div>}
            </Card>
        </div>)
}