"use client"
import React from 'react';
import { useSession } from "next-auth/react";
import CardSlider from '@/app/components/slider';
import './styles.scss'
import { ProjectCard } from '@/app/components/ui/propertyCard'
import { getUpcomingProjectByCityId } from '@/clients/projectClient'
import { useQuery } from 'react-query';
import { useAppContext } from '@/lib/appContext';

const UpcomingLaunches = () => {
    let { userLocation, setUserLocation } = useAppContext() || {};
    const { data: session } = useSession() || {};

    let { data: projects = [], isLoading } = useQuery({
        enabled: !!userLocation?.value && !!session?.token,
        queryKey: ['getUpcomingProjectByCityId'],
        queryFn: () => getUpcomingProjectByCityId(userLocation?.value, session?.token)
    });

    return (!!projects && projects.length > 0 && <div className='upcoming-launches'>
        <div className='title heading'>Upcoming Launches nearby</div>
        <CardSlider carouselSettings={{ slidesToShow: null, slidesToScroll: 1, variableWidth: true }}>
            {projects.map((item, index) => <ProjectCard
                rating={item.ratingAverage}
                width={400} height={"275px"}
                key={index}
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
                maxPrice={item.maxPrice} />)}
        </CardSlider>
    </div>)
}

export default UpcomingLaunches;