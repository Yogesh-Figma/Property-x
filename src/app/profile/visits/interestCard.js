"use client"
import React from 'react';

import { getPropertyById } from '@/clients/propertyClient';
import { getProjectById } from '@/clients/projectClient'
import { PropertyCard4 } from '@/app/components/ui/propertyCard'
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
let customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

export default ({ isProperty, id, date, scheduleVisit }) => {
    const { data, isLoading, isError, error } = useQuery({
        enabled: !!id,
        queryKey: ['getPropertyById', id],
        queryFn: () => isProperty ? getPropertyById(id) : getProjectById(id)
    });

    const visitDate = dayjs.unix(date);
    return (<div className='property-card-cont'>
        {!isLoading && !!data && <PropertyCard4
            showBookNow={true}
            title={data.name}
            bhk={data.configurations || (data.configuration || {}).propertyConfigurationName}
            address={data.address}
            furnishingInfo={data.furnishingStatus?.name}
            priceRange={"₹40L-85L"}
            imgsrc={data.logo}
            devImage={data.developerLogo}
            isProperty={isProperty}
            by={(data.developer || data.developerId)?.name}
            possessionInfo={data.possessionDue}
            avgPrice={data.ratePerUnitInsqft || "TO BE ANNOUNCED"}
            price={data.totalPrice}
            id={data.id}
            urlText={data.url}
            showRateNow={true}
            visitDate={visitDate.format("MMM, YYYY")}
            visitTime={visitDate.format("hh:mm A")}
            subInfo={data.propertySpecification || data.specification}
            minPrice={data.minPrice}
            maxPrice={data.maxPrice}
            showScheduleVisitBtn={true}
            onScheduleClick={scheduleVisit}
        />}
    </div>);
}