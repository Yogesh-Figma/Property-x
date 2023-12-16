import React from 'react'
import CardSlider from '../../components/slider';
import Card from '@/app/components/card';
import Image from 'next/image';
import './styles.scss'
import { getAllTestimonials } from '@/clients/testimonialsClient';
import dayjs from 'dayjs';
import OverflowTip from '@/app/components/OverflowTip';

const Testimonials = async ({ }) => {
    const testimonials = await getAllTestimonials();

    return (<div className='testimonials'>
        <CardSlider carouselSettings={{ slidesToShow: null, slidesToScroll:1,  variableWidth: true }}>
            {testimonials.map((testimonial, index) => <div style={{width:"287px"}} key={index}>
                <Card className='test-card'>
                    <div className='test-txt'><OverflowTip text={testimonial.description} lines={5}/></div>
                    <div className="line" />
                    <div className='cust-cont d-flex justify-content-between'>
                        <div className='cust-img-container position-relative'>
                            <Image src="/sampleCustImg.jpeg" fill={true}/>                            
                        </div>
                        <div className='cust-info text-end'>
                            <div className='cust-name sub-heading-3'>{testimonial.name||"Anonymous"}</div>
                            <div className='cust-prof sub-heading-3'>{testimonial.ownerType}</div>
                            <div className='date sub-heading-3'>{dayjs(testimonial.createdDateTime).format('MMM D,YYYY')}</div>
                        </div>
                    </div>
                </Card>
            </div>)}
        </CardSlider>
    </div>)
}

export default Testimonials;