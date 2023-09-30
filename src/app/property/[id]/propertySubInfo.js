import React from 'react';
import './styles.scss'
import Card from '@/app/components/card';
import Heading from '@/app/components/heading';
import abstractShape from '@/app/icons/abstract_shape.svg?url'
import apartment from '@/app/icons/apartment.svg?url'
import property from '@/app/icons/property.svg?url'
import startDate from '@/app/icons/start_date.svg?url'
import shareIcon from '@/app/icons/solar_share-linear.svg?url'
import callIcon from '@/app/icons/call.svg?url'
import saveIcon from '@/app/icons/save.svg?url'
import scheduleIcon from '@/app/icons/schedule.svg?url'
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';

const AMENITIES = [{ name: "Gated Community", img: "/amenities/gate.svg?url" },
{ name: "24/7 Power Backup", img: "/amenities/generator.svg?url" },
{ name: "Water Conservation", img: "/amenities/water.svg?url" },
{ name: "Open Parking", img: "/amenities/parking.svg?url" },
{ name: "CCTV", img: "/amenities/cctv.svg?url" },
{ name: "Store Water Drains", img: "/amenities/storm_water_drain.svg?url" },
{ name: "Solid Waste Management", img: "/amenities/solid_waste_management.svg?url" },
{ name: "Swimming Pool", img: "/amenities/swimming_pool.svg?url" },
{ name: "Multipurpose Hall", img: "/amenities/convention.svg?url" },
{ name: "Jogging Track", img: "/amenities/jogging.svg?url" },
{ name: "Meter Room", img: "/amenities/electric_meter.svg?url" },
{ name: "Fire Fighting System", img: "/amenities/sprinkler.svg?url" },
{ name: "Landscape Garden", img: "/amenities/forest.svg?url" },
{ name: "Gymnasium", img: "/amenities/gym.svg?url" },
{ name: "Children’s Play Area", img: "/amenities/playground.svg?url" }];

export default function PropertySubInfo() {
    return (
        <>
            <Heading label={"Overview"} />
            <Card className='overview'>
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
                <div className='btn-container d-flex justify-content-end'>
                    <NextLinkButton className="btn-gradient overview-btn" text='Schedule a Visit' height={40} rounded={true} href="/" icon={<Image src={scheduleIcon} width={20} height={20} />} />
                    <NextLinkButton className="btn-gradient overview-btn" text='Talk to Consultant' height={40} rounded={true} href="/" icon={<Image src={callIcon} width={20} height={20} />} />
                    <NextLinkButton className="btn-gradient overview-btn" text='Save' height={40} rounded={true} href="/" icon={<Image src={saveIcon} width={19} height={19} />} />
                    <NextLinkButton className="btn-gradient overview-btn" text='Share' height={40} rounded={true} href="/" icon={<Image src={shareIcon} width={18} height={18} />} />
                </div>

            </Card>
            <Heading label={"Description"} />
            <Card className='description'>
                <p className="project-title sub-heading">Welcome to the world of T And T Digitown, where convenience and comfort converge.</p>
                <div className='project-location'>Siddharth Vihar, Ghaziabad</div>
                <div className='info-box-container'>
                    <div className='info-box d-inline-flex align-items-center justify-content-center flex-column'>
                        <div className='sub-heading-2'>1690 sq.ft</div>
                        <div className='sub-info'>Build Up Area</div>
                    </div>
                    <div className='info-box d-inline-flex align-items-center justify-content-center flex-column'>
                        <div className='sub-heading-2'>₹ 5.70 K/ sq. ft.</div>
                        <div className='sub-info'>Avg. Price</div>
                    </div>
                </div>
                <div className='property-description'>
                    Discover Homes for Sale in Siddharth Vihar, Ghaziabad. Presenting T And T Digitown, an impeccably designed
                    project by T&amp;T Group. This development offers a range of Under Construction units, with a focus on
                    Apartments. If you&#39;re in search of a new home, T And T Digitown is a must-see. The available configurations
                    include spacious 3 BHK layouts, and the units are generously sized at 1690.0 sq.ft., as per the area plan.
                    Projected possession is set for August 2026, and the project is ideally situated in Siddharth Vihar.
                    <br />
                    The property boasts an array of amenities including Power Backup and Fire Sprinklers. Ensuring your safety and
                    peace of mind, there&#39;s round-the-clock security and the convenience of a Gated Community. These enriching
                    amenities elevate the allure of this property, making it an absolute aspiration.
                    <br />
                    T&amp;T Group stands tall as a reputable name in the real estate realm. Established in 2014, the company has
                    successfully delivered three noteworthy projects.
                    <br />
                    Siddharth Vihar enjoys a robust social infrastructure with banks, schools, and parks in close proximity. Plus,
                    the area is excellently connected to different parts of the city through a reliable public transport network.
                </div>
            </Card>
            <Heading label={"Amenities"} />
            <Card className='amenities  d-flex flex-wrap'>
                {AMENITIES.map((item, index) => <div className='amenity text-center' key={index}>
                    <Image src={item.img} width={45} height={45} />
                    <div className='sub-info'>{item.name}</div>
                </div>)}
            </Card>
        </>)
}