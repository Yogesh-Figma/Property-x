import React, {Suspense } from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard3 } from '../../components/ui/propertyCard'
import { getPropertyById } from '@/clients/propertyClient';
import './styles.scss';

const TrendingProjects = async () => {
    const data = await getPropertyById();
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
                {[1, 2, 3, 4, 5, 6].map(item => <PropertyCard3
                    title={"Gaur Krishn Villas"}
                    bhk={"2, 3, 4 BHK"}
                    address={"Sector 10, Greater Noida West, Greater Noida"}
                    price={"₹40L-85L"} imgsrc={"/samplePropertyImage.jpeg"}
                    maxWidth={760}
                    width={760}
                    height={"275px"}
                    devImage={"/devSampleImage.jpeg"}
                    by={"XYZ Builders"} 
                    id={item}
                    data={data}
                    />)}
                    
            </CardSlider>
        </div>)
}

export default TrendingProjects;