import React from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard2 } from '../../components/ui/propertyCard'
import './styles.scss';

const UpComingProjects = () => {
    return (<div className='upcoming-projects overflow-container-fluid'>
        <CardSlider carouselSettings={{ slidesToShow: 3.5, slidesToScroll: 1, autoplay:true, nextArrow:null, prevArrow:null, autoplaySpeed: 2000, infinite:true }}>
            {[1, 2, 3, 4, 5, 6].map(item => <PropertyCard2 id={item} title={"Gaur Krishn Villas"} bhk={"2, 3, 4 BHK"} address={"Sector 10, Greater Noida West, Greater Noida"} price={"₹40L-85L"} imgsrc={"/samplePropertyImage.jpeg"} width={250} height={"275px"} devImage={"/devSampleImage.jpeg"} />)}
        </CardSlider>
    </div>)
}

export default UpComingProjects;