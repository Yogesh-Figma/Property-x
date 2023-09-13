import React from 'react'
import CardSlider from '../../components/slider';
import Card from '@/app/components/card';
import Image from 'next/image';
import './styles.scss'

const Testimonials = ({ }) => {
    return (<div className='testimonials'>
        <CardSlider carouselSettings={{ slidesToShow: 4, slidesToScroll: 1 }}>
            {[1, 2, 3, 4, 5, 6].map(item => <div>
                <Card className='test-card'>
                    <div className='test-txt'>“I was amazed by the personalized service I received from Property X. Their in-depth knowledge of the Indian real estate market helped me find the perfect home in my preferred location. A big thank you!”</div>
                    <div className="line" />
                    <div className='cust-cont d-flex justify-content-between'>
                        <div className='cust-img-container position-relative'>
                            <Image src="/sampleCustImg.jpeg" fill={true}/>                            
                        </div>
                        <div className='cust-info text-end'>
                            <div className='cust-name sub-heading-3'>Rajesh Kumar</div>
                            <div className='cust-prof sub-heading-3'>House Owner</div>
                            <div className='date sub-heading-3'>Jan 8, 2023</div>
                        </div>
                    </div>
                </Card>
            </div>)}
        </CardSlider>
    </div>)
}

export default Testimonials;