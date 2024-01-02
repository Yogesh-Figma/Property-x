"use client"
import "./styles.scss"
import React from 'react'
import { PropertyCard4 } from '@/app/components/ui/propertyCard'
import { useQuery } from 'react-query';
import { getUserVisits } from '@/clients/visitClient'
import { useSession } from "next-auth/react"
import SlantedTabs from "@/app/components/slantedTabs"
import dayjs from 'dayjs';
let customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


export default ({ }) => {
    const sampleDate = new Date();
    const { data: { user, token } } = useSession();
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
                            {(data.upcoming || []).map(visits => {
                                const data = visits.property || visits.project || {};
                                const visitDate = dayjs(visits.scheduledDateTime);
                                return (<div className='property-card-cont'>
                                    <PropertyCard4
                                        title={data.name}
                                        bhk={data.configurations || (data.configuration || {}).propertyConfigurationName}
                                        address={data.address}
                                        furnishingInfo={data.furnishingStatus?.name}
                                        priceRange={"₹40L-85L"}
                                        imgsrc={"/samplePropertyImage.jpeg"}
                                        devImage={"/devSampleImage.jpeg"}
                                        isProperty={!!visits.property}
                                        by={(data.developer || data.developerId)?.name}
                                        possessionInfo={data.possessionDue}
                                        avgPrice={data.ratePerUnitInsqft || "TO BE ANNOUNCED"}
                                        id={data.id}
                                        showRateNow={true}
                                        showTalkToConsultant={true}
                                        visitDate={visitDate.format("MMM, YYYY")}
                                        visitTime={visitDate.format("hh:mm A")}
                                        subInfo={data.propertySpecification || data.specification}
                                    />
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
                <div label="Visited Projects/Properties">
                    <div className='scheduled-visits'>
                        <div className='property-cards'>
                            {(data.visited || []).map(visits => {
                                const data = visits.property || visits.project || {};
                                const visitDate = dayjs(visits.scheduledDateTime);
                                return (<div className='property-card-cont'>
                                    <PropertyCard4 title={"Gaur Krishn Villas"}
                                        bhk={data.configurations || (data.configuration || {}).propertyConfigurationName}
                                        address={data.address}
                                        furnishingInfo={data.furnishingStatus?.name}
                                        priceRange={"₹40L-85L"}
                                        imgsrc={"/samplePropertyImage.jpeg"}
                                        devImage={"/devSampleImage.jpeg"}
                                        isProperty={!!visits.property}
                                        by={(data.developer || data.developerId)?.name}
                                        possessionInfo={data.possessionDue}
                                        avgPrice={data.ratePerUnitInsqft || "TO BE ANNOUNCED"}
                                        id={data.id}
                                        showRateNow={true}
                                        showTalkToConsultant={true}
                                        visitDate={visitDate.format("MMM, YYYY")}
                                        visitTime={visitDate.format("hh:mm A")}
                                        subInfo={data.propertySpecification || data.specification}
                                    />
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </SlantedTabs>
        </div>)
}