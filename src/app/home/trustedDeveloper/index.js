import CardSlider from '../../components/slider';
import React from 'react';
import Card from '../../components/card'
import Image from 'next/image';
import verified_icon from '../../icons/ic_round-verified-user.svg?url'
import './styles.scss'
import Chip from '@/app/components/chip';
import VerticalGradientLine from '@/app/icons/vertical_gradient_line.svg'
import { getFeaturedDevelopers, getAllDevelopers } from '@/clients/developerClient'
import Rating from '@/app/components/rating'
import OverflowTip from '@/app/components/OverflowTip';
import dayjs from 'dayjs';
import ExpandIcon from '@/app/icons/expand_icon.svg';
import Link from 'next/link'

let customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const TrustedDevelopers = async () => {
    //const data = getFeaturedDevelopers();
    const developers = await getAllDevelopers();
    return (<div className='trusted-developers'>
        <CardSlider carouselSettings={{
            slidesToShow: null, slidesToScroll: 1, variableWidth: true
        }}>
            {developers.map((data, index) => {
                const dateObj = dayjs(data.foundedOn, "DD/MM/YYYY");
                const date2 = dayjs();
                let years = date2.diff(dateObj, 'years');
                let operatingCities = (data.operatingCities || "").split(",") || [];

                return (<div style={{ minWidth: "334px", width: 379 }} key={index}>
                    <Card className='trusted-dev-card position-relative d-flex'>
                        <div className='vertical-line position-absolute'>
                            <VerticalGradientLine />
                        </div>
                        <div className='d-flex flex-column justify-content-between h-100 trusted-dev-card-info'>
                            <div className='sub-container'>
                                <div className='d-flex'>
                                    <div className='image-container d-flex'>
                                        <Image alt="property logo" src={data.logo || ""} width={50} height={50} />
                                    </div>
                                    <div>
                                        <div className='sub-heading-2'>{data.name}</div>
                                        <div className='rating d-flex align-items-center sub-info'>
                                            {data.ratingAverage > 0 && <><span className='rating-value'>{data.ratingAverage}</span>
                                           <Rating value={Number(data.ratingAverage||0)} /></>}
                                        </div>
                                    </div>
                                    <Link href={`developer/${data.url}`} className='expand-icon ms-auto'><ExpandIcon/></Link>
                                </div>
                                <div className='property-info d-flex justify-content-between'>
                                    <span>{dateObj.format('YYYY')}<span className='body-txt'> Year Estd</span></span>
                                    <span>{years}<span className='body-txt'> Years Experience</span></span>
                                    <span>{data.totalProjects} <span className='body-txt'>Projects</span></span>
                                </div>
                                <div className='dev-description body-txt'><OverflowTip text={data.description} lines={2}/></div>
                            </div>
                            <div className='horizontal-line'></div>
                            <div className='chip-container'>
                                {operatingCities.slice(0, 8).map(city => <Chip label={city} variant="randomColor" />)}
                                {operatingCities.length > 8 && "+" + (operatingCities.length - 8)}
                            </div>
                        </div>
                    </Card>
                </div>)
            })}
        </CardSlider>
    </div>)
}

export default TrustedDevelopers;