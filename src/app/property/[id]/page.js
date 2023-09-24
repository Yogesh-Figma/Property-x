import React from 'react';
import './styles.scss'
import SimilarProjects from './similarProjects';
import SimilarProperties from './similarProperties';
import Heading from '@/app/components/heading';
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import FloorPlan from './floorPlan';
import Link from 'next/link'
import Overview from './overview';
import Description from './description';
import Amenities from './amenities';


const BREADCRUMB = [{ name: "Home", url: "#" }, { name: "Ghaziabad", url: "#" }, { name: "Siddharth Vihar", url: "#" }, { name: "Siddharth Vihar", url: "#" },]
export default function Page() {
    return (<div className='property-page container-fluid'>
        <div className='additional-page-padding'>
            <div className='breadcrumb'>
                {BREADCRUMB.map((item, index) => <><Link href={item.url}>{item.name}</Link>{index != BREADCRUMB.length - 1 && <span>/</span>}</>)}
            </div>
            <div className='d-flex'>
                <div className='property-sub-info d-flex'>
                    <div className='dev-logo-cnt'>
                        <Image src={"/devSampleLogo.png"} width={86} height={46}></Image>
                    </div>
                    <div>
                        <div className='project-title'>T&T Digitown</div>
                        <div className='project-address'>Siddharth Vihar, Ghaziabad</div>
                    </div>


                    <div className='dev-by'>Developed By T&T Group</div>
                </div>
                <div className='property-price-info'>
                    <div className=''>Price Range</div>
                    <p className="element-l-cr">
                        <span className="text-wrapper">₹83.17 L - 1.22 Cr</span>
                        <span className="span">&nbsp;</span>
                        <span className="text-wrapper-2">+ Taxes applicable</span>
                    </p>
                    <NextLinkButton text='Book Now' height={35} rounded={true} href="/" />
                </div>
            </div>
            <div className="label">
                <p className="text-wrapper">Just a brief 30-minute run away from the nearest metro station.</p>
            </div>
        </div>
        <div className='additional-page-padding'>
            <Overview />
            <Description />
            <Amenities />
            <Heading label={"Floor Plan"} />
            <FloorPlan />
            <div className='similar'>
                <Heading label={"Properties in this project"} />
                <SimilarProperties />
            </div>
            <div className='similar'>
                <Heading label={"Recommendation"} />
                <SimilarProjects />
            </div>
        </div>
    </div>)
}