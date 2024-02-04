"use client"
import React from 'react';
import CardSlider from '@/app/components/slider';
import Image from 'next/image';
import "./styles.scss"
import Card from '@/app/components/card'

const FloorPlan = ({ floorPlan = {} }) => {
    const floorPlansAvailable = ["2 BHK", "3 BHK", "4 BHK", "5 BHK"];
    const [selectedPlan, selectFloorPlan] = React.useState(0);
    return (<div className='property-floor-plan'>
        <div className='floor-plains-available d-flex'>
            {floorPlansAvailable.map((plan, index) => {
                return (<div onClick={() => selectFloorPlan(index)} className={`floor-option cursor-pointer d-flex align-items-center justify-content-center
                 ${index == selectedPlan ? ' selected' : ''}`}>{plan}</div>)
            })}
        </div>
        <div className='no-available'>2 Plans available</div>
        <CardSlider carouselSettings={{ slidesToShow: null, slidesToShow: null, slidesToScroll: 1, variableWidth: true, centerMode: false }}>
            {[1].map((item, index) => <div key={index} className='floor-plan-card-container' style={{ width: 704 }}>
                <Card className='d-flex'>
                    <div className='floor-info'>
                        <ul>
                            {Object.values(floorPlan.floorPlan || []).map(item => <li>{item}</li>)}
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