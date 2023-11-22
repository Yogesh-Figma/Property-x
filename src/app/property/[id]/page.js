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
import { CompareProjects, CompareProjectPopup } from './compareProject';
import VideoIcon from '@/app/icons/video.svg'
import ImagesIcon from '@/app/icons/images.svg'
import Tabs from './tabs';
import Map from '@/app/components/ui/map'
import GalleryModal from '@/app/components/galleryModal'
import { Divider } from '@mui/material';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const samplePropertyData = {
    "projectId": "271737b5-0341-4d7d-b4d1-a57207b057c7",
    "projectName": "Ace Divino",
    "projectDescription": "Sample project description",
    "createdOn": 1696404947355,
    "updatedOn": 0,
    "projectAddress": {
        "locality": {
            "localityId": "6b98cbb9-1620-4b3d-8ae2-7ed80eefac79",
            "localityName": "Sector 15"
        },
        "city": {
            "cityId": "1221d1a8-eb39-4860-914a-e506767d6b57",
            "cityName": "Siddhartha Nagar"
        },
        "state": {
            "statesId": "65bde78e-8aa1-4dbf-8021-895a23fae248",
            "statesName": "Bihar"
        },
        "country": {
            "countryId": "19f9ba57-6309-48ff-ace7-0271df0c7d0a",
            "countryName": "China"
        }
    },
    "projectFloorPlanImages": {
        "image1": "image1_url",
        "image2": "image2_url",
        "image3": "image3_url",
        "image4": "image4_url",
        "image5": "image5_url",
        "image6": "image6_url",
        "image7": "image7_url",
        "image8": "image8_url",
        "image9": "image9_url",
        "image10": "image10_url"
    },
    "projectDeveloperId": {
        "developerId": "fb1b6cdc-c1ff-47e7-abef-c39122c89993",
        "developerName": "Abhishek Srivastav",
        "developerPhone": "8303512327",
        "developerDescription": "Software Development Engineer",
        "developerLegalName": "TheSpyder",
        "foundedOn": "28/02/2000",
        "developerCorporateAddress": "Sector 73 Noida",
        "developerCorporateLocality": "Rajajipuram, Lucknow",
        "city": "Lucknow",
        "state": "Uttar Pradesh",
        "country": "India",
        "totalProjects": "7",
        "operatingCities": "Noida, New Delhi, Lucknow",
        "updatedOn": 0,
        "createdOn": 1695194480710
    },
    "projectType": {
        "propertyTypeId": "b99d294f-9864-4a25-927c-975a624a95b3",
        "propertyTypeName": "Residential"
    },
    "possessionStatus": {
        "possessionStatusId": "82837e3a-e953-4153-a880-851cec75fa4a",
        "possessionStatusName": "Pre Launch"
    },
    "projectLatitude": "28.5355",
    "projectLongitude": "77.3910",
    "projectTotalTowers": "10",
    "projectRera": "RERA123456",
    "projectListedBy": "Invest Mango",
    "projectListedOn": "2023-10-04",
    "projectInventoryBookingType": "Pre-launch",
    "projectConfiguration": "2 BHK, 3 BHK",
    "projectVideo": "video_url",
    "projectNearbyLandmarks": "Pari Chowk",
    "projectConstructedOn": "2022-01-01",
    "projectPossessionDue": "2023-12-31",
    "projectTotalUnits": "200",
    "projectAmenities": "Swimming pool, Gym, Clubhouse",
    "projectSpecification": "Specifications of the project",
    "projectFurnishingAmenities": "Furnished with basic amenities",
    "projectBookingToken": "booking_token_value",
    "createdBy": "Abhishek Srivastav",
    "updatedBy": null,
    "listingBy": "GoPropify",
    "projectRatePerAreaUnit": "5000",
    "projectOtherChargesPerAreaUnit": "1000",
    "projectPaymentSchedule": "Payment schedule details"
}

const BREADCRUMB = [{ name: "Home", url: "#" }, { name: "Ghaziabad", url: "#" }, { name: "Siddharth Vihar", url: "#" }, { name: "Siddharth Vihar", url: "#" },]
export default function Page({params: { id}}) {
    return (<div className='property-page container-fluid'>
        <GalleryModal data={[]} />
        <CompareProjectPopup />
        <div className='additional-page-padding'>
            <div className='message sub-heading'>Explore T&T Digitown’s virtual tour starting from Noida City Center Metro Station.*</div>
            <div className='dev-project-image-cnt position-relative'>
                <Image className='dev-project-image' src={"/mahunDeveloperImg.png"} fill={true} />
            </div>
            {/* <div className='property-subtext sub-info d-flex justify-content-between'><span>*Please note: The starting location may change in the future.</span>
            <span className='vr-message ml-auto'>Use VR Headset for better experience.</span>
            </div> */}
            <PropertyHeader id={id}/>
        </div>
        <div className='additional-page-padding'>
            <div className='row g-0 property-additional-info'>
                <div className='col-lg-8'>
                    <div className='property-images position-relative'>
                        <Image src={"/samplePropertyImage.jpeg"} fill={true} />
                        <CompareProjects />
                        <Link href={"?gallery=true"}>
                            <div className='images-video-count position-absolute d-flex'>
                                <div className='image-cnt d-flex align-items-center justify-content-center'><ImagesIcon />18</div>
                                <div className='video-cnt d-flex align-items-center justify-content-center'><VideoIcon />2</div>
                            </div>
                        </Link>
                    </div>
                    <div className='property-value row g-0 mt-0 mt-lg-4'>
                        <div className='property-growth-cnt col-lg-5 col-12'>
                            <div className='property-growth d-flex d-lg-block justify-content-between'>
                                <div className='d-lg-block d-flex'>
                                    <div className='helv-txt'>Current property value</div>
                                    <div className='prop-grw-price-range ms-3 ms-lg-0 mb-lg-3 mt-lg-3'>83.17L-1.22Cr</div>
                                </div>
                                <div className='growth-rate d-flex align-items-center'>Growth rate <Image src={propertyGraph} width={20} height={20} />
                                    <span className='property-appreciation'>04.30%</span>
                                </div>
                            </div>
                        </div>
                        <div className='property-graph col-7 d-lg-block d-none'>
                            <div>
                                <div>Property Value Over Time</div>
                                <LineGraph height={"123px"} width={"100%"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex d-lg-block col-lg-4 property-info-right-menu ps-lg-4 mt-4 mt-lg-0'>
                    <div className='property-map-container mb-lg-4'>
                        <Map lat={28.5355} long={77.391029} apiKey={API_KEY} className={"mb-0"}/>
                    </div>
                    <Divider className='divider-line d-none d-lg-block' /> 
                    <div className='similar-nearby ps-4 ps-lg-0 pt-lg-3 d-none d-md-block'>
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