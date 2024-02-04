import React, { Suspense } from 'react';
import './styles.scss'
import SimilarProjects from './similarProperties';
import SimilarProperties from './propertiesInProject';
import Heading from '@/app/components/heading';
import Image from 'next/image'
import NextLinkButton from '@/app/components/nextLinkButton';
import FloorPlan from './floorPlan';
import Link from 'next/link'
import Overview from './overview';
import Description from './about';
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
import { getPropertyByUrlText } from '@/clients/propertyClient';
import { cookies } from 'next/headers'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { notFound } from 'next/navigation'
import { getProjectByUrlText, getProjectsByStatus } from '@/clients/projectClient';
import Accordion from '@/app/components/accordion';
import TouchIcon from '@/app/icons/touch.svg';
import Card from '@/app/components/card'
import DeveloperCard from './developerCard';
import HighLights from './highlights';
import PropertiesInProject from './propertiesInProject';
import UpcomingLaunches from './upcomingLaunches';
import About from './about';
import Loading from '@/app/loading';
import TalkToConsulantBtn from '@/app/actionBtns/talkToConsultantBtn';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export async function generateMetadata({ params: { urltext, type }}, parent) {
    // fetch data
    const data = type == "property" ? await getPropertyByUrlText(urltext) : await getProjectByUrlText(urltext);
   
    return {
      title: data.name
    }
  }
 
  
export default async function Page({ params: { urltext, type }, }) {  
    if (type != "property" && type != "project") {
        return notFound();
    }
    const isProperty = type == "property";
    const data = isProperty ? await getPropertyByUrlText(urltext) : await getProjectByUrlText(urltext);
    const galleryData = {
        photos: (data.images || []).map((item) => { return { original: item, thumbnail: item } }),
        videos: [{ original: "https://www.youtube.com/embed/y9j-BL5ocW8?si=wB9knlJzEZFGgkEH", thumbnail: "https://picsum.photos/id/1019/250/150/" }, { original: "https://www.youtube.com/embed/7EHnQ0VM4KY?si=LGnmMBLW7xYZikGx", thumbnail: "https://picsum.photos/id/1019/250/150/" }]
    }
    return (<div className='property-page container-fluid'>
        <GalleryModal data={galleryData} />
        <CompareProjectPopup />
        <div className='additional-page-padding'>
            {/* <div className='message sub-heading'>{data["specification"]}</div>
            <div className='dev-project-image-cnt position-relative'>
                <Image className='dev-project-image' src={"/mahunDeveloperImg.png"} fill={true} />
            </div> */}
            {/* <div className='property-subtext sub-info d-flex justify-content-between'><span>*Please note: The starting location may change in the future.</span>
            <span className='vr-message ml-auto'>Use VR Headset for better experience.</span>
            </div> */}
            <PropertyHeader type={type} data={data} />
        </div>
        <div className='additional-page-padding'>
            <div className='row g-0 property-additional-info'>
                <div className='col-lg-8'>
                    <div className='property-images position-relative'>
                        <Image src={(data.images || [])[0] || ""} fill={true} />
                        <CompareProjects />
                        <Link href={"?gallery=true"}>
                            <div className='images-video-count position-absolute d-flex'>
                                <div className='image-cnt d-flex align-items-center justify-content-center'><ImagesIcon />{(data.images || []).length}</div>
                                <div className='video-cnt d-flex align-items-center justify-content-center'><VideoIcon />{(data.videos || []).length}</div>
                            </div>
                        </Link>
                    </div>
                    {/* <div className='property-value row g-0 mt-0 mt-lg-4'>
                        <div className='property-growth-cnt col-lg-5 col-12'>
                            <div className='property-growth d-flex d-lg-block justify-content-between'>
                                <div className='d-lg-block d-flex'>
                                    <div className='helv-txt'>Current property value</div>
                                    <div className='prop-grw-price-range ms-3 ms-lg-0 mb-lg-3 mt-lg-3'>{data["ratePerUnitInsqft"]}</div>
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
                    </div> */}
                </div>
                <div className='d-flex d-lg-block col-lg-4 property-info-right-menu ps-lg-4 mt-4 mt-lg-0'>
                    <div className='property-map-container mb-lg-4'>
                        <Map lat={data["latitude"]} long={data["longitude"]} apiKey={API_KEY} className={"mb-0"} />
                    </div>
                    <Divider className='divider-line d-none d-lg-block' />
                    <div className='similar-nearby ps-4 ps-lg-0 pt-lg-3 d-none d-md-block'>
                        <div className='similar-project-txt'>Similar {type} Nearby</div>
                        <div className='sub-info'>10km away from the searched location</div>
                        <div className='nearby position-relative'>
                            <Image src={"/samplePropertyImage.jpeg"} className='nearby-prop-image' fill={true} />
                            <div className='nearby-prop-info position-absolute'>
                                <div className='title heading'>Nirala Estate</div>
                                <div className='address'>Techzone 4, Greater Noida West</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Tabs />
            <Overview showBtn={true} data={data} type={type} />
            <About data={data} type={type} />
            <HighLights data={data.highlights || []} />
            <Amenities data={data} type={type} />
            {!!data["floorPlan"] || true && <div id="floor-plan">
                <Heading label={"Floor Plan"} />
                <FloorPlan floorPlan={data["floorPlan"]} />
            </div>}
            <div className='similar' id="properties-in-project">
                <Heading label={"Properties in this project"} />
                <PropertiesInProject />
            </div>
            <div id="about-developer">
                <Heading label={"About Developer"} />
                <div className='row'>
                    {!!data.developerId && <div className='col-md-8 col-12'>
                        <Suspense>
                            <DeveloperCard developerId={data.developerId} />
                        </Suspense>
                    </div>}
                    <div className='col-md-4 col-12 mt-4 mt-md-0'>
                        <Card className='interested-box'>
                            <div className='title heading'>Are you Interested?</div>
                            <div className='sub-info'>Seize the Opportunity – Express Your Interest Today!</div>
                            <div className='touch-icon'>
                                <TouchIcon className="mx-auto d-block" />
                            </div>
                            <div className='btn-cnt'>
                                <TalkToConsulantBtn height={34} id={data.id} isProperty={isProperty}/>
                                <NextLinkButton variant="outlined-noborder" className="overview-btn" text='Schedule a Visit' height={34} rounded={true} href="?schedule=123" />
                                <NextLinkButton text='Book Now' className="overview-btn" rounded={true} height={34} href={`/booking/${type}/${data.id}`} />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
            {!!data["faq"] && <div className='faqs' id="faq">
                <Heading label={"FAQs"} />
                {data["faq"].map((item, index) => <Accordion key={index} className={"faq-detail"} title={"Q." + item.questions + "?"} summary={item.answers} />)}
            </div>}

            <div className='similar' id="recommendation">
                <Heading label={"Similar Properties nearby"} />
                <SimilarProperties />
            </div>
        </div>
        <div className='upcomings' id="upcomings">
            <UpcomingLaunches />
        </div>
    </div>)
}