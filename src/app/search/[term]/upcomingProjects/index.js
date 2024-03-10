"use client"
import React from 'react';
import CardSlider from '@/app/components/slider';
import { PropertyCard } from '@/app/components/ui/propertyCard'
import { getUpcomingProjectByCityId , getProjectsByStatus, PROJECT_STATUS } from '@/clients/projectClient'
import { useAppContext } from '@/lib/appContext';
import Heading from '@/app/components/heading';
import { useSession } from "next-auth/react";
import { useQuery } from 'react-query';

const UpcomingProjects = async () => {
    let { userLocation, setUserLocation } = useAppContext() || {};
    const { data: session } = useSession() || {}; 

    let { data: projects = [], isLoading } = useQuery({
        enabled: !!userLocation?.value && !!session?.token,
        queryKey: ['getProjectsByStatus'],
        queryFn: () => getUpcomingProjectByCityId(userLocation?.value, session?.token)
    });

    return (
        !!projects && projects.length > 0 && <div className='additional-page-padding'>
            <div className='similar'>
                <Heading label={"Upcoming Projects"} />
                <div className='similar-projects'>
                    <CardSlider carouselSettings={{ slidesToShow: null, slidesToScroll: 1, variableWidth: true }}>
                        {projects.map((item, index) => <PropertyCard
                            key={index}
                            width={370}
                            height={"275px"}
                            id={item.id}
                            urlText={item.url}
                            title={item.name}
                            bhk={item.specification}
                            address={item.address}
                            avgPrice={item.ratePerUnitInsqft}
                            price={item.totalPrice}
                            imgsrc={item.logo || ""}
                            devImage={item.developerLogo}
                            by={item.developerName}
                            minPrice={item.minPrice}
                            maxPrice={item.maxPrice}
                            rating={item.ratingAverage}
                        />)}
                    </CardSlider>
                </div>

            </div>
        </div>)
}

export default UpcomingProjects;