import React from 'react';
import CardSlider from '@/app/components/slider';
import { PropertyCard } from '@/app/components/ui/propertyCard'

const SimilarProperties = () => {
    return (<div className='similar-properties'>
        <CardSlider carouselSettings={{  slidesToShow: null, slidesToScroll: 1, variableWidth: true }}>
            {[1, 2, 3, 4, 5, 6].map((item, index) => <PropertyCard
                key={index}
                isProperty={true}
                title={"Gaur Krishn Villas"}
                postedBy={"Owner"}
                bhk={"2, 3, 4 BHK"}
                address={"Sector 10, Greater Noida West, Greater Noida"}
                price={"₹40L-85L"}
                imgsrc={"/samplePropertyImage.jpeg"}
                width={270}
                height={"275px"}
                devImage={"/devSampleImage.jpeg"}
                id={item} />)}
        </CardSlider>
    </div>)
}

export default SimilarProperties;