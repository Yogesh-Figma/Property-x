import CardSlider from '../../components/slider';
import React from 'react';
import Card from '../../components/card'
import Image from 'next/image';
import verified_icon from '../../icons/ic_round-verified-user.svg'
import './styles.scss'
import Chip from '../../components/chip';

const TrustedDevelopers = () => {
    return (<div className='trusted-developers'>
        <CardSlider carouselSettings={{ slidesToShow: 4, slidesToScroll: 1 }}>
            {[1, 2, 3, 4, 5, 6, 7, 9, 10].map(i =>
                <div>
                    <Card className='trusted-dev-card'>
                        <div className='d-flex flex-column justify-content-between h-100'>
                            <div className='sub-container'>
                                <div className='image-container d-flex '>
                                    <Image src="/strutiDeveloper.png" width={60} height={60} />
                                    <Image className="verified-image" src={verified_icon} width={24} height={24} />
                                </div>
                                <div className='sub-heading-2'>Struti Developers & Builders</div>
                                <div className='property-info d-flex justify-content-between'>
                                    <span>34Yrs<span className='body-txt'> Experience</span></span>
                                    <span>144 <span className='body-txt'>Properties</span></span>
                                </div>
                            </div>
                            <div className='chip-container'><Chip label="Buran" variant="outlined" /></div>
                        </div>
                    </Card>
                </div>)}
        </CardSlider>
    </div>)
}

export default TrustedDevelopers;