import CardSlider from '../../components/slider';
import React from 'react';
import Card from '../../components/card'
import Image from 'next/image';
import verified_icon from '../../icons/ic_round-verified-user.svg?url'
import './styles.scss'
import Chip from '../../components/chip';
import verticalGradientLine from '@/app/icons/vertical_gradient_line.svg?url'
import { getFeaturedDevelopers,getAllDevelopers } from '@/clients/developerClient'
import Rating from '@/app/components/rating'
import dayjs from 'dayjs';
let customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const TrustedDevelopers = async () => {
    //const data = getFeaturedDevelopers();
    const developers  = await getAllDevelopers();
    return (<div className='trusted-developers'>    
        <CardSlider carouselSettings={{  slidesToShow: null, slidesToScroll:1,  variableWidth: true, responsive:[]}}>
            {developers.map(data => {
                const dateObj = dayjs(data.foundedOn, "DD/MM/YYYY");
                const date2 = dayjs();
                let years = date2.diff(dateObj, 'years');
            
                return(<div style={{minWidth:"334px",width:"334px"}}>
                    <Card className='trusted-dev-card position-relative d-flex'>
                        <div className='vertical-line position-relative'>
                            <Image className="" src={verticalGradientLine} fill={true} />
                        </div>
                        <div className='d-flex flex-column justify-content-between h-100 trusted-dev-card-info'>
                            <div className='sub-container'>
                                <div className='d-flex align-items-center'>
                                    <div className='image-container d-flex pe-2'>
                                        <Image src="/strutiDeveloper.png" width={50} height={50} />
                                    </div>
                                    <div>
                                        <div className='sub-heading-2'>{data.developerName}</div>
                                        <div className='rating d-flex align-items-center sub-info'>
                                            <span className='rating-value'>4.6</span>
                                            <Rating value={4.6} />
                                        </div>
                                    </div>
                                </div>
                                <div className='property-info d-flex justify-content-between'>
                                    <span>{dateObj.format('YYYY')}<span className='body-txt'> Year Estd</span></span>
                                    <span>{years}<span className='body-txt'> Years Experience</span></span>
                                    <span>{data.totalProjects} <span className='body-txt'>Projects</span></span>
                                </div>
                            </div>
                            <div className='horizontal-line'></div>
                            <div className='chip-container'>
                                {(data.operatingCities||"").split(",").map(city => <Chip label={city} variant="randomColor" />)}
                            </div>
                        </div>
                    </Card>
                </div>)
                })}
        </CardSlider>
    </div>)
}

export default TrustedDevelopers;