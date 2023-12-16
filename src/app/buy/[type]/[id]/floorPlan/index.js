import React from 'react';
import CardSlider from '@/app/components/slider';
import Image from 'next/image';
import "./styles.scss"
import Card from '@/app/components/card'

const FloorPlan = ({ floorPlan}) => {
    return (<div className='property-floor-plan'>
        <CardSlider carouselSettings={{  slidesToShow: null, slidesToShow: null, slidesToScroll: 1, variableWidth:true, centerMode:false }}>
            {[1].map((item, index) => <div  key={index} className='floor-plan-card-container' style={{ width: 704 }}>
                <Card className='d-flex'>
                    <div className='floor-info'>
                        <ul>
                            {Object.values(floorPlan.floorPlan).map(item => <li>{item}</li>)}
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