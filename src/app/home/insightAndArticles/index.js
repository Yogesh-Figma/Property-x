import React from 'react'
import CardSlider from '../../components/slider';
import Card from '@/app/components/card';
import Image from 'next/image';
import './styles.scss'
import { getAllBlogs } from '@/clients/blogClient';
import Link from 'next/link'

const InsightAndArticles = async ({ }) => {
    const blogs = await getAllBlogs();
    return (<div className='insight-and-articles'>
        <CardSlider carouselSettings={{ slidesToShow: null, slidesToScroll:1,  variableWidth: true}}>
            {blogs.map((item, index) =>
                <div style={{width:"370px"}} key={index}>
                    <div className='insight-card'>
                        <div className='position-relative ing-img-container overflow-hidden'>
                            <Image src={item.urls[0]} fill={true} className="insight-image" />
                        </div>
                        <div className='info sub-heading-2'>{item.headings}</div>
                        <div className='sub-info sub-heading-3'>{item.subHeading}</div>
                        <Link href={`/insightsAndArticles/${item.id}`} className='sub-info'>Read More</Link>
                    </div>
                </div>
            )}
        </CardSlider>
    </div>)
}

export default InsightAndArticles;