"use client"
import "./styles.scss"
import React from 'react'
import { PropertyCard4 } from '@/app/components/ui/propertyCard'
import { useQuery } from 'react-query';
import { getUserVisits } from '@/clients/visitClient'
import { useSession } from "next-auth/react"
import SlantedTabs from "@/app/components/slantedTabs"
import dayjs from 'dayjs';
import NextLinkButton from "@/app/components/nextLinkButton";
import Image from 'next/image';
let customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


export default ({ }) => {
    const sampleDate = new Date();
    const { data: { user, token } = {}  } = useSession();
    const { data = {}, isLoading, isError, error } = useQuery({
        queryKey: ['getUserVisits'],
        queryFn: () => getUserVisits(user.id, token),
    });

    return (
        <div>
            <SlantedTabs className="tab-content">
                <div label="Upcoming Visits">
                    <div className='scheduled-visits'>
                        <div className='property-cards'>
                            {!isLoading && data.upcoming.length == 0 ? <div className="no-result d-flex align-items-center justify-content-center flex-column">
                                <Image alt="schedule no result" src={"/scheduleNoResult.png"} width={221} height={150} className="mb-3 mt-3" />
                                <div className="message mb-3 heading-4d">Looks like you didn't schedule any visit!</div>
                                <NextLinkButton rounded={true} height={40} text={"Start Booking Now"} href={"/"} />
                            </div> : (data.upcoming || []).map(visits => {
                                const data = visits.property || visits.project || {};
                                const visitDate = dayjs.unix(visits.scheduledDateTime);
                                return (<div className='property-card-cont'>
                                    <PropertyCard4
                                        title={data.name}
                                        bhk={data.configurations || (data.configuration || {}).propertyConfigurationName}
                                        address={data.address}
                                        furnishingInfo={data.furnishingStatus?.name}
                                        priceRange={"₹40L-85L"}
                                        imgsrc={data.logo}
                                        devImage={data.developerLogo}
                                        isProperty={!!visits.property}
                                        by={(data.developer || data.developerId)?.name}
                                        possessionInfo={data.possessionDue}
                                        avgPrice={data.ratePerUnitInsqft || "TO BE ANNOUNCED"}
                                        price={data.totalPrice}
                                        id={data.id}
                                        urlText={data.url}
                                        showRateNow={true}
                                        showTalkToConsultant={true}
                                        visitDate={visitDate.format("MMM, YYYY")}
                                        visitTime={visitDate.format("hh:mm A")}
                                        subInfo={data.propertySpecification || data.specification}
                                        minPrice={data.minPrice}
                                        maxPrice={data.maxPrice}
                                    />
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
                <div label="Visited Projects/Properties">
                    <div className='scheduled-visits'>
                        <div className='property-cards'>
                            {!isLoading && data.visited.length == 0 ? <div className="no-result d-flex align-items-center justify-content-center flex-column">
                                <Image alt="schedule no result" src={"/scheduleNoResult.png"} width={221} height={150} className="mb-3 mt-3" />
                                <div className="message mb-3 heading-4d">Looks like you didn't schedule any visit.</div>
                                <NextLinkButton rounded={true} height={40} text={"Schedule a Visit"} href={"/"} />
                            </div> : (data.visited || []).map(visits => {
                                const data = visits.property || visits.project || {};
                                const visitDate = dayjs.unix(visits.scheduledDateTime);
                                return (<div className='property-card-cont'>
                                    <PropertyCard4 
                                        title={data.name}
                                        bhk={data.configurations || (data.configuration || {}).propertyConfigurationName}
                                        address={data.address}
                                        furnishingInfo={data.furnishingStatus?.name}
                                        imgsrc={data.logo || ""}
                                        devImage={data.developerLogo}
                                        isProperty={!!visits.property}
                                        by={(data.developer || data.developerId)?.name}
                                        possessionInfo={data.possessionDue}
                                        avgPrice={data.ratePerUnitInsqft || data.ratePerAreaUnit || "TO BE ANNOUNCED"}
                                        id={data.id}
                                        urlText={data.url}
                                        showRateNow={true}
                                        showTalkToConsultant={true}
                                        visitDate={visitDate.format("MMM, YYYY")}
                                        visitTime={visitDate.format("hh:mm A")}
                                        subInfo={data.propertySpecification || data.specification}
                                        minPrice={data.minPrice}
                                        maxPrice={data.maxPrice}
                                    />
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </SlantedTabs>
        </div>)
}