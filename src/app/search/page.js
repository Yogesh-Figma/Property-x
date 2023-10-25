import React from 'react';
import './styles.scss'
import Filter from './filters';
import { PropertyCard4 } from '@/app/components/ui/propertyCard'
import Card from '@/app/components/card';
import ContactUsForm from '@/app/components/ui/contactUsForm';
import SimilarProjects from './similarProjects';
import SimilarProperties from './similarProperties';
import Map from '../components/ui/map';
import Heading from '@/app/components/heading';
import PropertyDetails from './propertyDetails';
import Link from 'next/link'
import RightLink from '@/app/icons/right_arrow.svg?url';
import Image from 'next/image';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function Page({ params,
    searchParams }) {
    return (<div className='search-page container-fluid'>
        <Filter />
        <div className='row search-section-cnt'>
            <div className='col-6 property-cards'>
                {[1, 2, 3, 4, 5, 6].map(item => <div className='property-card-cont'>
                    <PropertyCard4 title={"Gaur Krishn Villas"}
                        bhk={"2, 3, 4 BHK"}
                        address={"Sector 10, Greater Noida West, Greater Noida"}
                        priceRange={"₹40L-85L"}
                        imgsrc={"/samplePropertyImage.jpeg"}
                        devImage={"/devSampleImage.jpeg"}
                        by={"XYZ Builders"}
                        possessionInfo={"Dec, 2023"}
                        avgPrice={"14.00/sq.ft"}
                        id={item}                  
                        subInfo={"Manorialle is a sound investment on all counts. You experience premium luxury when you live in it, and you yield premium returns when you don&rsquo;t. 40 levels of unique architecture create an imposing structure that blends seamlessly into the illustrious neighborhood. The stunning views from your Condominium on your independent floor will set your pulse racing, while the extraordinary service will soothe your senses, and two elevators, only at your service. This breathtaking community will be home to some of the most unseen marvels inspired by nature, with the utmost optimum utilization"}
                    />
                </div>)}
            </div>
            <div className='col-6'>
                <div className='property-detail'>
                    <PropertyDetails id={searchParams?.id} />
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
        <Link className='d-flex justify-content-end align-items-center property-detail-link sub-heading' href={"/property/" + (searchParams?.id||0)}>View Full Details <Image src={RightLink} width={28} height={28} /></Link>
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