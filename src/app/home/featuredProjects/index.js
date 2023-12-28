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
                        id={item.id}
                        title={item.name}
                        bhk={item.specification}
                        address={item.address}
                        price={item.ratePerAreaUnit}
                        imgsrc={"/samplePropertyImage.jpeg"}
                        width={400}
                        height={"275px"} />)
            })}
        </CardSlider>
    </div>)
}

export default FeaturedProjects;