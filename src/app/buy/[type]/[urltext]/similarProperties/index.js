"use client"
import React from 'react';
import CardSlider from '@/app/components/slider';
import { ProjectCard } from '@/app/components/ui/propertyCard'
import { getUpcomingPropertiesByCityId } from '@/clients/propertyClient'
import { useAppContext } from '@/lib/appContext';
import Heading from '@/app/components/heading';
import { useSession } from "next-auth/react";
import { useQuery } from 'react-query';

const SimilarProperties = () => {
    let { userLocation, setUserLocation } = useAppContext() || {};
    const { data: session } = useSession() || {};

    let { data: properties = [], isLoading } = useQuery({
        enabled: !!userLocation?.value && !!session?.token,
        queryKey: ['getUpcomingPropertiesByCityId'],
        queryFn: () => getUpcomingPropertiesByCityId(userLocation?.value, session?.token)
    });

    return (
        !!properties && properties.length > 0 && <div className='similar' id="recommendation">
            <Heading label={"Similar Properties nearby"} />
            <div className='similar-projects'>
                <CardSlider carouselSettings={{ slidesToShow: null, slidesToScroll: 1, variableWidth: true }}>
                    {properties.map((item, index) => <ProjectCard key={index}
                        rating={item.ratingAverage}
                        width={400} height={"275px"}
                        urlText={item.url}
                        id={item.id}
                        title={item.name}
                        bhk={item.specification}
                        address={item.address}
                        avgPrice={item.ratePerUnitInsqft}
                        price={item.totalPrice}
                        imgsrc={item.logo || ""}
                        isProperty={true}
                      />)}
                </CardSlider>
            </div>
        </div>)
}

export default SimilarProperties;