import Card from '@/app/components/card';
import Heading from '@/app/components/heading';
import abstractShape from '@/app/icons/abstract_shape.svg?url'
import apartment from '@/app/icons/apartment.svg?url'
import property from '@/app/icons/property.svg?url'
import startDate from '@/app/icons/start_date.svg?url'
import callIcon from '@/app/icons/call.svg?url'
import shareIcon from '@/app/icons/share.svg?url'
import heartIcon from '@/app/icons/heart.svg?url'
import scheduleIcon from '@/app/icons/schedule.svg?url'
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import "./styles.scss"

export default ({ showBtn }) => {
    return (
        <div id="overview">
            <Heading label={"Overview"} />
            <Card className='property-overview'>
                <div className='property-short-info-cnt d-flex flex-wrap justify-content-between'>
                    <div className='overview-sub-info d-inline-flex'>
                        <Image width={45} height={45} src={apartment} />
                        <div>
                            <div className='sub-heading-2'>2, 3 BHK Appartments</div>
                            <div className='sub-info'>Configuration Available</div>
                        </div>

                    </div>
                    <div className='overview-sub-info d-inline-flex'>
                        <Image width={45} height={45} src={startDate} />
                        <div>
                            <div className='sub-heading-2'>Aug, 2026</div>
                            <div className='sub-info'>Possession Starts</div>
                        </div>
                    </div>
                    <div className='overview-sub-info d-inline-flex'>
                        <Image width={45} height={45} src={abstractShape} />
                        <div>
                            <div className='sub-heading-2'>831.00 sq. ft. - 990.00 sq. ft.</div>
                            <div className='sub-info'>Sizes</div>
                        </div>
                    </div>
                    <div className='overview-sub-info d-inline-flex'>
                        <Image width={45} height={45} src={property} />
                        <div>
                            <div className='sub-heading-2'>UPRERAPRJ336575</div>
                            <div className='sub-info'>RERA ID</div>
                        </div>
                    </div>
                </div>
               {showBtn && <div className='btn-container d-flex justify-content-end align-items-center'>
               <NextLinkButton variant="outlined" className="overview-btn" text='Talk to Consultant' height={40} rounded={true} href="/" />
                    <NextLinkButton variant="outlined" className="overview-btn" text='Schedule a Visit' height={40} rounded={true} href="/" />
                    <Image src={heartIcon} width={20} height={20} className='heart-icon'></Image>
                    <Image src={shareIcon} width={24} height={24} className='share-icon'></Image>
                </div>}
            </Card>
        </div>)
}