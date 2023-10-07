import React from 'react';
import './styles.scss'
import SimilarProjects from './similarProjects';
import SimilarProperties from './similarProperties';
import Heading from '@/app/components/heading';
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import FloorPlan from './floorPlan';
import Link from 'next/link'
import Overview from './overview';
import Description from './description';
import Amenities from './amenities';
import PropertyHeader from './propertyHeader';
import LineGraph from '@/app/components/lineGraph';
import propertyGraph from '@/app/icons/property_graph.svg?url'
import CompareIcon from '@/app/icons/compare.svg'
import VideoIcon from '@/app/icons/video.svg'
import ImagesIcon from '@/app/icons/images.svg'
import Tabs from './tabs';
import Map from '@/app/components/ui/map'

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const BREADCRUMB = [{ name: "Home", url: "#" }, { name: "Ghaziabad", url: "#" }, { name: "Siddharth Vihar", url: "#" }, { name: "Siddharth Vihar", url: "#" },]
export default function Page({params: { id}}) {
    return (<div className='property-page container-fluid'>
        <div className='additional-page-padding'>
            <div className='message sub-heading'>Explore T&T Digitown’s virtual tour starting from Noida City Center Metro Station.*</div>
            <div className='dev-project-image-cnt position-relative'>
                <Image className='dev-project-image' src={"/mahunDeveloperImg.png"} fill={true} />
            </div>
            <div className='property-subtext sub-info d-flex justify-content-between'><span>*Please note: The starting location may change in the future.</span>
            <span className='vr-message ml-auto'>Use VR Headset for better experience.</span>
            </div>
            <PropertyHeader id={id}/>
        </div>
        <div className='additional-page-padding'>
            <div className='row g-0 property-additional-info'>
                <div className='col-8'>
                    <div className='property-images position-relative'>
                        <Image src={"/samplePropertyImage.jpeg"} fill={true} />
                        <div className='compare position-absolute d-flex align-items-center justify-content-center'><CompareIcon /><span>Compare</span></div>
                        <div className='images-video-count position-absolute d-flex'>
                            <div className='image-cnt d-flex align-items-center justify-content-center'><ImagesIcon />18</div>
                            <div className='video-cnt d-flex align-items-center justify-content-center'><VideoIcon />2</div>
                        </div>
                    </div>
                    <div className='property-value row'>
                        <div className='property-growth-cnt col-5'>
                            <div className='property-growth'>
                                <div className='helv-txt'>Current property value</div>
                                <div className='prop-grw-price-range'>83.17L-1.22Cr</div>
                                <div className='growth-rate d-flex align-items-center'>Growth rate <Image src={propertyGraph} width={20} height={20} />
                                    <span className='property-appreciation'>04.30%</span></div>
                            </div>
                        </div>
                        <div className='property-graph col-7'>
                            <div>Property Value Over Time</div>
                            <LineGraph height={"123px"} width={"100%"} />
                        </div>
                    </div>
                </div>
                <div className='col-4 property-info-right-menu'>
                <div className='property-map-container'>
                    <Map lat={28.5355} long={77.391029} apiKey={API_KEY}/>
                </div>
                <div className='horizontal-line'></div>
                <div className='similar-nearby'>
                    <div className='similar-project-txt'>Similar Project Nearby</div>
                    <div className='sub-info'>10km away from the searched location</div>
                    <div className='nearby position-relative'>
                        <Image src={"/samplePropertyImage.jpeg"} className='nearby-prop-image' fill={true}/>
                        <div className='nearby-prop-info position-absolute'>
                            <div className='title heading'>Nirala Estate</div>
                            <div className='address'>Techzone 4, Greater Noida West</div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <Tabs />
            <Overview showBtn={true}/>
            <Description />
            <Amenities />
            <div id="floor-plan">
                <Heading label={"Floor Plan"}/>
                <FloorPlan />
            </div>
            <div className='similar' id="properties-in-project">
                <Heading label={"Properties in this project"}/>
                <SimilarProperties />
            </div>
            <div className='similar' id="recommendation">
                <Heading label={"Recommendation"}/>
                <SimilarProjects />
            </div>
        </div>
    </div>)
}