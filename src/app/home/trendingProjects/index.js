import React, { Suspense } from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard3 } from '../../components/ui/propertyCard'
import { PROJECT_STATUS, getProjectsByStatus } from '@/clients/projectClient'
import './styles.scss';

const TrendingProjects = async () => {
    const projects = await getProjectsByStatus(PROJECT_STATUS.TRENDING);
    return (
        (projects||[]).length > 0 && <div className='developer-container'>
            <div className='sub-heading text-center title'>Trending Projects</div>
            <div className='sub-heading-3 text-center sub-title'>A Close Look at Remarkable Listings</div>
            <div className='trending-projects'>
                <CardSlider carouselSettings={{
                    slidesToShow: null, slidesToShow: 2.5, centerMode: false, slidesToScroll: 1, variableWidth: false, infinite: (projects.length > 2 ? true : false), responsive: [
                        {
                            breakpoint: 1700,
                            settings: {
                                slidesToShow: 2.1,
                            }
                        },
                        {
                            breakpoint: 1200,
                            settings: {
                                slidesToShow: 1.1,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1.1,
                            }
                        }
                    ]
                    , autoplay: false, nextArrow: null, prevArrow: null, autoplaySpeed: 2000
                }}>
                    {projects.map((item, index) => {
                        return (<PropertyCard3
                            key={index}
                            id={item.id}
                            urlText={item.url}
                            title={item.name}
                            address={item.address}
                            avgPrice={item.ratePerUnitInsqft}
                            price={item.totalPrice}
                            imgsrc={item.logo || ""}
                            maxWidth={null}
                            width={null}
                            height={"275px"}
                            devImage={item.developerLogo}
                            by={item.developerName}
                            minPrice={item.minPrice}
                            maxPrice={item.maxPrice}
                        />)
                    })}

                </CardSlider>
            </div>
        </div>)
}

export default TrendingProjects;