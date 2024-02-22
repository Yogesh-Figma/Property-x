import React from 'react';
import CardSlider from '@/app/components/slider';
import { PropertyCard } from '@/app/components/ui/propertyCard'

const UpcomingProjects = () => {
    return (<div className='similar-projects'>
        <CardSlider carouselSettings={{ slidesToShow: null, slidesToScroll: 1, variableWidth: true  }}>
            {[1, 2, 3, 4, 5, 6].map(item => <PropertyCard id={item}
             width={370} title={"Gaur Krishn Villas"} bhk={"2, 3, 4 BHK"}
              address={"Sector 10, Greater Noida West, Greater Noida"} 
              imgsrc={"/samplePropertyImage.jpeg"}
              avgPrice={"14 sq.ft"}
              price={"123133123"}
               height={"275px"} 
               devImage={"/devSampleImage.jpeg"} 
               minPrice={"123"}
               maxPrice={"213"}/>)}
        </CardSlider>
    </div>)
}

export default UpcomingProjects;