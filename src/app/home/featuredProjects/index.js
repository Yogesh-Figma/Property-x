import React from 'react';
import CardSlider from '../../components/slider';
import { ProjectCard } from '../../components/ui/propertyCard'
import './styles.scss';

const FeaturedProjects = () => {
    return (<div className='featured-projects'>
        <CardSlider carouselSettings={{
            slidesToShow: 3, slidesToScroll: 1, variableWidth: true, responsive: [ 
            ]
        }}>
            {[1, 2, 3, 4, 5, 6].map(item => <ProjectCard id={item} title={"Gaur Krishn Villas"} bhk={"2, 3, 4 BHK"} address={"Sector 10, Greater Noida West, Greater Noida"} price={"₹40L-85L"} imgsrc={"/samplePropertyImage.jpeg"} width={400} height={"275px"} />)}
        </CardSlider>
    </div>)
}

export default FeaturedProjects;