import React from 'react';
import CardSlider from '@/app/components/slider';
import Image from 'next/image';
import "./styles.scss"
import Card from '@/app/components/card'

const FloorPlan = () => {
    return (<div className='property-floor-plan'>
        <CardSlider carouselSettings={{  slidesToShow: null, slidesToShow: 2, slidesToScroll: 1, variableWidth:true }}>
            {[1, 2, 3, 4].map(item => <div className='floor-plan-card-container' style={{ width: 704 }}>
                <Card className='d-flex'>
                    <div className='floor-info'>
                        <ul>
                            {["Living Room", "Kitchen", "3 Bedroom", "2 Bathrooms", "3 Balcony", "1434 sq. ft. (133.22 sq. m.)"].map(item => <li>{item}</li>)}
                        </ul>
                    </div>
                    <div className='image-container position-relative'>
                        <Image src={"/floorPlanSample.jpeg"} fill={true} />
                    </div>
                </Card>
            </div>
            )}
        </CardSlider>
    </div>)
}

export default FloorPlan;