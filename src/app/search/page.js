import React from 'react';
import './styles.scss'
import Filter from './filters';
import { PropertyCard4 } from '@/app/components/ui/propertyCard'
import SimilarProjects from './similarProjects';
import SimilarProperties from './similarProperties';
import Map from '../components/ui/map';
import Heading from '@/app/components/heading';
import PropertyDetails from './propertyDetails';
import Link from 'next/link'
import RightLink from '@/app/icons/right_arrow.svg?url';
import Image from 'next/image';
import { getAllProjects } from '@/clients/projectClient'

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default async function Page({ params,
    searchParams }) {
        const data = await getAllProjects() || [];
    return (<div className='search-page container-fluid'>
        <Filter />
        <div className='row search-section-cnt'>
            <div className='col-xl-6 col-12 property-cards  overflow-lg-scroll'>
                {data.map(item => <div className='property-card-cont'>
                    <PropertyCard4 title={item.projectName}
                        bhk={"2, 3, 4 BHK"}
                        address={item.projectAddress}
                        priceRange={item.projectRatePerAreaUnit}
                        imgsrc={"/samplePropertyImage.jpeg"}
                        devImage={"/devSampleImage.jpeg"}
                        by={item.projectDeveloperId?.developerLegalName}
                        possessionInfo={item.projectPossessionDue}
                        avgPrice={item.projectRatePerAreaUnit}
                        id={item.projectId}                  
                        subInfo={item.projectDescription}
                    />
                </div>)}
            </div>
            <div className='col-6 d-xl-block d-none'>
                <div className='property-detail'>
                    <PropertyDetails id={searchParams?.id || data[0]?.projectId} />
                </div>
                {/* <div className='map-container'>
                    <Map lat={28.5355} long={77.391029} apiKey={API_KEY}/>
                </div>
                <Card className="contact-us-card">
                    <div className='contact-support text-center sub-heading-2'>Contact Support</div>
                    <ContactUsForm />
                </Card> */}
            </div>
        </div >
        <Link className='d-xl-flex d-none justify-content-end align-items-center property-detail-link sub-heading' href={"/buy/project/" + (searchParams?.id||0)}>View Full Details <Image src={RightLink} width={28} height={28} /></Link>
        <div className='additional-page-padding'>
            <div className='similar'>
                <Heading label={"Similar Projects"} />
                <SimilarProjects />
            </div>
            <div className='similar'>
                <Heading label={"Similar Properties"} />
                <SimilarProperties />
            </div>
        </div>
    </div >)
}