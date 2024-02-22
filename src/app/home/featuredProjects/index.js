import React from 'react';
import CardSlider from '@/app/components/slider';
import { ProjectCard } from '@/app/components/ui/propertyCard'
import { PROJECT_STATUS, getProjectsByStatus } from '@/clients/projectClient'
import './styles.scss';

const FeaturedProjects = async () => {
    const projects = await getProjectsByStatus(PROJECT_STATUS.FEATURED);
    return (<div className='featured-projects'>
        <CardSlider carouselSettings={{
            slidesToShow: null, slidesToScroll: 1, variableWidth: true
        }}>
            {projects.map((item, index) => {
                return (
                    <ProjectCard
                        key={index}
                        urlText={item.url}
                        id={item.id}
                        title={item.name}
                        bhk={item.specification}
                        address={item.address}
                        avgPrice={item.ratePerUnitInsqft}
                        price={item.totalPrice}
                        imgsrc={item.logo || ""}
                        width={400}
                        height={"275px"} 
                        minPrice={item.minPrice}
                        maxPrice={item.maxPrice}/>)
            })}
        </CardSlider>
    </div>)
}

export default FeaturedProjects;