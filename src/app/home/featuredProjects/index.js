import React from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard,PropertyCard2 } from '../../components/ui/propertyCard'
import './styles.scss';

const FeaturedProjects = () => {
    return (<div className='featured-projects'>
        <CardSlider carouselSettings={{slidesToShow:4, slidesToScroll:1}}>
            {[1,2,3,4,5,6].map(item =><PropertyCard title={"Gaur Krishn Villas"} bhk={"2, 3, 4 BHK"} address={"Sector 10, Greater Noida West, Greater Noida"} price={"₹40L-85L"} imgsrc={"/samplePropertyImage.jpeg"} width={"250px"} height={"275px"}/>)}
        </CardSlider>
    </div>)
}

export default FeaturedProjects;