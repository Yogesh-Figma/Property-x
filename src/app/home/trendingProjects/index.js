import React, { Suspense } from 'react';
import CardSlider from '../../components/slider';
import { PropertyCard3 } from '../../components/ui/propertyCard'
import { PROJECT_STATUS, getProjectsByStatus } from '@/clients/projectClient'
import './styles.scss';

const TrendingProjects = async () => {
    const projects = await getProjectsByStatus(PROJECT_STATUS.TRENDING);
    console.log("trending projects", projects);
    return (
        <div className='trending-projects'>
            <CardSlider carouselSettings={{
                slidesToShow: null, slidesToShow:2.5, centerMode:false, slidesToScroll: 1, variableWidth: false, infinite: (projects.length > 2? true: false), responsive: [
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
                        bhk={item.specification}
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
        </div>)
}

export default TrendingProjects;