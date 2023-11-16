import React from 'react'
import CardSlider from '../../components/slider';
import Card from '@/app/components/card';
import Image from 'next/image';
import './styles.scss'

const InsightAndArticles = ({ }) => {
    return (<div className='insight-and-articles'>
        <CardSlider carouselSettings={{ slidesToShow: null, slidesToScroll:1,  variableWidth: true, responsive:[] }}>
            {[1, 2, 3, 4, 5, 6].map(item =>
                <div style={{width:"370px"}}>
                    <div className='insight-card'>
                        <div className='position-relative ing-img-container overflow-hidden'>
                            <Image src="/insightImage.jpeg" fill={true} className="insight-image" />
                        </div>
                        <div className='info sub-heading-2'>Navigating the Housing Market Surge: Expert Tips for Buyers and Sellers</div>
                        <div className='sub-info sub-heading-3'>Stay ahead in a competitive market with insights from seasoned real estate professionals, guiding you through strategic buying and selling decisions. <u>Read More</u></div>
                    </div>
                </div>
            )}
        </CardSlider>
    </div>)
}

export default InsightAndArticles;