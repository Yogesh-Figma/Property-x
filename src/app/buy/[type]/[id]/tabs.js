"use client"

import React, { useState } from 'react';
import './styles.scss'
import Card from '@/app/components/card';
import CardSlider from '@/app/components/slider';
import { Link } from 'react-scroll'


//data is with width because variable width content requires width to function correctly
const tabsData = [
    { txt: "Overview", width: 116, to: "overview" },
    { txt: "Description", width: 136, to: "description" },
    { txt: "Amenities", width: 122, to: "amenities" },
    { txt: "Floor Plan", width: 126, to: "floor-plan" },
    { txt: "Properties in this Project", width: 267, to: "properties-in-project" },
    { txt: "Recommendation", width: 206, to: "recommendation" },
    { txt: "FAQs", width: 80, to: "faq" }]

const scrollEffect = (targetRef) => {
    targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
}

export default ({ }) => {
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
            {tabsData.map((item, index) => <div style={{ width: item.width }} className='property-tab'>
                <Link key={index} activeClass="active" className="property-tab-link text-decoration-none text-nowrap" to={item.to} spy={true} smooth={false} offset={-90} >
                    {item.txt}
                </Link>
            </div>)}
        </CardSlider>
    </Card>)
}