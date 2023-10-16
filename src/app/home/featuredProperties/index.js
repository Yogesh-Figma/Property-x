import React from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard } from '../../components/ui/propertyCard'
import './styles.scss'

const FeaturedProperties = () => {
    return (<div className='featured-properties'>
        <CardSlider carouselSettings={{ slidesToShow:4, slidesToScroll:1,  variableWidth: true }}>
            {[1, 2, 3, 4, 5, 6].map(item => <PropertyCard postedBy={"Owner"} isProperty={true} title={"Gaur Krishn Villas"} bhk={"2, 3, 4 BHK"} address={"Sector 10, Greater Noida West, Greater Noida"} price={"₹40L-85L"} imgsrc={"/samplePropertyImage.jpeg"} width={250} height={"275px"} devImage={"/devSampleImage.jpeg"} />)}
        </CardSlider>
    </div>)
}

export default FeaturedProperties;