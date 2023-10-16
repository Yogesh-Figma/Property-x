import CardSlider from '../../components/slider';
import React from 'react';
import Card from '../../components/card'
import Image from 'next/image';
import verified_icon from '../../icons/ic_round-verified-user.svg?url'
import './styles.scss'
import Chip from '../../components/chip';
import verticalGradientLine from '@/app/icons/vertical_gradient_line.svg?url'

const TrustedDevelopers = () => {
    return (<div className='trusted-developers'>
        <CardSlider carouselSettings={{ slidesToShow:3, slidesToScroll:1,  variableWidth: true, responsive:[]}}>
            {[1, 2, 3, 4, 5, 6, 7, 9, 10].map(i =>
                <div style={{minWidth:"334px",width:"334px"}}>
                    <Card className='trusted-dev-card position-relative d-flex'>
                        <div className='vertical-line position-relative'>
                            <Image className="" src={verticalGradientLine} fill={true} />
                        </div>
                        <div className='d-flex flex-column justify-content-between h-100 trusted-dev-card-info'>
                            <div className='sub-container'>
                                <div className='image-container d-flex '>
                                    <Image src="/strutiDeveloper.png" width={60} height={60} />
                                    <Image className="verified-image" src={verified_icon} width={24} height={24} />
                                </div>
                                <div className='sub-heading-2'>Struti Developers & Builders</div>
                                <div className='property-info d-flex justify-content-between'>
                                    <span>1990<span className='body-txt'> Year Estd</span></span>
                                    <span>34<span className='body-txt'> Years Experience</span></span>
                                    <span>144 <span className='body-txt'>Projects</span></span>
                                </div>
                            </div>
                            <div className='horizontal-line'></div>
                            <div className='chip-container'>
                                <Chip label="Mumbai" variant="randomColor" />
                                <Chip label="Thane" variant="randomColor" />
                                <Chip label="Gurgaon" variant="randomColor" />
                                <Chip label="Faridabad" variant="randomColor" />
                                <Chip label="Pune" variant="randomColor" />
                                <Chip label="Kurukshetra" variant="randomColor" />
                                <Chip label="Nagpur" variant="randomColor" />
                                <Chip label="Navi Mumbai" variant="randomColor" />
                                <Chip label="Bengaluru" variant="randomColor" />
                            </div>
                        </div>
                    </Card>
                </div>)}
        </CardSlider>
    </div>)
}

export default TrustedDevelopers;