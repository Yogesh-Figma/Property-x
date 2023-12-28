import React from 'react';
import { getDeveloperById, getAllDevelopers } from '@/clients/developerClient';
import { getAllProjects } from '@/clients/projectClient';
import Image from 'next/image';
import Rating from '@/app/components/rating'
import { PropertyCard4 } from "@/app/components/ui/propertyCard";
import Heading from '@/app/components/heading';
import OverflowTip from '@/app/components/OverflowTip';
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth/next";
import Chip from '@/app/components/chip';
import dayjs from 'dayjs';
import './styles.scss'
let customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)



export default async function Page({ params: { id }, }) {
    const session = await getServerSession(authOptions)
    const { data = {}, projects = {} } = await Promise.allKeys({ data: getDeveloperById(id, session?.token), projects: getAllProjects() });
    //const { data1= [], projects={}} = await Promise.allKeys({data:getAllDevelopers(), projects:getAllProjects()});
    //const data = data1[0];


    let operatingCities = (data.operatingCities || "").split(",") || [];
    data.average = 4;

    return (
        <div className='developer-page container-fluid'>
            <div className='additional-page-padding'>
                <div className='d-flex align-items-start'>
                    <div className='image-container d-flex pe-3'>
                        <Image src="/strutiDeveloper.png" width={100} height={100} />
                    </div>
                    <div className='dev-info'>
                        <div className='heading'>{data.legalName}</div>
                        <div className='rating d-flex align-items-center sub-info'>
                            {data.average > 0 && <><span className='rating-value'>{data.average}</span>
                                <Rating value={Number(data.average)} /></>}
                        </div>
                        <div className='property-info-cnt  d-none d-md-block'>
                            <DevInfo data={data} />
                        </div>
                    </div>
                </div>
                <div className='dev-info d-md-none'>
                    <DevInfo data={data} />
                </div>
                <div className='dev-description body-txt'><OverflowTip text={data.description} lines={7} /></div>
                <Heading label={"Project Accross Cities"} />
                {operatingCities.map(city => <Chip label={city} variant="randomColor" />)}
                <Heading label={"Discover Our Projects"} />
                <div className='property-cards'>
                    {projects.map(item => <div className='property-card-cont'>
                        <PropertyCard4 title={item.name}
                            verticalView={true}
                            bhk={"2, 3, 4 BHK"}
                            address={item.address}
                            priceRange={item.ratePerAreaUnit}
                            imgsrc={"/samplePropertyImage.jpeg"}
                            devImage={"/devSampleImage.jpeg"}
                            by={item.developer?.legalName}
                            possessionInfo={item.possessionDue}
                            avgPrice={item.ratePerAreaUnit}
                            id={item.id}
                            subInfo={item.description}
                            showRating={true}
                            ratingCnt={item.ratingCount}
                            ratingValue={item.average}
                            rera={item.rera}
                        />
                    </div>)}
                </div>
            </div>
        </div>
    )
}

const DevInfo = ({ data }) => {
    const dateObj = dayjs(data.foundedOn, "DD/MM/YYYY");
    const date2 = dayjs();
    let years = date2.diff(dateObj, 'years');
    return <>
        <div className='property-info'>
            <span>{dateObj.format('YYYY')}<span className='body-txt'> Year Estd</span></span>
            <span>{years}<span className='body-txt'> Years Experience</span></span>
            <span>{data.totalProjects} <span className='body-txt'>Projects</span></span>
        </div>
    </>
}