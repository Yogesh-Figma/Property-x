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
            {projects.map(item => {
                let address = "";
                if (!!item.projectAddress) {
                    let { locality = {}, city = {} } = item.projectAddress;
                    address = locality.localityName + ", " + city.cityName
                }
                return (
                    <ProjectCard
                        id={item.projectId}
                        title={item.projectName}
                        bhk={item.projectConfiguration}
                        address={address}
                        price={item.projectOtherChargesPerAreaUnit}
                        imgsrc={"/samplePropertyImage.jpeg"}
                        width={400}
                        height={"275px"} />)
            })}
        </CardSlider>
    </div>)
}

export default FeaturedProjects;