import Card from '@/app/components/card';
import Heading from '@/app/components/heading';
import abstractShape from '@/app/icons/abstract_shape.svg'
import apartment from '@/app/icons/apartment.svg'
import property from '@/app/icons/property.svg'
import startDate from '@/app/icons/start_date.svg'
import shareIcon from '@/app/icons/solar_share-linear.svg'
import callIcon from '@/app/icons/call.svg'
import saveIcon from '@/app/icons/save.svg'
import scheduleIcon from '@/app/icons/schedule.svg'
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import "./styles.scss"

export default ({ showBtn }) => {
    return (
        <>
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
               {showBtn && <div className='btn-container d-flex justify-content-end'>
                    <NextLinkButton className="btn-gradient overview-btn" text='Schedule a Visit' height={40} rounded={true} href="/" icon={<Image src={scheduleIcon} width={20} height={20} />} />
                    <NextLinkButton className="btn-gradient overview-btn" text='Talk to Consultant' height={40} rounded={true} href="/" icon={<Image src={callIcon} width={20} height={20} />} />
                    <NextLinkButton className="btn-gradient overview-btn" text='Save' height={40} rounded={true} href="/" icon={<Image src={saveIcon} width={19} height={19} />} />
                    <NextLinkButton className="btn-gradient overview-btn" text='Share' height={40} rounded={true} href="/" icon={<Image src={shareIcon} width={18} height={18} />} />
                </div>}
            </Card>
        </>)
}