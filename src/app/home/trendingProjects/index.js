import React from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard3 } from '../../components/ui/propertyCard'
import './styles.scss';

const TrendingProjects = () => {
    return (<div className='trending-projects'>
        <CardSlider carouselSettings={{slidesToShow:1, slidesToScroll:1, variableWidth:true, infinite:true, responsive: [],autoplay:true, nextArrow:null, prevArrow:null, autoplaySpeed: 2000}}>
            {[1,2,3,4,5,6].map(item =><PropertyCard3 
            title={"Gaur Krishn Villas"} 
            bhk={"2, 3, 4 BHK"}
             address={"Sector 10, Greater Noida West, Greater Noida"} 
             price={"₹40L-85L"} imgsrc={"/samplePropertyImage.jpeg"} 
             width={760} 
             height={"275px"} 
             devImage={"/devSampleImage.jpeg"}
             by={"XYZ Builders"}/>)}
        </CardSlider>
    </div>)
}

export default TrendingProjects;