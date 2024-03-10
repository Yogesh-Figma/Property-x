"use client"
import React, { Suspense } from 'react';
import './styles.scss'
import Filter from './filters';
import { PropertyCard4 } from '@/app/components/ui/propertyCard'
import UpcomingProjects from './upcomingProjects';
import Map from '../../components/ui/map';
import Heading from '@/app/components/heading';
import PropertyDetails from './propertyDetails';
import Link from 'next/link'
import RightLink from '@/app/icons/right_arrow.svg?url';
import Image from 'next/image';
import { getAllProjects, getProjectById, getProjectByUrlText } from '@/clients/projectClient'
import { getSearchData } from '@/clients/searchClient';
import { useQuery } from 'react-query';
import { getPropertyById, getPropertyByUrlText } from '@/clients/propertyClient';
import Skeleton from '@mui/material/Skeleton';
import Loading from '../../loading';
import CircularProgress from '@mui/material/CircularProgress';
import NextLinkButton from '@/app/components/nextLinkButton';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export default function Page({ params: { term },
    searchParams }) {
    const searchTerm = term.replaceAll("-", " ");
    const [selectedProp, selectProp] = React.useState({});
    const cityName = searchParams?.city;
    const onlyProject = searchParams?.onlyProject;
    const propertyCategory = searchParams?.category;

    const { data: searchData = [], isLoading, isError, error } = useQuery({
        queryKey: ['getSearchData', searchTerm, cityName, onlyProject, propertyCategory],
        queryFn: () => getSearchData(searchTerm, cityName, onlyProject, propertyCategory),
    });

    const firstCardData = searchData[0]?.data
    const selectedUrlText = selectedProp?.url || firstCardData?.url;
    const selectedProperty = (selectedProp?.type || (firstCardData?.type) || "").toLowerCase() == "property";

    const { data: selectedCardData, isLoading: selectedCardDataLoading, isError: selectedCardIsError, error: selectedCardError } = useQuery({
        enabled: !!selectedUrlText,
        queryKey: ['getUserVisits', selectedUrlText],
        queryFn: () => selectedProperty ? getPropertyByUrlText(selectedUrlText) : getProjectByUrlText(selectedUrlText)
    });


    const selectCard = (url, type) => () => {
        selectProp({ url, type });
    }

    return (<div className='search-page container-fluid'>
        {isLoading ? <Loading /> : searchData.length > 0 ? <>
            <Filter />
            <div className='row search-section-cnt'>
                <div className='col-xl-6 col-12 property-cards  overflow-lg-scroll'>
                    {(searchData || []).map(data => {
                        const isProperty = (data.type || "").toLowerCase() == "property";
                        const item = data.data;

                        return (<div onClick={selectCard(item.url, (data.type || "").toLowerCase())} className={`property-card-cont ${isProperty ? "prop-cnt" : "proj-cnt"}`}>
                            <PropertyCard4 title={item.name}
                                isProperty={isProperty}
                                bhk={data["configuration"]?.name || data.configurations}
                                address={item.address}
                                imgsrc={item.logo || ""}
                                devImage={item.developerLogo}
                                by={item.developerName}
                                possessionInfo={item.possessionDue}
                                avgPrice={item.ratePerUnitInsqft || item.ratePerAreaUnit || "TO BE ANNOUNCED"}
                                price={item.totalPrice}
                                id={item.id}
                                urlText={item.url}
                                subInfo={item.specification}
                                showRating={true}
                                ratingCnt={item.ratingCount}
                                ratingValue={item.ratingAverage}
                                rera={item.rera}
                                furnishingInfo={item.furnishingStatus?.name}
                                minPrice={item.minPrice}
                                maxPrice={item.maxPrice}
                            />
                        </div>)
                    })}
                </div>
                <div className='col-6 d-xl-block d-none'>
                    <Suspense fallback={<Loading />}>

                        {!!selectedCardData && <div className='property-detail'>
                            <PropertyDetails data={selectedCardData} type={selectedProp.type} />
                        </div>}
                    </Suspense>
                    {/* <div className='map-container'>
                    <Map lat={28.5355} long={77.391029} apiKey={API_KEY}/>
                </div>
                <Card className="contact-us-card">
                    <div className='contact-support text-center sub-heading-2'>Contact Support</div>
                    <ContactUsForm />
                </Card> */}
                </div>
            </div >
            {!!selectedCardData && <Link className='d-xl-flex d-none justify-content-end align-items-center property-detail-link sub-heading' href={"/buy/project/" + (selectedUrlText)}>View Full Details <Image src={RightLink} width={28} height={28} /></Link>}
        </> : <div className="not-found d-flex align-items-center justify-content-center container-fluid">
            <div>
                <div className='heading sub-text mb-3'>No results for {searchTerm} {!!cityName ? `in ${cityName}`:""}</div>
                <div className='sub-text mb-3'>Try checking the spelling and search</div>
                <NextLinkButton rounded={true} height={47} text={"Go To Home"} href={"/"} />
            </div>
            <div className='image-container position-relative d-none d-md-block'>
                <Image src="/notfound.png" fill={true} />
            </div>
        </div>}
        <Suspense>
            <UpcomingProjects />
        </Suspense>
    </div >)
}