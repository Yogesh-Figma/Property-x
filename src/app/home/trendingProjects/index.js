import React, {Suspense } from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard3 } from '../../components/ui/propertyCard'
import {PROJECT_STATUS, getProjectsByStatus} from '@/clients/projectClient'
import './styles.scss';

const TrendingProjects = async () => {
    const projects = await getProjectsByStatus(PROJECT_STATUS.TRENDING);
    return (
        <div className='trending-projects'>
            <CardSlider carouselSettings={{  slidesToShow: null, slidesToScroll: 1, variableWidth: true, infinite: true, responsive: [{
                 breakpoint: 912,
                 settings: {
                   slidesToShow: 1.2,
                   slidesToScroll: 1
                 }
                }
            ], autoplay: true, nextArrow: null, prevArrow: null, autoplaySpeed: 2000 }}>
                {projects.map(item => { 
                    let address = "";
                    if (!!item.projectAddress) {
                        let { locality = {}, city = {} } = item.projectAddress;
                        address = locality.localityName + ", " + city.cityName
                    }
                    return(<PropertyCard3
                    title={item.projectName}
                    bhk={item.projectConfiguration}
                    address={address?? "Dummy Address"}
                    price={item.projectOtherChargesPerAreaUnit}
                    imgsrc={"/samplePropertyImage.jpeg"}
                    maxWidth={760}
                    width={760}
                    height={"275px"}
                    devImage={"/devSampleImage.jpeg"}
                    by={item.projectListedBy} 
                    id={item.projectId}
                    />)})}
                    
            </CardSlider>
        </div>)
}

export default TrendingProjects;