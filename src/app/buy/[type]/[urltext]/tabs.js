"use client"

import React, { useState } from 'react';
import './styles.scss'
import Card from '@/app/components/card';
import CardSlider from '@/app/components/slider';
import { Link } from 'react-scroll'


//data is with width because variable width content requires width to function correctly
function getTabsData(isProperty){
    const tabsData = [
        { txt: "Overview", width: 116, to: "overview" },
        { txt: "About", width: 80, to: "about" },
        { txt: "What's best in it?", width: 180, to: "highlights" },
        { txt: "Amenities", width: 122, to: "amenities" },
        { txt: "Floor Plan", width: 126, to: "floor-plan" },
        { txt: "Payment Plan", width: 154, to: "payment-plan" , disabled:isProperty},
        { txt: "About Developer", width: 200, to: "about-developer" },
        { txt: "FAQs", width: 80, to: "faq" }];
    return tabsData;
}

const scrollEffect = (targetRef) => {
    targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}

export default ({ isProperty }) => {
    const tabsData = React.useMemo(()=> getTabsData(isProperty), [isProperty]);
    return (<Card className='position-sticky property-tab-card'>
        <CardSlider carouselSettings={{
            variableWidth: true, slideToScroll:4, swipeToSlide: false, className: "property-tabs", responsive: [{
                breakpoint: 2000,
                settings: {
                    nextArrow: null, prevArrow: null
                }
            },
            {
                breakpoint: 1164,
                settings: {
                    focusOnSelect: true
                }
            }]
        }}>
            {tabsData.map((item, index) => item.disabled ? null: <div style={{ width: item.width }} className='property-tab'>
                <Link key={index} activeClass="active" className="property-tab-link text-decoration-none text-nowrap" to={item.to} spy={true} smooth={false} offset={-90} >
                    {item.txt}
                </Link>
            </div>)}
        </CardSlider>
    </Card>)
}